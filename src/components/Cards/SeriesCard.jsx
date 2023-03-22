import React from "react";
import { Link } from "react-router-dom";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";
import { useWishlist } from "../../hooks/useWishlist";
import axios from "axios";
import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast";

// const getPosterPath = (posterPath) => {
//     return `http://www.themoviedb.org/t/p/w500/${posterPath}`;
// };

const SeriesCard = ({
  id,
  title,
  posterPath,
  releaseDate,
  vote,
  addToWishlistHandler,
  removeFromWishlistHandler,
  isWishlist,
}) => {
  const dispatch = useDispatch();
  
  const handleAddMovies = () => {
    addToWishlistHandler({
      id,
      title,
      posterPath,
      releaseDate,
      vote,
    });
  };

  const handleRemoveMovies = async () => {
    await axios
      .delete("http://localhost:4000/api/wishlist/" + id)
      .then((res) => {
        dispatch({
          type: "removeFromWishlist",
          payload: id,
        });
        toast.error("Removed from wishlist");
      })
      .catch((err) => {
        console.log(err);
      });
    removeFromWishlistHandler(id);
  };
  return (
    <Link to={`/series/${id}`}>
      <div className="series_card">
        {posterPath !== null ? (
          <img
            className="series_card__poster"
            src={`https://image.tmdb.org/t/p/w500/${posterPath}`}
            alt="No Poster"
          />
        ) : (
          <img
            className="series_card__poster"
            src="https://img.freepik.com/premium-photo/black-director-chair-is-isolated-black-background-it-use-video-production-movie-industry-studio-shot_335640-1963.jpg"
            alt="Alt Poster"
          />
        )}
        <Link className="no-click" to="#">
          {isWishlist === null ? (
            <AiOutlineStar
              className="card__wishlist_icon"
              onClick={handleAddMovies}
            />
          ) : (
            <AiFillStar
              className="card__wishlist_icon"
              onClick={handleRemoveMovies}
            />
          )}
        </Link>
        <span
          className={`series_card__vote ${
            vote < 4 ? `red-vote` : vote > 8 ? `green-vote` : `orange-vote`
          }`}
        >
          {vote.toFixed(1)}
        </span>
        <div className="series_card__details">
          <h3>{title}</h3>
          <h4>{releaseDate}</h4>
        </div>
      </div>
    </Link>
  );
};

export default SeriesCard;
