import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

export const GoodsApi = createApi({
	reducerPath: "GoodApi",
	baseQuery: fetchBaseQuery({ baseUrl: "https://api.it-test.uz/v1/" }),
	endpoints: (build) => ({
		getAllProducts: build.query({
			query: () => "products",
		}),
	}),
});

export const { useGetAllProductsQuery } = GoodsApi;
