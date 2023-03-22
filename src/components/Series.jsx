import React, { useEffect, useState } from "react";
import tmdb from "../axios";
import { API_KEY } from "../requests";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import SeriesCard from "./Cards/SeriesCard";
import axios from "axios";
import { wishlistActions } from "../redux/wishlistSlice";
import { server } from "..";

const TV = () => {
  const [series, setSeries] = useState([]);
  const [seriesGenre, setSeriesGenre] = useState("airing_today");
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [genre, setGenre] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (genre !== null) {
        const response = await tmdb.get(
          `/discover/tv?api_key=${API_KEY}&language=en-US&page=${page}&with_genres=${genre}`
        );
        setSeries((oldMovies) => {
          if (page === 1) {
            return response.data.results;
          } else {
            return [...oldMovies, ...response.data.results];
          }
        });
        setLoading(false);
      } else {
        const response = await tmdb.get(
          `/tv/${seriesGenre}?api_key=${API_KEY}&language=en-US&page=${page}`
        );
        setSeries((oldMovies) => {
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
  }, [seriesGenre, page, genre]);

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
      .post(`${server}/wishlist` + movieDetails, { withCredentials: true })
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
    <div className="series__home">
      <div className="series__filter_section">
        <h2>{`${seriesGenre.replace("_", " ")} Series`}</h2>
        <div className="series__filter__box">
          <div
            onClick={() => {
              setSeriesGenre("airing_today");
              setGenre(null);
              setLoading(true);
            }}
            className="series__filter__link"
          >
            TV Airing Today
          </div>
          <div
            onClick={() => {
              setSeriesGenre("popular");
              setGenre(null);

              setLoading(true);
            }}
            className={`series__filter__link`}
          >
            TV Popular
          </div>
          <div
            onClick={() => {
              setSeriesGenre("top_rated");
              setGenre(null);

              setLoading(true);
            }}
            className="series__filter__link"
          >
            TV Top Rated
          </div>
          <div
            onClick={() => {
              setSeriesGenre("on_the_air");
              setGenre(null);

              setLoading(true);
            }}
            className="series__filter__link"
          >
            TV on The Air
          </div>
          <div
            onClick={() => {
              setGenre(10759);
              setLoading(true);
            }}
            className="series__filter__link"
          >
            Adventure & Adventure
          </div>
          <div
            onClick={() => {
              setGenre(35);
              setLoading(true);
            }}
            className="series__filter__link"
          >
            Comedy
          </div>
          <div
            onClick={() => {
              setGenre(18);

              setLoading(true);
            }}
            className="series__filter__link"
          >
            Drama
          </div>
          <div
            onClick={() => {
              setGenre(10763);
              setLoading(true);
            }}
            className="series__filter__link"
          >
            News
          </div>
          <div
            onClick={() => {
              setGenre(10766);

              setLoading(true);
            }}
            className="series__filter__link"
          >
            Soap
          </div>
          <div
            onClick={() => {
              setGenre(9648);

              setLoading(true);
            }}
            className="series__filter__link"
          >
            Mystery
          </div>
          <div
            onClick={() => {
              setGenre(10765);

              setLoading(true);
            }}
            className="series__filter__link"
          >
            Sci-Fi & Fantasy
          </div>
          <div
            onClick={() => {
              setGenre(10751);

              setLoading(true);
            }}
            className="series__filter__link"
          >
            Family
          </div>

          <div
            onClick={() => {
              setGenre(16);

              setLoading(true);
            }}
            className="series__filter__link"
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
        <main className="series__section">
          {series.map((series) => (
            <SeriesCard
              key={series.id}
              id={series.id}
              title={series.original_name ? series.original_name : series.title}
              releaseDate={
                series.release_date
                  ? series.release_date
                  : series.first_air_date
                  ? series.first_air_date
                  : "NA"
              }
              posterPath={series.poster_path}
              vote={series.vote_average}
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

export default TV;
