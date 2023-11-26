import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Button({ btn }) {
  // const navigate = useNavigate();

  // useEffect(() => {
  //   const handleClick = (page) => {
  //     console.log(page);
  //     navigate(`/${page}`);
  //   };
  // });

  const handleClick = (page) => {
    // console.log(page);
    // navigate(`/${page}`);
  };

  if (btn.color === "main") {
    return (
      <button
        type="button"
        className="w-full font-sans text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
        onClick={handleClick(btn.navigateTo)}
      >
        {btn.text}
      </button>
    );
  } else if (btn.color === "none") {
    return (
      <button
        type="button"
        className="w-full mt-4 font-sans text-primary-600 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600"
        onClick={handleClick(btn.navigateTo)}
      >
        {btn.text}
      </button>
    );
  }
}
