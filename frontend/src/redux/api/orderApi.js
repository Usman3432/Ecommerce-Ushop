import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const orderApi = createApi({
  reducerPath: "orderApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/v1" }),
  tagTypes: ["Order", "AdminOrders"],
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
      providesTags: ["Order"],
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
      providesTags: ["AdminOrders"],
    }),
    updateOrder: builder.mutation({
      query({ id, body }) {
        return {
          url: `/admin/order/${id}`,
          method: "PUT",
          body,
        };
      },
      invalidatesTags: ["Order", "AdminOrders"],
    }),
    deleteOrder: builder.mutation({
      query(id) {
        return {
          url: `/admin/order/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["AdminOrders"],
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
  useUpdateOrderMutation,
  useDeleteOrderMutation,
} = orderApi;
