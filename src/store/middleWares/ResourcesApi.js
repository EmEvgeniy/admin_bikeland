import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const ResourcesApi = createApi({
	reducerPath: "ResourcesApi",
	baseQuery: fetchBaseQuery({
		baseUrl: "https://api.it-test.uz/v1/",
	}),
	tagTypes: ["resources"],
	endpoints: (build) => ({
		getResources: build.query({
			query: () => "resources",
			providesTags: ["resources"],
		}),
		putResources: build.mutation({
			query: (id, payload) => ({
				url: `resources/${id}`,
				method: "PUT",
				body: payload,
			}),
		}),
	}),
});

export const { useGetResourcesQuery, usePutResourcesMutation } = ResourcesApi;
