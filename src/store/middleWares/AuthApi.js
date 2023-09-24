import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const AuthApi = createApi({
	reducerPath: "AuthApi",
	baseQuery: fetchBaseQuery({
		baseUrl: "https://api.it-test.uz/v1/",
	}),
	endpoints: (build) => ({
		getUser: build.query({
			query: () => "users",
		}),
		getAccessToken: build.mutation({
			query: (payload) => ({
				url: "users/login",
				method: "POST",
				body: payload,
			}),
		}),
	}),
});

export const { useGetAccessTokenMutation, useGetUserQuery } = AuthApi;
