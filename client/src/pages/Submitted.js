import Button from "../components/Button";

export default function Submitted() {
  return (
    <section className="flex flex-col justify-center h-screen bg-gray-50 dark:bg-gray-900">
      <div className="gap-6 flex flex-col items-center justify-center px-6 py-8 lg:py-0">
        <h1 className="text-xl font-sans font-bold leading-tight tracking-tight text-gray-900 mt-6 md:text-2xl dark:text-white">
          Thank you for submittion
        </h1>
        <div className="w-full md:mt-0 sm:max-w-md xl:p-0">
          <Button btn={{ text: "See Result", color: "main", navigateTo: "result" }}></Button>
        </div>
      </div>
    </section>
  );
}
