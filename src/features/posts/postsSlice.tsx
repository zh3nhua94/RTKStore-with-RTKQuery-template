//@ts-nocheck
// postsSlice.js
import { createSlice } from "@reduxjs/toolkit";

const postsSlice = createSlice({
	name: "posts",
	initialState: {
		loading: "idle",
		error: null,
		posts: [],
	},
	reducers: {
		// Additional reducer actions for local state management
		setPosts: (state, action) => {
			state.posts = action.payload;
		},
		setError: (state, action) => {
			state.error = action.payload;
		},
		setLoading: (state, action) => {
			state.loading = action.payload;
		},
		addPost: (state, action) => {
			state.posts.push(action.payload);
		},
		updatePost: (state, action) => {
			const { id, updatedPost } = action.payload;
			const index = state.posts.findIndex((post) => post.id === id);
			if (index !== -1) {
				state.posts[index] = updatedPost;
			}
		},
		removePost: (state, action) => {
			const postId = action.payload;
			state.posts = state.posts.filter((post) => post.id !== postId);
		},
	},
});

export const { setPosts, setError, setLoading, addPost, updatePost, removePost } = postsSlice.actions;

export const selectPosts = (state) => state.posts.posts;

export default postsSlice.reducer;
