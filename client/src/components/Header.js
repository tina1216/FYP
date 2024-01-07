import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import AuthContext from "../context/authProvider";

const Header = () => {
  const { auth, setAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      // Assuming the backend expects a POST request without a body
      // If your backend expects something different, adjust accordingly
      await axios.post(
        "/auth/logout",
        {},
        {
          headers: {
            // Include the accessToken if your backend requires it for logout
            Authorization: `${auth.accessToken}`,
          },
        }
      );

      // Clear the auth context
      setAuth({});

      // Remove the tokens from local storage
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");

      // Redirect to the login page
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const isLoggedIn = auth?.accessToken; // Check if accessToken exists in auth context

  return (
    <header>
      <nav className="bg-white border-gray-200 dark:bg-gray-900">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
            <img
              src="https://flowbite.com/docs/images/logo.svg"
              className="h-8"
              alt="Flowbite Logo"
            />
            <span className="self-center font-sans text-2xl font-semibold whitespace-nowrap dark:text-white">
              Voting
            </span>
          </Link>
          {isLoggedIn && (
            <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
              <button
                onClick={handleLogout}
                type="button"
                className="text-white font-sans bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                LOGOUT
              </button>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
