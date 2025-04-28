import * as React from 'react';
import { SearchQueryContext } from "../contexts/searchQueryContext";
import { SearchQueryType } from "../types/searchQuery";

export const SearchQueryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [searchQuery, setSearchQuery] = React.useState<SearchQueryType>({ query: null });
  const value = { searchQuery, setSearchQuery }

  return (
    <SearchQueryContext.Provider value={value}>
      {children}
    </SearchQueryContext.Provider>
  );
};