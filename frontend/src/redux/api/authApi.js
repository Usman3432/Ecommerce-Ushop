import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { userApi } from "./userApi";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/v1" }),
  endpoints: (builder) => ({
    register: builder.mutation({
      query(body) {
        return {
          url: "/register",
          method: "POST",
          body,
        };
      },
      async onQueryStarted(args, { dispatch, queryFulfilled}) {
        try{
          await queryFulfilled;
          await dispatch(userApi.endpoints.getMe.initiate(null))

        } catch(error){
          console.log(error)
        }
      },
    }),
    login: builder.mutation({
      query(body) {
        return {
          url: "/login",
          method: "POST",
          body,
        };
      },
      async onQueryStarted(args, { dispatch, queryFulfilled}) {
        try{
          await queryFulfilled;
          await dispatch(userApi.endpoints.getMe.initiate(null))

        } catch(error){
          console.log(error)
        }
      },
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/logout",
        method: "GET"
      }),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          // Clear user state after logout
          dispatch({ type: 'userSlice/setUser', payload: null });
          dispatch({ type: 'userSlice/setIsAuthenticated', payload: false });
        } catch (error) {
          console.log(error);
        }
      }
    })
  }),
});

//Its a hook that can be used in components to load all variables(isloading var, success var, error var etc)
export const { useLoginMutation, useRegisterMutation, useLogoutMutation } = authApi;
