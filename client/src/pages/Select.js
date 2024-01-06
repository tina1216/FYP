import React, { useState, useEffect } from "react";
import Button from "../components/Button";
import Card from "../components/Card";

export default function Select() {
  const [candidates, setCandidates] = useState([{}]);
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    fetch("/candidate/all")
      .then((res) => res.json())
      .then((data) => {
        setCandidates(data);
      });
  }, []);

  const handleSelectedItem = (obj) => {
    setActiveId(obj.id);
    const updatedCandidates = candidates.map((candidate) =>
      candidate.id === obj.id ? { ...obj } : candidate
    );
    setCandidates(updatedCandidates);
  };

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
                {candidates.map((data, i) => {
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
                      isActive={activeId === data.id ? true : false}
                    ></Card>
                  );
                })}
              </ul>
            </div>

            <Button btn={{ text: "NEXT", color: "main", navigateTo: "confirm" }}></Button>
          </div>
        </div>
      </section>
    </>
  );
}
