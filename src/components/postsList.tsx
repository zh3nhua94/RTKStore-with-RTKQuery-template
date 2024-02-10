//@ts-nocheck
// PostsList.js
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	useGetPostsQuery,
	useCreatePostMutation,
	useUpdatePostChangesMutation,
	useDeletePostMutation,
} from "../features/posts/postsApiSlice";
import {
	selectPosts,
	setPosts,
	setLoading,
	setError,
	addPost,
	updatePost,
	removePost,
} from "../features/posts/postsSlice";

const PostsList = () => {
	const dispatch = useDispatch();
	const { data: apiPosts, isLoading: isLoadingApi, error: apiError } = useGetPostsQuery();
	const [newPost, setNewPost] = useState("");
	const [editedPost, setEditedPost] = useState(null);
	const [isEditing, setIsEditing] = useState(false);
	const posts = useSelector((state) => state.rootReducer.posts.posts);

	useEffect(() => {
		if (apiPosts) {
			dispatch(setPosts(apiPosts));
		} else if (apiError) {
			dispatch(setError(apiError));
		} else {
			dispatch(setLoading("pending"));
		}
	}, [dispatch, apiPosts, apiError]);

	const [createPost, { isLoading: isCreating }] = useCreatePostMutation();
	const [updatePostChanges, { isLoading: isUpdating }] = useUpdatePostChangesMutation();
	const [deletePost, { isLoading: isDeleting }] = useDeletePostMutation();

	const handleAddPost = async () => {
		try {
			const response = await createPost({ title: newPost });
			dispatch(addPost(response.data));
			setNewPost("");
		} catch (error) {
			console.error("Error adding post:", error);
		}
	};

	const handleUpdatePost = async () => {
		try {
			const response = await updatePostChanges({ postId: editedPost.id, updatedPost: editedPost });
			dispatch(updatePost({ id: editedPost.id, updatedPost: response.data }));
			setEditedPost(null);
			setIsEditing(false);
		} catch (error) {
			console.error("Error updating post:", error);
		}
	};

	const handleDeletePost = async (postId) => {
		try {
			await deletePost(postId);
			dispatch(removePost(postId));
		} catch (error) {
			console.error("Error deleting post:", error);
		}
	};

	if (isLoadingApi) return <div>Loading...</div>;
	if (apiError) return <div>Error: {apiError}</div>;

	return (
		<div>
			<h1>Posts</h1>
			<input
				type="text"
				value={newPost}
				onChange={(e) => setNewPost(e.target.value)}
			/>
			<button
				onClick={handleAddPost}
				disabled={isCreating}
			>
				Add Post
			</button>
			{isEditing && (
				<>
					<input
						type="text"
						value={editedPost.title}
						onChange={(e) => setEditedPost({ ...editedPost, title: e.target.value })}
					/>
					<button
						onClick={handleUpdatePost}
						disabled={isUpdating}
					>
						Update
					</button>
					<button
						onClick={() => {
							setEditedPost(null);
							setIsEditing(false);
						}}
					>
						Cancel
					</button>
				</>
			)}
			<ul>
				{posts?.map((post) => (
					<li key={post.id}>
						{isEditing && editedPost.id === post.id ? (
							<input
								type="text"
								value={editedPost.title}
								onChange={(e) => setEditedPost({ ...editedPost, title: e.target.value })}
							/>
						) : (
							<>
								<div>{post.title}</div>
								<button
									onClick={() => {
										setEditedPost(post);
										setIsEditing(true);
									}}
								>
									Edit
								</button>
								<button
									onClick={() => handleDeletePost(post.id)}
									disabled={isDeleting}
								>
									Delete
								</button>
							</>
						)}
					</li>
				))}
			</ul>
		</div>
	);
};

export default PostsList;
