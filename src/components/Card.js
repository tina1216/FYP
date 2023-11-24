export default function Card({ card }) {
  return (
    <li className="py-3 p-6 sm:py-4 hover:bg-gray-100">
      <a href="/" className="flex items-center space-x-4">
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
      </a>
    </li>
  );
}
