import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Header from "./components/Header";
import Home from "./components/Home";
import Movies from "./components/Movies";
import MovieDetails from "./components/MovieDetails";
import Creator from "./components/Creator";
import Series from "./components/Series";
import Wishlist from "./components/Wishlist";
import SeriesDetails from "./components/SeriesDetails";

import "./styles/Header.scss";
import "./styles/Home.scss";
import "./styles/MovieCard.scss";
import "./styles/MovieDetails.scss";
import "./styles/Searchbar.scss";
import "./styles/CardList.scss";
import "./styles/Creator.scss";
import "./styles/CharacterCard.scss";
import "./styles/ErrorPage.scss";
import "./styles/Movies.scss";
import "./styles/Card.scss";
import "./styles/Series.scss";
import "./styles/Wishlist.scss";
import "./styles/WishlistCard.scss";
import "./styles/SeriesCard.scss";
import LoginPage from "./components/LoginPage";
import SignupPage from "./components/SignupPage";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "./redux/authSlice";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      dispatch(authActions.login(user));
    }
  }, [dispatch]);
  const { user } = useSelector((state) => state.auth);

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Navigate replace to="/home" />} />
        <Route path="home" element={<Home />}></Route>
        <Route path="/movies" element={<Movies />} />
        <Route path="/series" element={<Series />} />
        <Route path="/movie/:movieId" element={<MovieDetails />} />
        <Route path="/series/:seriesId" element={<SeriesDetails />} />
        <Route
          path="/wishlist"
          element={user ? <Wishlist /> : <Navigate to={"/"} />}
        />
        <Route
          path="/login"
          element={!user ? <LoginPage /> : <Navigate to={"/"} />}
        />
        <Route
          path="/signup"
          element={!user ? <SignupPage /> : <Navigate to={"/"} />}
        />
        <Route path="/creator" element={<Creator />} />
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;
