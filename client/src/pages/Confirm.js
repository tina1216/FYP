import React, { useContext, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import fetchData from "../hooks/fetchData";
import AuthContext from "../context/authProvider";
import axios from "../services/api";

export default function Confirm() {
  const location = useLocation();
  const navigate = useNavigate();
  const selectedId = location.state?.selectedId;
  const [id_election, setElectionId] = useState(null);

  const { auth } = useContext(AuthContext);
  const accessToken = auth?.accessToken;

  const { data: candidate, loading, error } = fetchData(`/candidate/${selectedId}`, accessToken);

  useEffect(() => {
    if (candidate) {
      setElectionId(candidate.id_election);
    }
  }, [candidate, id_election]);

  if (!selectedId) {
    // Redirect back to selection page or show a message
    navigate("/select");
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading candidate!</p>;

  const onClickVote = async () => {
    try {
      const response = await axios.post(
        "/vote/vote",
        { candidateId: selectedId, id_election: id_election },
        {
          headers: {
            Authorization: `${accessToken}`,
          },
        }
      );

      navigate("/submitted");
    } catch (error) {
      console.error("Error submitting vote:", error);
    }
  };

  const handleBack = () => {
    navigate(-1); // Goes back to the previous page
  };

  return (
    <>
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="gap-6 flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen md:h-screen lg:py-0">
          <h1 className="text-xl font-sans font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Confirm
          </h1>

          <div className="w-full md:mt-0 sm:max-w-md xl:p-0">
            {candidate && (
              <div className="mb-4 py-2 p-6 space-y-4 bg-white rounded-lg shadow dark:border md:space-y-6 sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                  <li className="py-3 sm:py-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        {/* <img
                          className="w-8 h-8 rounded-full"
                          src="../assets/image/photo01.png"
                          alt=""
                        /> */}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-sans text-gray-600 truncate dark:text-white">
                          {candidate.detail}
                        </p>
                        <p className="text-md font-sans text-gray-900 truncate dark:text-white">
                          {candidate.candidateName}
                        </p>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            )}

            <button
              type="submit"
              className="w-full font-sans text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              onClick={onClickVote}
            >
              SUBMIT
            </button>

            <button
              onClick={handleBack}
              type="button"
              className="w-full mt-4 font-sans text-primary-600 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 "
            >
              BACK
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
