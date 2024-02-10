// postsApiSlice.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const apiUrl = "http://localhost:3500/";

export const postsApi = createApi({
	reducerPath: "postsApi",
	baseQuery: fetchBaseQuery({ baseUrl: apiUrl }),
	endpoints: (builder) => ({
		getPosts: builder.query({
			query: () => "/posts",
		}),
		createPost: builder.mutation({
			query: (newPost) => ({
				url: "/posts",
				method: "POST",
				body: newPost,
			}),
		}),
		updatePostChanges: builder.mutation({
			query: ({ postId, updatedPost }) => ({
				url: `/posts/${postId}`,
				method: "PUT",
				body: updatedPost,
			}),
		}),
		deletePost: builder.mutation({
			query: (postId) => ({
				url: `/posts/${postId}`,
				method: "DELETE",
			}),
		}),
	}),
});

export const { useGetPostsQuery, useCreatePostMutation, useUpdatePostChangesMutation, useDeletePostMutation } =
	postsApi;
