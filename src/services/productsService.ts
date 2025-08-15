import { Product } from "@/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productsApi = createApi({
  reducerPath: "productsApi",
  tagTypes: ["Product"],
  baseQuery: fetchBaseQuery({ baseUrl: "/api/" }),
  endpoints: builder => ({
    getProductsList: builder.query<Product[], void>({
      query: () => `products/`,
      providesTags: ["Product"],
    }),
    getProduct: builder.query<Product, string>({
      query: id => `products/${id}`,
    }),
  }),
});

export const { useGetProductsListQuery, useGetProductQuery } = productsApi;
