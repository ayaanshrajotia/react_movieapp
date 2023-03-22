import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { authActions } from "../redux/authSlice";

export const useSignup = () => {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(null);
  const dispatch = useDispatch();

  const signup = async (email, password) => {
    setIsLoading(true);
    await axios
      .post(
        "http://localhost:4000/api/user/signup",
        { email, password },
        { withCredentials: true }
      )
      .then((res) => {
        // save the user in local storage
        localStorage.setItem("user", JSON.stringify(res.data));

        // update user slice
        dispatch(authActions.login(res.data));
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        setError(err.response.data.error);
      });
  };

  return { signup, error, isLoading, setError };
};
