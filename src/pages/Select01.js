import image from "../assets/image/photo01.png";

export default function Select01() {
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
                <li className="py-3 p-6 sm:py-4 hover:bg-gray-100">
                  <a href="/" className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <img className="w-8 h-8 rounded-full" src={image} alt="" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-sans font-medium text-gray-500 truncate dark:text-gray-400">
                        OOOO党
                      </p>
                      <p className="text-sm font-sans text-gray-900 truncate dark:text-white">
                        立候補者の名前
                      </p>
                    </div>
                  </a>
                </li>

                <li className="py-3 p-6 sm:py-4 hover:bg-gray-100">
                  <a href="/" className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <img className="w-8 h-8 rounded-full" src={image} alt="" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-sans font-medium text-gray-500 truncate dark:text-gray-400">
                        OOOO党
                      </p>
                      <p className="text-sm font-sans text-gray-900 truncate dark:text-white">
                        立候補者の名前
                      </p>
                    </div>
                  </a>
                </li>
              </ul>
            </div>

            <button
              type="submit"
              className="w-full font-sans text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
              次へ
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
