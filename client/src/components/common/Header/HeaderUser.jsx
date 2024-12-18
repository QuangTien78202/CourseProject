import React, { useEffect, useState } from "react";
import "./header.css";
import Popover from "@mui/material/Popover";
import { Link, redirect, useLocation, useNavigate } from "react-router-dom";
import { Bell, ShoppingBag, ShoppingCart } from "lucide-react";
import { onLogout } from "../../../fetchData/User";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../redux/features/authSlice";
import ModalNotification from "./ModalNotification";
import { useNotifications } from "../Notification/useNotifications";
import ModalCart from "./ModalCart";
import { getQuantityInCart } from "../../../redux/features/cartSlice";

function HeaderUser() {
  const user = useSelector((state) => state.auth.user);
  const isLogin = useSelector((state) => state.auth.isLogin);
  const num = useSelector(getQuantityInCart);

  // goi. userNotification
  const { notifications, unreadCount, setNotifications, setUnreadCount } =
    useNotifications(user._id);

  const [showUserItem, setShowUserItem] = useState(false);
  const [userAnchorEl, setUserAnchorEl] = useState(null);
  const [bellAnchorEl, setBellAnchorEl] = useState(null);
  const [cartAnchorEl, setCartAnchorEl] = useState(null);
  const handleUserClick = (event) => {
    setUserAnchorEl(event.currentTarget);
  };

  const handleUserClose = () => {
    setUserAnchorEl(null);
  };

  const handleBellClick = (event) => {
    setBellAnchorEl(event.currentTarget);
  };

  const handleBellClose = () => {
    setBellAnchorEl(null);
  };

  const handleCartClick = (event) => {
    setCartAnchorEl(event.currentTarget);
  };

  const handleCartClose = () => {
    setCartAnchorEl(false);
  };

  const handleMouseLeave = () => {
    setTimeout(() => {
      handleCartClose();
    }, 1000);
  };

  const handleNavigateCart = () => {
    handleCartClose();
    navigate("/cart");
  };

  const open = Boolean(userAnchorEl);
  const bellOpen = Boolean(bellAnchorEl);
  const cartOpen = Boolean(cartAnchorEl);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    onLogout();
    dispatch(logout());
    navigate("/");
    window.location.reload();
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        handleUserClose();
        handleBellClose();
        handleCartClose();
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    handleUserClose();
    handleBellClose();
    handleCartClose();
  }, [location]);

  return (
    <>
      {" "}
      {isLogin && user && (
        <div className=" justify-around items-center gap-x-6 hidden px-3 md:flex">
          <div className=" items-center justify-between gap-x-4 hidden lg:flex">
            <div
              className="cursor-pointer w-12 h-12 flex justify-center items-center relative "
              onClick={handleBellClick}
            >
              {unreadCount > 0 && (
                <div className="w-[20px] h-[20px] rounded-full absolute  top-0 right-0 flex justify-center items-center text-xs font-semibold bg-primary">
                  {unreadCount}
                </div>
              )}
              <Bell
                className=" transition-transform duration-200 ease-in-out transform  hover:text-primary"
                size={20}
              />
            </div>
            <Popover
              style={{
                marginTop: "7px",
                marginLeft: "22px",
              }}
              open={bellOpen}
              anchorEl={bellAnchorEl}
              onClose={handleBellClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              PaperProps={{
                style: { width: "396px" },
              }}
            >
              {/* Content for the bell icon popover */}
              <>
                <ModalNotification />
              </>
            </Popover>
            <div
              className="cursor-pointer w-12 h-12 justify-center flex items-center relative z-[80]"
              onClick={handleCartClick}
              onDoubleClick={handleNavigateCart}
            >
              {num > 0 && (
                <div className="w-[20px] h-[20px] rounded-full absolute  top-0 right-0  flex justify-center items-center text-xs font-semibold bg-primary">
                  {num}
                </div>
              )}
              <ShoppingBag
                className=" transition-transform duration-200 ease-in-out transform hover:text-primary"
                size={20}
              />
            </div>
            <Popover
              style={{
                zIndex: 40,
                // zIndex: 100,
                marginTop: "7px",
                marginLeft: "22px",
              }}
              open={cartOpen}
              anchorEl={cartAnchorEl}
              onClose={handleCartClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              PaperProps={{
                style: { width: "346px" },
              }}
            >
              {/* Content for the bell icon popover */}
              <ModalCart />
            </Popover>
          </div>

          <button variant="contained" onClick={handleUserClick}>
            <div onClick={() => setShowUserItem(!showUserItem)}>
              <img
                className="w-8 h-8 min-w-8 rounded-full transition-transform duration-200 ease-in-out transform hover:scale-110 hover:opacity-80"
                src={user.avatar}
                alt=""
              />
            </div>
          </button>
          <Popover
            style={{
              marginTop: "12px",
              marginLeft: "22px",
            }}
            open={open}
            anchorEl={userAnchorEl}
            onClose={handleUserClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            PaperProps={{
              style: { width: "346px" },
            }}
          >
            <div className="flex flex-col justify-center px-9 pt-6 pb-2  ">
              <div className="flex flex-row items-center pb-4 gap-4">
                <img
                  className="w-11 h-11 rounded-full"
                  src={user?.avatar}
                  alt=""
                />
                <h1>{user.username}</h1>
              </div>
              <hr className="mb-2" />
              <div className="text-gray-500">
                <ul className="text-sm">
                  <li className="hover:text-black mb-2">
                    <Link
                      className="block py-2"
                      to={"/profile/informationuser"}
                      onClick={() => handleUserClose()}
                    >
                      Profile
                    </Link>
                  </li>
                  <li className="hover:text-black mb-2">
                    <Link
                      className="block py-2"
                      to={"/mylearningcourse"}
                      onClick={() => handleUserClose()}
                    >
                      My learning course
                    </Link>
                  </li>
                </ul>
                <hr className="my-2" />

                <ul className="text-sm">
                  <li className="hover:text-black mb-4">
                    <Link
                      to="/blogform"
                      className="block py-2"
                      onClick={() => handleUserClose()}
                    >
                      Write Blog
                    </Link>
                  </li>
                  <li className="hover:text-black mb-4">
                    <Link
                      to="/myblog"
                      className="block py-2"
                      onClick={() => handleUserClose()}
                    >
                      My Blog
                    </Link>
                  </li>
                </ul>
                <hr className="my-2" />
                <ul className="text-sm">
                  <li className="hover:text-black mb-2">
                    <Link
                      to="/"
                      className="block py-2"
                      onClick={() => handleUserClose()}
                    >
                      Saved Blogs
                    </Link>
                  </li>
                </ul>
                <hr className="my-2" />
                <ul className="text-sm">
                  <li className="hover:text-black mb-2">
                    <Link to='/' className="block py-2 cursor-pointer" onClick={handleLogout}>
                      Log Out
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </Popover>
          {/* {showUserItem && <UserMenu />} */}
        </div>
      )}
    </>
  );
}

export default HeaderUser;
