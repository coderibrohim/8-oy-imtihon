import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useLogout } from "../hooks/useLogout";
import { Link, useLocation } from "react-router-dom";
import ThemeToggle from "../theme/themeToggle";

function Navbar() {
  const { user } = useSelector((store) => store.user);
  const { _logout, isPending, error } = useLogout();
  const [open, setOpen] = useState(false);
  const location = useLocation();
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);
  const defaultAvatar = `https://ui-avatars.com/api/?name=${
    user?.displayName || "User"
  }&background=random`;

  const userPhoto = user?.photoURL || defaultAvatar;

  return (
    <div className="navbar bg-base-100 shadow-sm fixed top-0 left-0 w-full z-50 px-6">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl">
          Kitchen App
        </Link>
      </div>

      <span className="font-medium">{user?.displayName}</span>
      <div className="flex items-center gap-3">
        <div className="relative">
          <button
            onClick={() => setOpen(!open)}
            className="flex items-center gap-2 px-4 py-2 rounded-md cursor-pointer"
          >
            <div className="avatar">
              <div className="w-10 rounded-full border">
                <img
                  src={userPhoto}
                  alt="User avatar"
                  onError={(e) => {
                    e.target.src = defaultAvatar;
                  }}
                />
              </div>
            </div>
          </button>

          {open && (
            <div className="absolute right-0 mt-2 w-44 bg-transparent shadow-md rounded-md overflow-hidden animate-fadeIn">
              <Link
                to="/"
                className={`block px-4 py-2 hover:bg-gray-100 ${
                  location.pathname === "/" ? "text-blue-600 font-semibold" : ""
                }`}
              >
                Home
              </Link>

              <Link
                to="/create"
                className={`block px-4 py-2 hover:bg-gray-100 ${
                  location.pathname === "/create"
                    ? "text-blue-600 font-semibold"
                    : ""
                }`}
              >
                Create Recipe
              </Link>
              <ThemeToggle/>

              <div className="border-t my-1"></div>

              {error && (
                <p className="text-center text-red-500 text-sm px-2">{error}</p>
              )}

              {!isPending ? (
                <button
                  onClick={_logout}
                  className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                >
                  Logout
                </button>
              ) : (
                <button
                  disabled
                  className="w-full text-left px-4 py-2 text-gray-400 cursor-not-allowed"
                >
                  Loading...
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
