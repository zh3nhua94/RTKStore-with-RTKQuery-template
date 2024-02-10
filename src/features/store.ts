// store.js
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import postsReducer from "./posts/postsSlice";
import { postsApi } from "./posts/postsApiSlice";

const rootReducer = combineReducers({
	// Add other slice reducers here
	posts: postsReducer,
});

const store = configureStore({
	reducer: {
		// Pass your root reducer here
		rootReducer,
		// Add the RTK Query API slice reducer under the specified reducer path
		[postsApi.reducerPath]: postsApi.reducer,
	},
	// Adding the api middleware enables caching, invalidation, polling,
	// and other useful features of `rtk-query`.
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(postsApi.middleware),
});

setupListeners(store.dispatch); // Set up listeners for RTK Query cache updates

export default store;
