import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const StatisticApi = createApi({
	reducerPath: "StatisticApi",
	baseQuery: fetchBaseQuery({ baseUrl: "https://api.it-test.uz/v1/" }),
	endpoints: (build) => ({
		getStatistic: build.query({
			query: () => `statistics?page=1&page_size=100`,
		}),
		getTotalStatistic: build.query({
			query: () => "statistics/percentage/periods",
		}),
	}),
});

export const { useGetStatisticQuery, useGetTotalStatisticQuery } = StatisticApi;
