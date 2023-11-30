export default function Result() {
  return (
    <div class="overflow-x-auto relative shadow-md sm:rounded-lg">
      <table class="w-full text-left text-gray-500 shadow-md sm:rounded-lg dark:text-gray-400">
        <thead class="text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" class="py-3 px-6">
              Name
            </th>
            <th scope="col" class="py-3 px-6">
              Party
            </th>
            <th scope="col" class="py-3 px-6">
              Votes
            </th>
          </tr>
        </thead>
        <tbody>
          <tr class="bg-white border-b dark:bg-gray-800 shadow-md sm:rounded-lg dark:border-gray-700">
            <td class="py-4 px-6">Alex Johnson</td>
            <td class="py-4 px-6">Liberal Democratic Party</td>
            <td class="py-4 px-6">4500</td>
          </tr>
          <tr class="bg-white border-b dark:bg-gray-800 shadow-md sm:rounded-lg dark:border-gray-700">
            <td class="py-4 px-6">Maria Garcia</td>
            <td class="py-4 px-6">Constitutional Democratic Party</td>
            <td class="py-4 px-6">3150</td>
          </tr>
          <tr class="bg-white border-b dark:bg-gray-800 shadow-md sm:rounded-lg dark:border-gray-700">
            <td class="py-4 px-6">James Smith</td>
            <td class="py-4 px-6">Nippon Ishin(Japan Innovation Party)</td>
            <td class="py-4 px-6">7820</td>
          </tr>
          <tr class="bg-white border-b dark:bg-gray-800 shadow-md sm:rounded-lg dark:border-gray-700">
            <td class="py-4 px-6">Patricia Brown</td>
            <td class="py-4 px-6">Democratic Party for the People</td>
            <td class="py-4 px-6">1230</td>
          </tr>
          <tr class="bg-white dark:bg-gray-800 shadow-md sm:rounded-lg dark:border-gray-700">
            <td class="py-4 px-6">Ethan Davis</td>
            <td class="py-4 px-6">Japanese Communist Party</td>
            <td class="py-4 px-6">865</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
