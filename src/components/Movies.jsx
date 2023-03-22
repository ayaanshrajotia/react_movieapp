import React, { useEffect, useState } from "react";
import MovieCard from "./Cards/MovieCard";
import tmdb from "../axios";
import { API_KEY } from "../requests";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import axios from "axios";
import { wishlistActions } from "../redux/wishlistSlice";
import { server } from "..";

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [movieGenre, setMovieGenre] = useState("popular");
  const [genre, setGenre] = useState(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      if (genre !== null) {
        const response = await tmdb.get(
          `/discover/movie?api_key=${API_KEY}&language=en-US&page=${page}&with_genres=${genre}`
        );
        setMovies((oldMovies) => {
          if (page === 1) {
            return response.data.results;
          } else {
            return [...oldMovies, ...response.data.results];
          }
        });

        setLoading(false);
      } else {
        const response = await tmdb.get(
          `/movie/${movieGenre}?api_key=${API_KEY}&language=en-US&page=${page}`
        );
        setMovies((oldMovies) => {
          if (page === 1) {
            return response.data.results;
          } else {
            return [...oldMovies, ...response.data.results];
          }
        });
        setLoading(false);
      }
    };

    setTimeout(() => {
      fetchData();
    }, 400);
  }, [movieGenre, page, genre]);

  useEffect(() => {
    const event = window.addEventListener("scroll", () => {
      if (
        !loading &&
        window.innerHeight + window.scrollY >= document.body.scrollHeight - 2
      ) {
        setPage((oldPage) => {
          return oldPage + 1;
        });
      }
    });

    return () => {
      window.removeEventListener("scroll", event);
    };
  }, [loading]);

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);


  const addToWishlistHandler = async (movieDetails) => {
    if (!user) {
      toast.error("Please Login");
      return;
    }
    await axios
      .post(`${server}/wishlist` + movieDetails)
      .then((res) => {
        console.log(res.data);
        dispatch(wishlistActions.addToWishlist(res.data));
        toast.success(res.data.message);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const removeFromWishlistHandler = (movieId) => {
    dispatch({
      type: "removeFromWishlist",
      payload: movieId,
    });
    toast.error("Removed from wishlist");
  };

  return (
    <div className="movies__home">
      <div className="movies__filter_section">
        <h2>{`${
          genre === null ? movieGenre.replace("_", " ") : genre
        } Movies`}</h2>
        <div className="movies__filter__box">
          <div
            onClick={() => {
              setMovieGenre("popular");
              setGenre(null);
              setLoading(true);
            }}
            className={`movies__filter__link`}
            name="Popular"
          >
            Popular
          </div>
          <div
            onClick={() => {
              setMovieGenre("top_rated");
              setGenre(null);

              setLoading(true);
            }}
            className="movies__filter__link"
          >
            Top Rated
          </div>
          <div
            onClick={() => {
              setMovieGenre("upcoming");
              setGenre(null);

              setLoading(true);
            }}
            className="movies__filter__link"
          >
            Upcoming
          </div>
          <div
            onClick={() => {
              setGenre(12);

              setLoading(true);
            }}
            className="movies__filter__link"
          >
            Adventure
          </div>
          <div
            onClick={() => {
              setGenre(35);

              setLoading(true);
            }}
            className="movies__filter__link"
          >
            Comedy
          </div>
          <div
            onClick={() => {
              setGenre(18);

              setLoading(true);
            }}
            className="movies__filter__link"
          >
            Drama
          </div>
          <div
            onClick={() => {
              setGenre(10749);

              setLoading(true);
            }}
            className="movies__filter__link"
          >
            Romantic
          </div>
          <div
            onClick={() => {
              setGenre(53);

              setLoading(true);
            }}
            className="movies__filter__link"
          >
            Thriller
          </div>
          <div
            onClick={() => {
              setGenre(878);

              setLoading(true);
            }}
            className="movies__filter__link"
          >
            Science Fiction
          </div>
          <div
            onClick={() => {
              setGenre(10751);

              setLoading(true);
            }}
            className="movies__filter__link"
          >
            Family
          </div>
          <div
            onClick={() => {
              setGenre(27);

              setLoading(true);
            }}
            className="movies__filter__link"
          >
            Drama
          </div>
          <div
            onClick={() => {
              setGenre(16);

              setLoading(true);
            }}
            className="movies__filter__link"
          >
            Animated
          </div>
        </div>
      </div>
      {loading ? (
        <div className="grid">
          <div className="shapes-7"></div>
        </div>
      ) : (
        <main className="movies__section">
          {movies.map((movie) => (
            <MovieCard
              key={movie.id}
              id={movie.id}
              title={movie.original_name ? movie.original_name : movie.title}
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
        </main>
      )}
    </div>
  );
};

export default Movies;
