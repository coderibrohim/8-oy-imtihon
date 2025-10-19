import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useLogout } from "../hooks/useLogout";
import { Link, useLocation } from "react-router-dom";

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
    <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-white/30 border-b border-white/40 shadow-lg">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-3">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-yellow-500 bg-clip-text text-transparent tracking-wide hover:scale-105 transition-transform"
        >
          KitchenApp
        </Link>

        {/* User info + dropdown */}
        <div className="relative flex items-center gap-3">
          {/* Username */}
          <span className="font-medium text-gray-800 hidden sm:block">
            {user?.displayName}
          </span>

          {/* Avatar */}
          <button
            onClick={() => setOpen(!open)}
            className="flex items-center justify-center w-11 h-11 rounded-full cursor-pointer transition"
          >
            <img
              src={userPhoto}
              alt="User avatar"
              className="w-10 h-10 rounded-full border border-white shadow-sm object-cover"
              onError={(e) => (e.target.src = defaultAvatar)}
            />
          </button>

          {/* Dropdown */}
          {open && (
            <div className="absolute right-0 top-14 w-48 bg-white/80 backdrop-blur-md shadow-xl rounded-xl overflow-hidden animate-fadeIn border border-gray-200">
              {/* Home */}
              <Link
                to="/"
                className={`block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-orange-100 ${
                  location.pathname === "/"
                    ? "text-orange-600 font-semibold"
                    : ""
                }`}
              >
                 Home
              </Link>

              {/* Create */}
              <Link
                to="/create"
                className={`block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-orange-100 ${
                  location.pathname === "/create"
                    ? "text-orange-600 font-semibold"
                    : ""
                }`}
              >
                 Create Recipe
              </Link>

              <div className="border-t my-1"></div>

              {/* Logout */}
              {error && (
                <p className="text-center text-red-500 text-xs px-2">{error}</p>
              )}

              {!isPending ? (
                <button
                  onClick={_logout}
                  className="w-full text-left px-4 py-2 text-sm font-semibold text-red-600 hover:bg-red-50 transition"
                >
                 Logout
                </button>
              ) : (
                <button
                  disabled
                  className="w-full text-left px-4 py-2 text-gray-400 cursor-not-allowed text-sm"
                >
                  Logging out...
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
