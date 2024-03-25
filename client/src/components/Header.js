import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import AuthContext from "../context/authProvider";
import voiceBox from "../assets/image/voiceBox.svg";

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
    <header className="relative">
      <nav className="w-full absolute bg-blue-700 border-gray-200  dark:bg-gray-900">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
            <img src={voiceBox} className="h-8" alt="voiceBox" />
          </Link>
          {isLoggedIn && (
            <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
              <button
                onClick={handleLogout}
                type="button"
                className="text-white font-sans bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                <p className="text-blue-700">LOGOUT</p>
              </button>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
