import { useRef, useState, useEffect, useContext } from "react";
import axios from "../services/api";
import AuthContext from "../context/authProvider";
import { useNavigate } from "react-router-dom";
const LOGIN_URL = "/auth/login";

export default function Login() {
  const { setAuth } = useContext(AuthContext);
  const navigate = useNavigate();
  const userIdRef = useRef();
  const errRef = useRef();

  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    userIdRef.current?.focus();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(LOGIN_URL, { userId, password }, { withCredentials: true });
      const { accessToken, existingUser } = response.data;
      const hasVoted = existingUser?.hasVoted;

      setAuth({
        userId,
        password,
        role: existingUser.role,
        accessToken,
        userId: existingUser.userId,
        hasVoted,
      });

      if (existingUser.role === "ADMIN" || hasVoted) {
        navigate("/result");
      } else {
        navigate("/select");
      }
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrMsg("Missing Username or Password");
      } else if (err.response?.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login Failed");
      }
      errRef.current?.focus();
    }
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-sans font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Log into your account
            </h1>
            {errMsg ? (
              <div
                ref={errRef}
                className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
              >
                <span className="block font-sans sm:inline">
                  <p>{errMsg}</p>
                </span>
              </div>
            ) : (
              ""
            )}

            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6" action="#">
              <div>
                <label
                  htmlFor="userId"
                  className="block mb-2 text-sm font-sans font-medium text-gray-900 dark:text-white"
                >
                  Your ID
                </label>
                <input
                  type="text"
                  name="userId"
                  id="userId"
                  ref={userIdRef}
                  autoComplete="off"
                  onChange={(e) => setUserId(e.target.value)}
                  value={userId}
                  required
                  className="bg-gray-50 border border-gray-300 font-sans text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="ID1234566"
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-sans font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  required
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>

              <button
                type="submit"
                className="w-full font-sans text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                onClick={handleSubmit}
              >
                LOGIN
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
