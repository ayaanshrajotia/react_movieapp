import axios from "axios";
import { server } from "..";

export const useWishlist = () => {
  const addWishlist = async ({ id, title, posterPath, releaseDate, vote }) => {
    const wishlistData = {
      id,
      title,
      posterPath,
      releaseDate,
      vote,
    };

    // await axios
    //   .post("http://localhost:4000/api/wishlist", wishlistData)
    //   .then((res) => {
    //     res.json(res.data);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  };

  const removeWishlist = async (id) => {
    await axios
      .delete(`${server}/wishlist/` + id, {
        withCredentials: true,
      })
      .then((res) => console.log(res.data))
      .catch((err) => {
        console.log(err);
      });
    console.log("http://localhost:4000/api/wishlist/" + id);
  };

  return { addWishlist, removeWishlist };
};
