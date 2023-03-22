import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { server } from "..";
import { authActions } from "../redux/authSlice";

export const useLogin = () => {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(null);
  const dispatch = useDispatch();

  const login = async (email, password) => {
    setIsLoading(true);
    await axios
      .post(
        `${server}/user/login`,
        { email, password },
        { withCredentials: true }
      )
      .then((res) => {
        // save user in local storage
        localStorage.setItem("user", JSON.stringify(res.data));

        // update the auth context
        dispatch(authActions.login(res.data));
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        setError(err.response.data.error);
      });
  };

  return { login, error, isLoading };
};
