import { createContext } from 'react';
import { SearchQueryType } from '../types/searchQuery';

export const SearchQueryContext = createContext<{
  searchQuery: SearchQueryType;
  setSearchQuery: (query: SearchQueryType) => void;
}>({
  searchQuery: { query: null },
  setSearchQuery: () => {},
});