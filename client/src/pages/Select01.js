import React, { useState, useEffect } from "react";
import Button from "../components/Button";
import Card from "../components/Card";
import { select01Data } from "../data/data";

export default function Select01() {
  const [selectedItem, setSelectedItem] = useState([]);
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    console.log("Newly selected item 1:", selectedItem);
    console.log("activeId 1", activeId);
  }, [selectedItem, activeId]);

  const handleSelectedItem = (obj) => {
    setActiveId(obj.id);
    const newItem = { ...obj };
    setSelectedItem(newItem);
  };

  return (
    <>
      <section className="flex flex-col justify-center h-screen bg-gray-50 dark:bg-gray-900">
        <div className="gap-6 flex flex-col items-center justify-center px-6 py-8 lg:py-0">
          <h1 className="text-xl font-sans font-bold leading-tight tracking-tight text-gray-900 mt-6 md:text-2xl dark:text-white">
            候補者を１人お選びください
          </h1>

          <div className="w-full md:mt-0 sm:max-w-md xl:p-0">
            <div className="mb-4 py-3 space-y-4 bg-white rounded-lg shadow dark:border md:space-y-6  dark:bg-gray-800 dark:border-gray-700">
              <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                {select01Data.map((data) => {
                  return (
                    <Card
                      key={data.id}
                      card={{
                        id: data.id.toString(),
                        main: data.party,
                        sub: data.name,
                        image: data.image,
                      }}
                      onClick={() => handleSelectedItem(data)}
                      isActive={activeId === data.id ? true : false}
                    ></Card>
                  );
                })}
              </ul>
            </div>

            <Button btn={{ text: "次へ", color: "main", navigateTo: "select02" }}></Button>
          </div>
        </div>
      </section>
    </>
  );
}
