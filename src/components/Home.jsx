import React, { useEffect } from "react";
import {} from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import requests from "../requests";
import CardList from "./SeriesCardList";
import MovieCardList from "./MovieCardList";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { wishlistActions } from "../redux/wishlistSlice";

const Home = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchWishlist = async () => {
      await axios
        .get("http://localhost:4000/api/wishlist", {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        })
        .then((res) => {
          console.log(res.data);
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
    <div className="home">
      <MovieCardList title="Trending" fetchUrl={requests.fetchTrending} />
      <MovieCardList title="Popular" fetchUrl={requests.fetchPopularMovies} />
      <CardList title="TV Popular" fetchUrl={requests.fetchTvPopular} />
      <CardList title="TV Top Rated" fetchUrl={requests.fetchTvTopRated} />
      <MovieCardList
        title="Documentaries"
        fetchUrl={requests.fetchDocumentaries}
      />
    </div>
  );
};

export default Home;
