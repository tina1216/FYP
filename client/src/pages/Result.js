import Table from "../components/Table";

export default function Result() {
  return (
    <section className="flex flex-col justify-center h-screenbg-gray-50 dark:bg-gray-900">
      <div className="gap-6 flex flex-col items-center justify-center px-6 py-8 lg:py-0">
        <h1 className="text-xl font-sans font-bold leading-tight tracking-tight text-gray-900 mt-6 md:text-2xl dark:text-white">
          Result
        </h1>

        <div className="pb-4">
          <h2 className="text-base text-left font-sans font-bold leading-tight tracking-tight text-gray-900 mb-3 pl-1 md:text-xl dark:text-white">
            小選挙区
          </h2>
          <Table></Table>
        </div>

        <div className="pb-4">
          <h2 className="text-base text-left font-sans font-bold leading-tight tracking-tight text-gray-900 mb-3 pl-1 md:text-xl dark:text-white">
            比例代表選挙
          </h2>
          <Table></Table>
        </div>

        <div className="pb-4">
          <h2 className="text-base text-left font-sans font-bold leading-tight tracking-tight text-gray-900 mb-3 pl-1 md:text-xl dark:text-white">
            最高裁判所裁判官国民審査
          </h2>
          <Table></Table>
        </div>
      </div>
    </section>
  );
}
