import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
// import { moviesReducer } from "./reducers";
import wishlistSlice from "./wishlistSlice";

const store = configureStore({
  reducer: {
    // movies: moviesReducer,
    auth: authSlice.reducer,
    wishlist: wishlistSlice.reducer,
  },
});

export default store;
