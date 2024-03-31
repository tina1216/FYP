import React, { useContext } from "react";
import fetchData from "../hooks/fetchData";
import Table from "../components/Table";
import AuthContext from "../context/authProvider"; // If you're using AuthContext for the token

export default function Result() {
  const { auth } = useContext(AuthContext);
  const accessToken = auth?.accessToken;
  const { data: results, loading, error } = fetchData("/vote/tally", accessToken);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <section className="w-full flex flex-col justify-center antialiased bg-gray-50 dark:bg-gray-900">
      <div className="w-full h-full gap-6 flex flex-col items-center justify-center  px-6 pb-8 pt-24">
        <h1 className="text-xl font-sans font-bold leading-tight tracking-tight text-gray-900 mt-6 md:text-2xl dark:text-white">
          Result
        </h1>

        {Object.entries(results).map(([id_election, { electionName, results }]) => (
          <div
            key={id_election}
            className="w-full max-w-2xl mx-auto rounded-sm border border-gray-200"
          >
            <h2 className="text-base text-left font-sans font-bold leading-tight tracking-tight text-gray-900 mb-3 pl-1 md:text-l dark:text-white">
              Election: {electionName}
            </h2>
            <Table data={results} />
          </div>
        ))}
      </div>
    </section>
  );
}
