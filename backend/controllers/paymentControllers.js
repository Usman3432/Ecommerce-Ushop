import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import Stripe from "stripe";
import Order from "../models/orderModel.js";
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

// Create stripe checkout session       =>/api/v1/payment/checkout_session
export const stripeCheckoutSession = catchAsyncErrors(
  async (req, res, next) => {
    const body = req?.body;

    // Basic validation
    if (
      !body?.orderItems ||
      !Array.isArray(body.orderItems) ||
      body.orderItems.length === 0
    ) {
      return res.status(400).json({ message: "Order items are required" });
    }
    if (!body?.shippingInfo) {
      return res.status(400).json({ message: "Shipping info is required" });
    }

    const line_items = body.orderItems.map((item) => {
      return {
        price_data: {
          currency: "usd",
          product_data: {
            name: item?.name,
            images: [item?.image],
            metadata: { productId: item?.product },
          },
          unit_amount: Math.round(item?.price * 100),
        },
        tax_rates: ["txr_1SHUEXLN3Oxr2QsJKrelMEic"],
        quantity: item?.quantity,
      };
    });
    const shippingInfo = body.shippingInfo;
    const shipping_rate =
      body?.itemPrice >= 200
        ? "shr_1SHU5WLN3Oxr2QsJxTbhfRZJ"
        : "shr_1SHU7GLN3Oxr2QsJX4QETIJ5";

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      success_url: `${process.env.FRONTEND_URL}/me/orders`,
      cancel_url: `${process.env.FRONTEND_URL}`,
      customer_email: req?.user?.email,
      client_reference_id: req?.user?._id?.toString(),
      mode: "payment",
      metadata: { ...shippingInfo, itemsPrice: body?.itemPrice },
      shipping_options: [
        {
          shipping_rate,
        },
      ],
      line_items,
    });
    // console.log(session)
    res.status(200).json({
      url: session.url,
    });
  }
);

const getOrderItems = async (line_items) => {
  const cartItems = await Promise.all(
    line_items?.data?.map(async (item) => {
      const product = await stripe.products.retrieve(item.price.product);
      const productId = product.metadata.productId;

      return {
        product: productId,
        name: product.name,
        price: (item.price.unit_amount / 100).toString(),
        quantity: item.quantity,
        image: product.images[0],
      };
    })
  );
  return cartItems;
};

// Create new order after payment       =>/api/v1/payment/webhook
export const stripeWebhook = catchAsyncErrors(async (req, res, next) => {
  try {
    const signature = req.headers["stripe-signature"];
    const event = stripe.webhooks.constructEvent(
      req.rawBody,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
    if (event.type === "checkout.session.completed") {
      const session = event.data.object;

      const line_items = await stripe.checkout.sessions.listLineItems(
        session.id
      );

      const orderItems = await getOrderItems(line_items)
      const user = session.client_reference_id

      const totalAmount = session.amount_total / 100
      const taxAmount = session.total_details.amount_tax / 100
      const shippingAmount = session.total_details.amount_shipping / 100
      const itemsPrice = session.metadata.itemsPrice

      const shippingInfo = {
        address: session.metadata.address,
        city: session.metadata.city,
        phone: session.metadata.phone,
        zipCode: session.metadata.zipCode,
        country: session.metadata.country,
      }

      const paymentInfo = {
        id: session.payment_intent,
        status: session.payment_status,
      }

      const orderData = {
        shippingInfo,
        orderItems,
        itemPrice: itemsPrice,
        taxAmount,
        shippingAmount,
        totalAmount,
        paymentInfo,
        paymentMethod: "Card",
        user,
      };
      await Order.create(orderData)
      res.status(200).json({ status: true });
    }
  } catch (error) {
    console.log("Webhook error:", error);
    res.status(400).send(`Webhook Error: ${error.message}`);
  }
});
