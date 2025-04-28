import * as React from "react";
import { SearchQueryProvider } from "./searchQueryProvider";

const ProviderTree = ({ children }: { children: React.ReactNode }) => {
  return (
    <SearchQueryProvider>
      {children}
    </SearchQueryProvider>
  );
}

export default ProviderTree;