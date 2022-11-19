import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";
import { BoardDto, CreateBoardDto, TagDto } from "@tasks/common";
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
  tagTypes: ["Board", "Tag", "User"],
  endpoints: (builder) => ({
    getBoard: builder.query<BoardDto, string>({
      query: (id) => ({
        url: `/${id}`,
        method: "GET",
      }),
      providesTags: ["Board", "Tag", "User"],
    }),
    getBoards: builder.query<BoardDto[], void>({
      query: () => ({
        url: "/",
        method: "GET",
      }),
      providesTags: ["Board", "Tag", "User"],
    }),
    createBoard: builder.mutation<BoardDto, CreateBoardDto>({
      query: (body) => ({
        url: "/",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Board", "Tag", "User"],
    }),
    joinBoard: builder.mutation<BoardDto, number>({
      query: (id) => ({
        url: `/${id}/join`,
        method: "GET",
      }),
      invalidatesTags: ["Board", "User"],
    }),
    leaveBoard: builder.mutation<BoardDto, number>({
      query: (id) => ({
        url: `/${id}/leave`,
        method: "GET",
      }),
      invalidatesTags: ["Board", "User"],
    }),
    removeTagFromBoard: builder.mutation<
      TagDto,
      { tagId: string; boardId: string }
    >({
      query: ({ boardId, tagId }) => ({
        url: `/${boardId}/tag/${tagId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Board", "Tag"],
    }),
    addTagToBoard: builder.mutation<TagDto, { tagId: string; boardId: string }>(
      {
        query: ({ boardId, tagId }) => ({
          url: `/${boardId}/tag/${tagId}`,
          method: "POST",
        }),
        invalidatesTags: ["Board", "Tag"],
      },
    ),
  }),
});

export const {
  useGetBoardQuery,
  useGetBoardsQuery,
  useCreateBoardMutation,
  useJoinBoardMutation,
  useLeaveBoardMutation,
  useRemoveTagFromBoardMutation,
  useAddTagToBoardMutation,
} = boardApi;
