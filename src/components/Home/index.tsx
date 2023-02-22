import { useState } from "react";

import SearchInput from "components/SearchInput"
import BookTable from "components/BookTable";
import Loader from "components/Loader";

import useSearchBooks from "hooks/useSearchBooks";

export default function Home() {
  const [searchValue, setSearchValue] = useState('');
  const { books, isLoading } = useSearchBooks({ searchValue });

  return (
    <div className="p-4 relative">
      {isLoading && (
        <Loader />
      )}
      <SearchInput
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
      <BookTable books={books}/>
    </div>
  )
}