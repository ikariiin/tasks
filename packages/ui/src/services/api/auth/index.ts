import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { PublicUserDto, SignupDto } from "common";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.API_BASE}/auth`,
  }),
  endpoints: (builder) => ({
    signin: builder.mutation({
      query: (body) => ({
        url: "/signin",
        method: "POST",
        body,
      }),
    }),
    signup: builder.mutation<PublicUserDto, SignupDto>({
      query: (body) => ({
        url: "/signup",
        method: "POST",
        body,
      }),
    }),
    googleLogin: builder.mutation({
      query: (body) => ({
        url: "/google-login",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useGoogleLoginMutation, useSigninMutation, useSignupMutation } =
  authApi;
