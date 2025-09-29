import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const productApi = createApi({
    reducerPath: 'productApi',
    baseQuery: fetchBaseQuery({ baseUrl: '/api/v1'}),
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: (params) => '/products',
        })
    })
})


//Its a hook that can be used in components to load all variables(isloading var, success var, error var etc)
export const { useGetProductsQuery } = productApi      