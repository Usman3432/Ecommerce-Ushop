import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const orderApi = createApi({
  reducerPath: "orderApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/v1" }),
  endpoints: (builder) => ({
    createNewOrder: builder.mutation({
      query(body) {
        return {
          url: "/order/new",
          method: "POST",
          body,
        };
      },
    }),
    myOrder: builder.query({
      query: () => "/me/orders",
    }),
    orderDetails: builder.query({
      query: (id) => `/order/${id}`,
    }),
    stripeCheckoutSession: builder.mutation({
      query(body) {
        return {
          url: "/payment/checkout_session",
          method: "POST",
          body,
        };
      },
    }),
    getSales: builder.query({
      query: ({ startDate, endDate }) =>
        `/admin/get_sales?startDate=${startDate}&endDate=${endDate}`,
    }),
    getAdminOrders: builder.query({
      query: () => "/admin/orders",
    }),
  }),
});

//Its a hook that can be used in components to load all variables(isloading var, success var, error var etc)
export const {
  useCreateNewOrderMutation,
  useStripeCheckoutSessionMutation,
  useMyOrderQuery,
  useOrderDetailsQuery,
  useLazyGetSalesQuery,
  useGetAdminOrdersQuery,
} = orderApi;
