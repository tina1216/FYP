import React, { useState, useEffect } from "react";
import Button from "../components/Button";
import { select02Data } from "../data/data";
import Card from "../components/Card";

export default function Select02() {
  const [selectedItem, setSelectedItem] = useState([]);
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    console.log("Newly selected item 2:", selectedItem);
    console.log("activeId 2", activeId);
  }, [selectedItem, activeId]);

  const handleSelectedItem = (obj) => {
    setActiveId(obj.id);
    const newItem = { ...obj };
    setSelectedItem(newItem);
  };

  return (
    <>
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="gap-6 flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <h1 className="text-xl font-sans font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            政党を1つお選びください
          </h1>

          <div className="w-full md:mt-0 sm:max-w-md xl:p-0">
            <div className="mb-4 py-2 space-y-4 bg-white rounded-lg shadow dark:border md:space-y-6 dark:bg-gray-800 dark:border-gray-700">
              <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                {select02Data.map((data, i) => {
                  return (
                    <Card
                      key={i}
                      card={{
                        id: data.id.toString(),
                        main: data.party,
                        sub: "",
                        image: data.image,
                      }}
                      onClick={() => handleSelectedItem(data)}
                      isActive={activeId === data.id ? true : false}
                    ></Card>
                  );
                })}
              </ul>
            </div>

            <Button btn={{ text: "次へ", color: "main", navigateTo: "select03" }}></Button>
            <Button btn={{ text: "戻る", color: "none", navigateTo: "select01" }}></Button>
          </div>
        </div>
      </section>
    </>
  );
}
