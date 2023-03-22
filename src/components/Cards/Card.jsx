import React from "react";
import { Link } from "react-router-dom";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";
import { useWishlist } from "../../hooks/useWishlist";

const Card = ({
  id,
  title,
  posterPath,
  releaseDate,
  vote,
  addToWishlistHandler,
  removeFromWishlistHandler,
  isWishlist,
}) => {
  const { addWishlist, removeWishlist } = useWishlist();
  const handleAddMovies = () => {
    addWishlist({
      id,
      title,
      posterPath,
      releaseDate,
      vote,
    });
    addToWishlistHandler({
      id,
      title,
      posterPath,
      releaseDate,
      vote,
    });
  };

  const handleRemoveMovies = () => {
    console.log(id);
    removeWishlist(id);
    removeFromWishlistHandler(id);
  };

  return (
    <Link to={`/movie/${id}`}>
      <div className="card">
        {posterPath !== null ? (
          <img
            className="card__poster"
            src={`https://image.tmdb.org/t/p/w500/${posterPath}`}
            alt="No Poster"
          />
        ) : (
          <img
            className="card__poster"
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
          className={`card__vote ${
            vote < 4 ? `red-vote` : vote > 8 ? `green-vote` : `orange-vote`
          }`}
        >
          {vote.toFixed(1)}
        </span>
        <div className="card__details">
          <h3>{title}</h3>
          <h4>{releaseDate}</h4>
        </div>
      </div>
    </Link>
  );
};

export default Card;
