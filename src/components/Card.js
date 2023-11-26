// import { useState, useEffect } from "react";

export default function Card({ card, onClick, isActive }) {
  return (
    <li className={`flex items-center `} onClick={onClick}>
      <label
        htmlFor={`${card.id}`}
        className={`flex items-center justify-between  p-6 py-3 sm:py-4 w-full cursor-pointer ${
          isActive ? "bg-blue-100" : "hover:bg-blue-50 peer-checked:bg-blue-100"
        }`}
      >
        <input
          type="checkbox"
          id={`${card.id}`}
          value={`${card.id}`}
          className="hidden"
          required=""
        ></input>

        <div className="flex-shrink-0">
          <img className="w-8 h-8 rounded-full" src={card.image} alt={card.main} />
        </div>
        <div className="flex-1 min-w-0">
          {card.sub ? (
            <p className="text-sm font-sans font-medium text-gray-500 truncate dark:text-gray-400">
              {card.sub}
            </p>
          ) : (
            ""
          )}
          <p className="text-sm font-sans text-gray-900 truncate dark:text-white"> {card.main}</p>
        </div>
      </label>
    </li>
  );
}
