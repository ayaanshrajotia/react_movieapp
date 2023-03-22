import React from "react";
import { Link } from "react-router-dom";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";
import { useWishlist } from "../../hooks/useWishlist";

// const getPosterPath = (posterPath) => {
//     return `http://www.themoviedb.org/t/p/w500/${posterPath}`;
// };

const MovieCard = ({
  id,
  title,
  posterPath,
  releaseDate,
  vote,
  addToWishlistHandler,
  removeFromWishlistHandler,
  isWishlist,
}) => {
  const {  removeWishlist } = useWishlist();

  const handleAddMovies = () => {
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
      <div className="movie_card">
        {posterPath !== null ? (
          <img
            className="movie_card__poster"
            src={`https://image.tmdb.org/t/p/w500/${posterPath}`}
            alt="No Poster"
          />
        ) : (
          <img
            className="movie_card__poster"
            src="https://img.freepik.com/premium-photo/black-director-chair-is-isolated-black-background-it-use-video-production-movie-industry-studio-shot_335640-1963.jpg"
            alt="Alt Poster"
            srcset=""
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
          className={`movie_card__vote ${
            vote < 4 ? `red-vote` : vote > 8 ? `green-vote` : `orange-vote`
          }`}
        >
          {vote.toFixed(1)}
        </span>
        <div className="movie_card__details">
          <h3>{title}</h3>
          <h4>{releaseDate}</h4>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;
