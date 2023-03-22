import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BiMovie } from "react-icons/bi";
import { HiStar } from "react-icons/hi";
import { useSelector } from "react-redux";
import { FaUser } from "react-icons/fa";
import { useLogout } from "../hooks/useLogout";
import { TbLogout } from "react-icons/tb";

const Header = () => {
  const [show, handleShow] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const { logout } = useLogout();
  const { user } = useSelector((state) => state.auth);

  window.addEventListener("scroll", () => {
    if (window.scrollY > 60) {
      handleShow(true);
    } else {
      handleShow(false);
    }
  });

  const handleLogout = () => {
    logout();
  };

  const { wishlist } = useSelector((state) => state.wishlist);
  useEffect(() => {}, [wishlist]);

  return (
    <nav className={`navbar ${show && "header_black"} h-nav-class`}>
      <Link to={"/"}>
        <BiMovie className="logo" />
      </Link>
      <div
        className={`header ${isVisible && " v-class "}${
          !isVisible && " h-class"
        }`}
      >
        <nav className={`header__left ${isVisible && " v-class "}`}>
          <Link
            className="link"
            to={"/home"}
            onClick={() => {
              setIsVisible((state) => !state);
            }}
          >
            Home
          </Link>
          <Link
            className="link"
            to={"/movies"}
            onClick={() => {
              setIsVisible((state) => !state);
            }}
          >
            Movies
          </Link>
          <Link
            className="link"
            to={"/series"}
            onClick={() => {
              setIsVisible((state) => !state);
            }}
          >
            Series
          </Link>
        </nav>
        <nav className={`header__right ${isVisible && " v-class "}`}>
          {user && (
            <Link
              className={`wishlist_icon ${show && "wishlist_icon_red"}`}
              to={"/wishlist"}
              onClick={() => {
                setIsVisible((state) => !state);
              }}
            >
              <HiStar />
              <p className={`${wishlist.length === 0 ? "hidden" : ""}`}>
                {wishlist.length > 0 && wishlist.length}
              </p>
            </Link>
          )}
          {/* <Link
            className="link"
            to={"/creator"}
            onClick={() => {
              setIsVisible((state) => !state);
            }}
          >
            Creator
          </Link> */}
          {!user && (
            <Link className="link user_link" to={"/login"}>
              <FaUser /> LOGIN
            </Link>
          )}
          {user && (
            <div onClick={handleLogout} className="link logout_button">
              <TbLogout />
            </div>
          )}
        </nav>
      </div>
      <div
        className="burger"
        onClick={() => {
          setIsVisible((state) => !state);
        }}
      >
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
      </div>
    </nav>
  );
};

export default Header;
