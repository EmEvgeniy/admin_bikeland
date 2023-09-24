import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const GetUserDataApi = createApi({
	reducerPath: "GetUserDataApi",
	baseQuery: fetchBaseQuery({
		baseUrl: "https://api.it-test.uz/v1",
		prepareHeaders: (headers) => {
			const token = sessionStorage.getItem("token");
			if (token) {
				headers.set("Accept", "application/json");
				headers.set("Authorization", `Bearer ${token}`);
			}
			return headers;
		},
	}),
	endpoints: (build) => ({
		getUserData: build.query({
			query: () => "/users/me",
		}),
	}),
});

export const { useGetUserDataQuery } = GetUserDataApi;
