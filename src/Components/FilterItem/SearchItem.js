import React, { useState, useEffect } from "react";
import { backendUrl } from "../../backendUrl";
import axios from "axios";
const SearchItem = ({ currentPage, handleSeach, setLoading }) => {
  const url = backendUrl();
  const [searchItem, setSearchItem] = useState("");
  function handleSearchChange(e) {
    setSearchItem(e.target.value);
  }

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const response = await axios.get(
          `${url}/v2/api/movies/search?search=${searchItem}&page=${currentPage}&page_size=12`
        );
        setLoading(false);
        handleSeach(searchItem, response.data.results, response.data.count);
      } catch (error) {
        console.error("Error fetching genre data:", error);
        setLoading(false);
      }
    }
    if (searchItem.length >= 3) {
      fetchData();
    }
    if (searchItem.length < 3) {
      handleSeach("", [], 0);
    }
  }, [searchItem, currentPage]);
  return (
    <div>
      <label htmlFor="hs-as-table-product-review-search" className="sr-only">
        Search
      </label>
      <div className="relative">
        <input
          type="text"
          value={searchItem}
          onChange={handleSearchChange}
          id="hs-as-table-product-review-search"
          name="hs-as-table-product-review-search"
          className="py-2 px-3 pl-11 block w-full h-11 border-gray-200 shadow-sm rounded-md text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 bg-slate-900 border-gray-700 text-gray-400"
          placeholder="Search Movie"
        />
        <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none pl-4">
          <svg
            className="h-4 w-4 text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default SearchItem;
