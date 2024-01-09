export default function Result({ data }) {
  return (
    <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
      <table className="table-auto w-full text-left text-gray-500 shadow-md sm:rounded-lg dark:text-gray-400">
        <thead className="text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="font-sans py-3 px-6 whitespace-nowrap">
              Candidate ID
            </th>
            <th scope="col" className="font-sans py-3 px-6 whitespace-nowrap">
              Candidate Name
            </th>
            <th scope="col" className="font-sans py-3 px-6 whitespace-nowrap">
              Candidate Detail
            </th>
            <th scope="col" className="font-sans py-3 px-6 whitespace-nowrap">
              Vote Count
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr
              key={item.candidateId}
              className="bg-white border-b dark:bg-gray-800 shadow-md sm:rounded-lg dark:border-gray-700"
            >
              <td className="font-sans py-4 px-6 whitespace-nowrap">{item.candidateId}</td>
              <td className="font-sans py-4 px-6 whitespace-nowrap">{item.candidateName}</td>
              <td className="font-sans py-4 px-6 whitespace-nowrap">{item.detail}</td>
              <td className="font-sans py-4 px-6 whitespace-nowrap">{item.voteCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
