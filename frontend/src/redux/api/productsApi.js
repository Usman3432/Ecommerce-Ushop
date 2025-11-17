import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/v1" }),
  tagTypes: ["Product", "AdminProducts", "Reviews"],
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: (params) => ({
        url: "/products",
        params: {
          page: params?.page,
          keyword: params?.keyword,
          category: params?.category,
          "price[gte]": params.min,
          "price[lte]": params.max,
          "ratings[gte]": params?.ratings,
        },
      }),
    }),
    getProductDetails: builder.query({
      query: (id) => `/products/${id}`,
      providesTags: ["Product"],
    }),
    submitReview: builder.mutation({
      query: (body) => ({
        url: "/reviews",
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Product"],
    }),
    canUserReview: builder.query({
      query: (productId) => `/can_review?productId=${productId}`,
    }),
    getAdminProducts: builder.query({
      query: () => `/admin/products`,
      providesTags: ["AdminProducts"],
    }),
    createProduct: builder.mutation({
      query: (body) => ({
        url: "/admin/product/new",
        method: "POST",
        body,
      }),
      invalidatesTags: ["AdminProducts"],
    }),
    updateProduct: builder.mutation({
      query: ({ id, body}) => ({
        url: `/admin/products/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["AdminProducts", "Product"],
    }),
    uploadProductImages: builder.mutation({
      query: ({ id, body}) => ({
        url: `/admin/products/${id}/upload_image`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Product"],
    }),
    deleteProductImage: builder.mutation({
      query: ({ id, body}) => ({
        url: `/admin/products/${id}/delete_image`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Product"],
    }),
    deleteProduct: builder.mutation({
      query: ({ id }) => ({
        url: `/admin/products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["AdminProducts"],
    }),
    getProductReview: builder.query({
      query: (productId) => `/reviews?id=${productId}`,
      providesTags: ['Reviews']
    }),
    deleteProductReview: builder.mutation({
      query({ productId, id }) {return {
        url: `/admin/review/?productId=${productId}&id=${id}`,
        method: "DELETE",
      }},
      invalidatesTags: ["Reviews"],
    }),
  }),
});

//Its a hook that can be used in components to load all variables(isloading var, success var, error var etc)
export const {
  useGetProductsQuery,
  useGetProductDetailsQuery,
  useSubmitReviewMutation,
  useCanUserReviewQuery,
  useGetAdminProductsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useUploadProductImagesMutation,
  useDeleteProductImageMutation,
  useDeleteProductMutation,
  useLazyGetProductReviewQuery,
  useDeleteProductReviewMutation,
} = productApi;
