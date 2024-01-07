import React, { useState, useEffect, useContext } from "react";
import Card from "../components/Card";
import { useNavigate } from "react-router-dom";
import fetchData from "../hooks/fetchData";
import AuthContext from "../context/authProvider";

export default function Select() {
  const [currentCandidates, setCurrentCandidates] = useState([]);
  const [activeId, setActiveId] = useState("");
  const navigate = useNavigate();
  const isButtonDisabled = activeId === "";

  const { auth } = useContext(AuthContext);
  const accessToken = auth?.accessToken;

  const { data: fetchedCandidates, loading, error } = fetchData("/candidate/all", accessToken);

  useEffect(() => {
    if (fetchedCandidates && fetchedCandidates.length > 0) {
      setCurrentCandidates(fetchedCandidates);
    }
  }, [fetchedCandidates]);

  const handleSelectedItem = (obj) => {
    setActiveId(obj.id);
    const updatedCandidates = currentCandidates.map((candidate) =>
      candidate.id === obj.id
        ? { ...candidate, isSelected: true }
        : { ...candidate, isSelected: false }
    );
    setCurrentCandidates(updatedCandidates);
  };

  const onClickNext = () => {
    navigate("/confirm", { state: { selectedId: activeId } });
  };

  if (loading) return <p>Loading candidates...</p>;
  if (error) return <p>Error loading candidates!</p>;
  if (error) return console.log(error); //testing purpose

  return (
    <>
      <section className="flex flex-col justify-center h-screen bg-gray-50 dark:bg-gray-900">
        <div className="gap-6 flex flex-col items-center justify-center px-6 py-8 lg:py-0">
          <h1 className="text-xl font-sans font-bold leading-tight tracking-tight text-gray-900 mt-6 md:text-2xl dark:text-white">
            Select one candidate.
          </h1>

          <div className="w-full md:mt-0 sm:max-w-md xl:p-0">
            <div className="mb-4 py-3 space-y-4 bg-white rounded-lg shadow dark:border md:space-y-6  dark:bg-gray-800 dark:border-gray-700">
              <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                {currentCandidates.map((data, i) => {
                  return (
                    <Card
                      key={i}
                      card={{
                        id: data.id,
                        main: data.candidateName,
                        sub: data.detail,
                        // image: data.image,
                      }}
                      onClick={() => handleSelectedItem(data)}
                      isActive={activeId === data.id}
                    ></Card>
                  );
                })}
              </ul>
            </div>
            <button
              type="submit"
              className={`w-full font-sans text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 ${
                isButtonDisabled ? "opacity-50 cursor-not-allowed" : ""
              }`}
              onClick={onClickNext}
              disabled={isButtonDisabled}
            >
              NEXT
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
