import React from "react";
import { useNavigate } from "react-router-dom";

export default function Submitted() {
  const navigate = useNavigate();

  const onClickNext = () => {
    navigate("/result");
  };

  return (
    <section className="flex flex-col justify-center h-screen bg-gray-50 dark:bg-gray-900">
      <div className="gap-6 flex flex-col items-center justify-center  h-screen px-6 py-8 lg:py-0">
        <h1 className="text-xl font-sans font-bold leading-tight tracking-tight text-gray-900 mt-6 md:text-2xl dark:text-white">
          Thank you for submittion
        </h1>
        <div className="w-full md:mt-0 sm:max-w-md xl:p-0">
          <button
            type="submit"
            className="w-full font-sans text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            onClick={onClickNext}
          >
            RESULT
          </button>
        </div>
      </div>
    </section>
  );
}
