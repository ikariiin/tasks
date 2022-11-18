import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";
import { CreateTagDto, TagDto } from "@tasks/common";
import { RootState } from "../../store";

export const tagApi = createApi({
  reducerPath: "tagApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.API_BASE}/v${process.env.API_VERSION}/tag`,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.user?.token;

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),
  endpoints: (builder) => ({
    createTag: builder.mutation<TagDto, CreateTagDto>({
      query: (tagDto) => ({
        url: "",
        method: "POST",
        body: tagDto,
      }),
    }),
  }),
});
