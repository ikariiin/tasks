import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";
import { BoardDto, CreateBoardDto } from "@tasks/common";
import { RootState } from "../../store";

export const boardApi = createApi({
  reducerPath: "boardApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.API_BASE}/v${process.env.API_VERSION}/board`,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.user?.token;

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),
  endpoints: (builder) => ({
    getBoard: builder.query<BoardDto, string>({
      query: (id) => ({
        url: `/${id}`,
        method: "GET",
      }),
    }),
    getBoards: builder.query<BoardDto[], void>({
      query: () => ({
        url: "/",
        method: "GET",
      }),
    }),
    createBoard: builder.mutation<BoardDto, CreateBoardDto>({
      query: (body) => ({
        url: "/",
        method: "POST",
        body,
      }),
    }),
    joinBoard: builder.mutation<BoardDto, number>({
      query: (id) => ({
        url: `/${id}/join`,
        method: "GET",
      }),
    }),
    leaveBoard: builder.mutation<BoardDto, number>({
      query: (id) => ({
        url: `/${id}/leave`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetBoardQuery,
  useGetBoardsQuery,
  useCreateBoardMutation,
  useJoinBoardMutation,
  useLeaveBoardMutation,
} = boardApi;
