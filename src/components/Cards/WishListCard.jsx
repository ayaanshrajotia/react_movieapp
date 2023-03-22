import React from "react";
import { Link } from "react-router-dom";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import axios from "axios";
import { wishlistActions } from "../../redux/wishlistSlice";
import { server } from "../..";

const WishListCard = ({
  id,
  title,
  posterPath,
  releaseDate,
  vote,
  isWishlist,
}) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const addToWishlistHandler = async (movieDetails) => {
    await axios
      .post(`${server}/wishlist`, movieDetails, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        dispatch(wishlistActions.addToWishlist(res.data));
        toast.success(res.data.message);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const removeFromWishlistHandler = async (movieId) => {
    await axios
      .delete("http://localhost:4000/api/wishlist/" + movieId, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then((res) => {
        dispatch(wishlistActions.removeFromWishlist(movieId));
        toast.error("Removed from wishlist");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Link to={`/movie/${id}`}>
      <div className="wishlist_card">
        {posterPath !== null ? (
          <img
            className="wishlist_card__poster"
            src={`https://image.tmdb.org/t/p/original/${posterPath}`}
            alt="No Poster"
          />
        ) : (
          <img
            className="wishlist_card__poster"
            src="https://img.freepik.com/premium-photo/black-director-chair-is-isolated-black-background-it-use-video-production-movie-industry-studio-shot_335640-1963.jpg"
            alt="Alt Poster"
            srcset=""
          />
        )}
        <Link className="no-click" to="#">
          {!isWishlist ? (
            <AiOutlineStar
              className="wishlist_card__wishlist_icon"
              onClick={() => {
                addToWishlistHandler({
                  id,
                  title,
                  posterPath,
                  releaseDate,
                  vote,
                });
              }}
            />
          ) : (
            <AiFillStar
              className="wishlist_card__wishlist_icon"
              onClick={() => {
                removeFromWishlistHandler(id);
              }}
            />
          )}
        </Link>
        <span
          className={`wishlist_card__vote ${
            vote < 4 ? `red-vote` : vote > 8 ? `green-vote` : `orange-vote`
          }`}
        >
          {vote?.toFixed(1)}
        </span>
        <div className="wishlist_card__details">
          <h3>{title}</h3>
          <h4>{releaseDate}</h4>
        </div>
      </div>
    </Link>
  );
};

export default WishListCard;
