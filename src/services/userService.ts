import { User } from "@/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  reducerPath: "userApi",
  tagTypes: ["User"],
  baseQuery: fetchBaseQuery({ baseUrl: "/api/" }),
  endpoints: builder => ({
    signIn: builder.mutation<User, FormData>({
      query: body => ({
        url: `auth/login/`,
        method: "POST",
        body,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        const { data: user } = await queryFulfilled;
        dispatch(userApi.util.upsertQueryData("auth", undefined, user));
      },
    }),

    signUp: builder.mutation<User, FormData>({
      query: body => ({
        url: `auth/register/`,
        method: "POST",
        body,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        const { data: user } = await queryFulfilled;
        dispatch(userApi.util.upsertQueryData("auth", undefined, user));
      },
    }),

    signOut: builder.mutation<null, void>({
      query: () => ({
        url: `auth/logout/`,
        method: "POST",
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        await queryFulfilled;
        dispatch(userApi.util.upsertQueryData("auth", undefined, null));
      },
    }),

    auth: builder.query<User | null, void>({
      query: () => `auth/`,
      providesTags: ["User"],
    }),
  }),
});

export const { useSignInMutation, useSignUpMutation, useSignOutMutation, useAuthQuery } = userApi;
