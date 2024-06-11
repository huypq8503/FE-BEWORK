import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const searchApi = createApi({
  reducerPath: "search",
  tagTypes: ["search"],
  baseQuery: fetchBaseQuery({
    baseUrl: "https://be.beworkhappycat.id.vn/api/",
    fetchFn: (...args) => fetch(...args),
  }),
  endpoints: (builder) => ({
    search: builder.query<any, { search?: string; province?: number | string }>(
      {
        query: ({ search, province }) => {
          let queryParams = "";

          if (search) {
            queryParams += `search=${search}`;
          }

          if (province) {
            queryParams += `${queryParams ? "&" : ""}province=${province}`;
          }

          return `search${queryParams ? `?${queryParams}` : ""}`;
        },
      }
    ),
    getJobPostSelectById: builder.query<any, void>({
      query: () => "/job_post_select",
      providesTags: ["search"],
    }),
  }),
});

export const { useSearchQuery, useGetJobPostSelectByIdQuery } = searchApi;
export const searchReducer = searchApi.reducer;
export default searchApi;
