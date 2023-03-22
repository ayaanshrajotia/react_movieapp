import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import WishListCard from "./Cards/WishListCard";
import ErrorPage from "./ErrorPage";
import axios from "axios";
import { wishlistActions } from "../redux/wishlistSlice";
import { server } from "..";

const Wishlist = () => {
  const { wishlist } = useSelector((state) => state.wishlist);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchWishlist = async () => {
      await axios
        .get(`${server}/wishlist`, {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        })
        .then((res) => {
          dispatch(wishlistActions.showWishlist(res.data));
        })

        .catch((err) => {
          console.log(err);
        });
    };

    if (user) {
      fetchWishlist();
    }
  }, [dispatch, user]);

  return (
    <div className="wishlist">
      {wishlist.length > 0 ? (
        wishlist.map((movie) => (
          <WishListCard
            key={movie.id}
            id={movie.id}
            title={movie.title}
            releaseDate={movie.releaseDate}
            posterPath={movie.posterPath}
            vote={movie.vote}
            isWishlist={"a"}
          />
        ))
      ) : (
        <ErrorPage message={"No movies in wishlist yet. Add some :)"} />
      )}
    </div>
  );
};

export default Wishlist;
