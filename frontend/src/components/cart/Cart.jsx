import React from "react";
import MetaData from "../layouts/MetaData";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { setCartItems, removeCartItem as removeCartItemAction } from "../../redux/features/cartSlice";

const Cart = () => {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);

  const incQuantity = (item, quantity) => {
    const newQuantity = quantity + 1;

    if (newQuantity > item?.stock) return;
    setItemToCart(item, newQuantity)
  };
  const decQuantity = (item, quantity) => {
    const newQuantity = quantity - 1;

    if (newQuantity <= 0) return;
    setItemToCart(item, newQuantity)
  };

  const setItemToCart = (item, newQuantity) => {
    const cartItem = {
      product: item?.product,
      name: item?.name,
      price: item?.price,
      image: item?.image,
      stock: item?.stock,
      quantity: newQuantity,
    };
    dispatch(setCartItems(cartItem));
  };

  const removeCartItem = (id) => {
    dispatch(removeCartItemAction(id))
  }

  const subtotal =
    cartItems?.reduce((acc, item) => acc + item.quantity, 0) || 0;
  const total =
    cartItems?.reduce((acc, item) => acc + item.price * item.quantity, 0) || 0;

  return (
    <>
      <MetaData title={"Your Cart"} />
      {cartItems?.length === 0 ? (
        <h2 className="mt-5">Your Cart is Empty</h2>
      ) : (
        <>
          <h2 className="mt-5">
            Your Cart: <b>{cartItems?.length} items</b>
          </h2>
          <div className="row d-flex justify-content-between">
            <div className="col-12 col-lg-8">
              {cartItems?.map((item) => (
                <React.Fragment key={item.product}>
                  <hr />
                  <div className="cart-item" data-key={item.product}>
                    <div className="row">
                      <div className="col-4 col-lg-3">
                        <img
                          src={item?.image}
                          alt={item?.name}
                          height="90"
                          width="115"
                        />
                      </div>
                      <div className="col-5 col-lg-3">
                        <Link to={`/products/${item?.product}`}>
                          {item?.name}
                        </Link>
                      </div>
                      <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                        <p id="card_item_price">${item.price}</p>
                      </div>
                      <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                        <div className="stockCounter d-inline">
                          <span
                            className="btn btn-danger minus"
                            onClick={() => decQuantity(item, item.quantity)}
                          >
                            {" "}
                            -{" "}
                          </span>
                          <input
                            type="number"
                            className="form-control count d-inline"
                            value={item.quantity}
                            readOnly
                          />
                          <span
                            className="btn btn-primary plus"
                            onClick={() => incQuantity(item, item.quantity)}
                          >
                            {" "}
                            +{" "}
                          </span>
                        </div>
                      </div>
                      <div className="col-4 col-lg-1 mt-4 mt-lg-0">
                        <i
                          id="delete_cart_item"
                          className="fa fa-trash btn btn-danger"
                          onClick={() => removeCartItem(item?.product)}
                        ></i>
                      </div>
                    </div>
                  </div>
                  <hr />
                </React.Fragment>
              ))}
            </div>

            <div className="col-12 col-lg-3 my-4">
              <div id="order_summary">
                <h4>Order Summary</h4>
                <hr />
                <p>
                  Subtotal:{" "}
                  <span className="order-summary-values">
                    {subtotal} (Units)
                  </span>
                </p>
                <p>
                  Est. total:{" "}
                  <span className="order-summary-values">
                    ${total.toFixed(2)}
                  </span>
                </p>
                <hr />
                <button id="checkout_btn" className="btn btn-primary w-100">
                  Check out
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Cart;
