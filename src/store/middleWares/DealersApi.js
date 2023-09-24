import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

export const DealersApi = createApi({
	reducerPath: "DealersApi",
	baseQuery: fetchBaseQuery({ baseUrl: "https://api.it-test.uz/v1/" }),
	endpoints: (build) => ({
		getLocations: build.query({
			query: () => "dealers",
		}),
	}),
});

export const { useGetLocationsQuery } = DealersApi;
