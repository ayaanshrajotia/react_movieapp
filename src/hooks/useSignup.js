import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { server } from "..";
import { authActions } from "../redux/authSlice";

export const useSignup = () => {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(null);
  const dispatch = useDispatch();

  const signup = async (email, password) => {
    setIsLoading(true);
    await axios
      .post(
        `${server}/user/signup`,
        { email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
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
