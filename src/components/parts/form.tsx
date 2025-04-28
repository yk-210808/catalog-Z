import * as React from "react";
import { SearchQueryContext } from "../../contexts/searchQueryContext";
import { navigate } from "gatsby";

interface FormSearchProps {
  className?: string;
}

export const FormSearch: React.FC<FormSearchProps> = ({ className }) => {
  const [query, setQuery] = React.useState<string>("");
  const { setSearchQuery } = React.useContext(SearchQueryContext);

  function handleFormAction(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSearchQuery({ query: query });
    navigate("/search");
  }


  return (
    <form className={`d-flex tm-search-form ${className}`} onSubmit={handleFormAction}>
      <input
        className="form-control tm-search-input"
        type="text"
        name="search"
        placeholder="Search"
        aria-label="Search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button className="btn btn-outline-success tm-search-btn" type="submit">
        <i className="fas fa-search"></i>
      </button>
    </form>
  )
}