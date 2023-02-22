import { useState, useMemo } from "react";

import Book from "types/Book";

import "components/BookTable/index.css";

interface BookTableProps {
  books: Book[],
}

const columnClassName = "border-grey-light border hover:bg-gray-100 p-3 truncate";
const headerRowClassName = "bg-teal-400 flex flex-col flex-no wrap sm:table-row rounded-l-lg sm:rounded-none mb-2 sm:mb-0";
const headerColumnClassName = "p-3 text-left";

export default function BookTable({
  books,
}: BookTableProps) {
  const [isPublishDescent, setIsPublishDescent] = useState(true);
  const arrowClassName = useMemo(() => {
    const arrow = isPublishDescent
      ? "border-x-8 border-x-transparent border-t-[16px] border-t-blue-600"
      : "border-x-8 border-x-transparent border-b-[16px] border-b-blue-600";
    return `h-0 w-0 ml-2 cursor-pointer ${arrow}`;
  }, [isPublishDescent]);

  const sortedBooks = useMemo(() => {
    books.sort((prev, next) => {
      const prevPublishDate = prev.publish_date?.length ? prev.publish_date[0] : '';
      const nextPublishDate = next.publish_date?.length ? next.publish_date[0] : '';
      if (prevPublishDate > nextPublishDate) return isPublishDescent ? 1 : -1;
      if (nextPublishDate > prevPublishDate) return isPublishDescent ? -1 : 1;
      return 0;
    });
    return books;
  }, [books, isPublishDescent]);

  return (
    <table className="w-full flex flex-row flex-no-wrap sm:bg-white rounded-lg overflow-hidden sm:shadow-lg my-5">
      <thead className="text-white">
        {Array.apply(null, Array(4)).map((value, index) => (
          <tr key={index} className={headerRowClassName}>
            <th className={headerColumnClassName}>Book Title</th>
            <th className={headerColumnClassName}>Author Name</th>
            <th className={`${headerColumnClassName} flex items-center`}>
              Publish Date
              <div
                className={arrowClassName}
                onClick={() => setIsPublishDescent(!isPublishDescent)}
              />
            </th>
            <th className={headerColumnClassName}>ISBN</th>
            <th className={headerColumnClassName}>Pages</th>
          </tr>
        ))}
      </thead>
      <tbody className="flex-1 sm:flex-none">
        {sortedBooks.map(({ key, title, author_name, publish_date, isbn, number_of_pages_median }) => (
          <tr key={key} className="flex flex-col flex-no wrap sm:table-row mb-2 sm:mb-0">
            <td className={columnClassName}>{ title }</td>
            <td className={columnClassName}>{ author_name }</td>
            <td className={columnClassName}>{ publish_date?.length ? publish_date[0] : '' }</td>
            <td className={columnClassName}>{ isbn?.length ? isbn[0] : '' }</td>
            <td className={columnClassName}>{ number_of_pages_median }</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}