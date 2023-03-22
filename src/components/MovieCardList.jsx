import React, { useEffect, useState } from "react";
import MovieCard from "./Cards/MovieCard";
import tmdb from "../axios";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { wishlistActions } from "../redux/wishlistSlice";
import { useWishlist } from "../hooks/useWishlist";
import axios from "axios";
import { server } from "..";

const CardList = ({ title, fetchUrl, largeRow }) => {
  const { addWishlist } = useWishlist();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const response = await tmdb.get(fetchUrl);

      setMovies(response.data.results);
      setLoading(false);
    };

    setTimeout(() => {
      fetchData();
    }, 400);
  }, [fetchUrl]);

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const addToWishlistHandler = async (movieDetails) => {
    if (!user) {
      toast.error("Please Login");
      return;
    }

    await axios
      .post(`${server}/wishlist`, movieDetails, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        dispatch(wishlistActions.addToWishlist(res.data));
        toast.success(res.data.message);
        console.log(res.data.message);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const removeFromWishlistHandler = async (movieId) => {
    await axios
      .delete(`${server}/wishlist/` + movieId)
      .then((res) => {
        dispatch(wishlistActions.removeFromWishlist(movieId));
        toast.error("Removed from wishlist");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      {loading ? (
        <div className="grid">
          <div className="shapes-7"></div>
        </div>
      ) : (
        <>
          <h1 className="row__title">{title}</h1>
          <div id="slider" className="movies__poster">
            <>
              {movies.map((movie) => (
                <MovieCard
                  key={movie.id}
                  id={movie.id}
                  title={
                    movie.original_name ? movie.original_name : movie.title
                  }
                  releaseDate={
                    movie.release_date
                      ? movie.release_date
                      : movie.first_air_date
                      ? movie.first_air_date
                      : "NA"
                  }
                  posterPath={movie.poster_path}
                  vote={movie.vote_average}
                  addToWishlistHandler={addToWishlistHandler}
                  removeFromWishlistHandler={removeFromWishlistHandler}
                  isWishlist={null}
                />
              ))}
            </>
          </div>
        </>
      )}
    </>
  );
};

export default CardList;
