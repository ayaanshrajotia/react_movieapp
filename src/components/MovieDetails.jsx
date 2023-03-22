import axios from "../axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// import Fade from "react-reveal/Fade";
import { API_KEY } from "../requests";
import movieTrailer from "movie-trailer";
import YouTube from "react-youtube";
import { BsFillPlayCircleFill, BsFillPauseCircleFill } from "react-icons/bs";
import Character from "./Cards/CharacterCard";
import ErrorPage from "./ErrorPage";

const MovieDetail = () => {
  const params = useParams();
  const [movieDetails, setMovieDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [trailerUrl, setTrailerUrl] = useState("");
  const [showTrailer, setShowTrailer] = useState(false);
  const [movieCharacters, setMovieCharacter] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const details = await axios.get(
          `/movie/${params.movieId}?api_key=${API_KEY}&language=en-US`
        );

        const cast = await axios.get(
          `/movie/${details.data.id}/credits?api_key=${API_KEY}&language=en-US`
        );
        setMovieCharacter(cast.data.cast);
        setMovieDetails(details.data);
        setLoading(false);
      } catch {
        setError(true);
        setLoading(false);
      }
    };
    // setTimeout(() => {
    fetchDetails();
    // }, 400);
  }, [params.movieId]);

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  const opts = {
    height: "330",
    width: "580",
    playerVars: {
      autoplay: 1,
    },
  };

  const handleClick = (movie) => {
    if (trailerUrl) {
      setTrailerUrl("");
      setShowTrailer(false);
    } else {
      setShowTrailer(true);
      movieTrailer(movie?.original_title || "")
        .then((url) => {
          const urlParams = new URLSearchParams(new URL(url).search);
          const trailer = urlParams.get("v");
          setTrailerUrl(trailer);
        })
        .catch((error) => console.log(error));
    }
  };

  if (error) {
    return <ErrorPage message={"No data for this movie"} />;
  }
  return (
    <div className={`movie__details`}>
      {loading ? (
        <div className="grid">
          <div className="shapes-7"></div>
        </div>
      ) : (
        <>
          {movieDetails.backdrop_path !== null ? (
            <img
              className="movie__details_poster"
              src={`https://image.tmdb.org/t/p/original/${movieDetails.backdrop_path}`}
              alt="Poster"
            />
          ) : (
            <img
              className="movie__details_poster"
              src="https://img.freepik.com/premium-photo/black-director-chair-is-isolated-black-background-it-use-video-production-movie-industry-studio-shot_335640-1963.jpg"
              alt="Alt Poster"
              srcset=""
            />
          )}
          {/* <Fade left> */}
          <div
            className={`movie__trailer ${showTrailer ? "show_trailer" : ""}`}
          >
            {trailerUrl && (
              <YouTube className="youtube" videoId={trailerUrl} opts={opts} />
            )}
          </div>
          <div className="flex_container">
            <div className="movie__desc_container">
              <div className="movie__desc">
                <h1 className="movie__desc_title">{movieDetails.title}</h1>
                <h2 className="movie__desc_date">
                  Released on {movieDetails.release_date}
                </h2>
                <span
                  className={`movie__vote ${
                    movieDetails.vote_average < 4
                      ? `red-vote`
                      : movieDetails.vote_average > 8
                      ? `green-vote`
                      : `orange-vote`
                  }`}
                >
                  {movieDetails.vote_average !== 0
                    ? movieDetails.vote_average.toFixed(1)
                    : "N/A"}
                </span>
                <p className="movie__desc_para">{movieDetails.overview}</p>
                <div className="money__section">
                  <div className="movie__budget finance">
                    <h2 className="heading">Budget</h2>
                    <span className="digits">
                      {formatter.format(movieDetails.budget) !== 0
                        ? formatter.format(movieDetails.budget)
                        : "No data"}
                    </span>
                  </div>
                  <div className="movie__revenue finance">
                    <h2 className="heading">Revenue</h2>
                    <span className="digits">
                      {formatter.format(movieDetails.revenue)}
                    </span>
                  </div>
                </div>
              </div>
              <div className="movie__trailer_button">
                {showTrailer ? (
                  <BsFillPauseCircleFill
                    className="movie__trailer_icon"
                    onClick={() => handleClick(movieDetails)}
                  />
                ) : (
                  <BsFillPlayCircleFill
                    className="movie__trailer_icon"
                    onClick={() => handleClick(movieDetails)}
                  />
                )}
                <h3 className="movie__trailer_span">Watch Trailer</h3>
              </div>
            </div>
            {movieCharacters.length > 0 ? (
              <div className="movie__cast">
                <h2>Cast</h2>
                <div className="movie__cast__characters">
                  {movieCharacters.map(
                    (character, index) =>
                      index < 10 && (
                        <Character
                          name={character.name}
                          character={character.character}
                          profile_path={character.profile_path}
                          key={character.id}
                        />
                      )
                  )}
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
          {/* </Fade> */}
        </>
      )}
    </div>
  );
};

export default MovieDetail;
