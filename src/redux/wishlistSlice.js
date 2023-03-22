import { createSlice } from "@reduxjs/toolkit";

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: { wishlist: [] },
  reducers: {
    showWishlist: (state, action) => {
      return { wishlist: action.payload };
    },

    addToWishlist: (state, action) => {
      const payload_movie = action.payload;

      const isPayloadMovieExisted = state.wishlist.find(
        (i) => i.id === payload_movie.id
      );

      if (isPayloadMovieExisted) return;

      return state.wishlist.push(payload_movie);
    },

    removeFromWishlist: (state, action) => {
      state.wishlist = state.wishlist.filter((i) => i.id !== action.payload);
    },
  },
});

export const wishlistActions = wishlistSlice.actions;

export default wishlistSlice;
