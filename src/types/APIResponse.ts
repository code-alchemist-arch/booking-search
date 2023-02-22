import Book from "types/Book";

export default interface APIResponse {
  numFound: number;
  start: number;
  numFoundExact: boolean;
  docs: Book[];
};
