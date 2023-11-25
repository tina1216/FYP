import { useState, useEffect } from "react";
import Button from "../components/Button";
import Card from "../components/Card";
import { select01Data } from "../data/data";

export default function Select01() {
  const [selectedIndex, setSelectedIndex] = useState("");

  const handleSelect = (index) => {
    setSelectedIndex(index);
    console.log(index);
  };

  return (
    <>
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="gap-6 flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <h1 className="text-xl font-sans font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            候補者を１人お選びください
          </h1>

          <div className="w-full md:mt-0 sm:max-w-md xl:p-0">
            <div className="mb-4 py-3 space-y-4 bg-white rounded-lg shadow dark:border md:space-y-6  dark:bg-gray-800 dark:border-gray-700">
              <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                {select01Data.map((data, i) => {
                  return (
                    <Card
                      key={i}
                      card={{
                        id: data.id.toString(),
                        main: data.party,
                        sub: data.name,
                        image: data.image,
                      }}
                      onClick={() => handleSelect(i)}
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
