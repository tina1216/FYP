import Button from "../components/Button";

export default function Comfirm() {
  return (
    <>
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="gap-6 flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <h1 className="text-xl font-sans font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            確認画面
          </h1>

          <div className="w-full md:mt-0 sm:max-w-md xl:p-0">
            <div className="mb-4 py-2 p-6 space-y-4 bg-white rounded-lg shadow dark:border md:space-y-6 sm:p-8 dark:bg-gray-800 dark:border-gray-700">
              <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                <li className="py-3 sm:py-4">
                  <a href="/" className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <img
                        className="w-8 h-8 rounded-full"
                        src="../assets/image/photo01.png"
                        alt=""
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-md font-sans text-gray-900 truncate dark:text-white">
                        OOOO党
                      </p>
                    </div>
                  </a>
                </li>
                <li className="py-3 sm:py-4">
                  <a href="/" className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <img
                        className="w-8 h-8 rounded-full"
                        src="../assets/image/photo01.png"
                        alt=""
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-md font-sans text-gray-900 truncate dark:text-white">
                        OOOO党
                      </p>
                    </div>
                  </a>
                </li>
              </ul>
            </div>

            <Button btn={{ text: "送信", color: "main" }}></Button>

            <button
              type="submit"
              className="w-full mt-4 font-sans text-primary-600 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 "
            >
              戻る
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
