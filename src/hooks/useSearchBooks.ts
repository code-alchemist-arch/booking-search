import { useState, useCallback, useEffect } from "react";

import useDebouncedCallback from "hooks/useDebouncedCallback";
import APIResponse from "types/APIResponse";
import Book from "types/Book";

interface useSearchBooksProps {
  searchValue: string;
}

export default function useSearchBooks({
  searchValue,
}: useSearchBooksProps) {
  const [books, setBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const onSearch = useCallback(() => {
    setIsLoading(true);

    fetch(`${process.env.REACT_APP_API_URL}${searchValue}`)
      .then((response) => {
        if (response.ok) return response.json();
        throw response;
      })
      .then((data: APIResponse) => {
        setBooks(data.docs);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error Fetching data", error);
      });
  }, [searchValue]);

  const onDebouncedSearch = useDebouncedCallback(onSearch, 500);

  useEffect(() => {
    onDebouncedSearch();
  }, [onDebouncedSearch]);

  return { books, isLoading };
}
