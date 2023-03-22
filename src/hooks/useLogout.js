import { useDispatch } from "react-redux";
import { authActions } from "../redux/authSlice";
import { wishlistActions } from "../redux/wishlistSlice";

export const useLogout = () => {
  const dispatch = useDispatch();

  const logout = async () => {
    // remove from local storage
    localStorage.removeItem("user");

    // dispatch logout function
    dispatch(authActions.logout());
    dispatch(wishlistActions.showWishlist(null));
  };
  return { logout };
};
