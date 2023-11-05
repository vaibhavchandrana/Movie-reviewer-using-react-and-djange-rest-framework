import React, { useEffect, useState } from "react";
import { backendUrl } from "../../backendUrl";
import axios from "axios";
const SortBy = ({
  setLoading,
  setData,
  setTotalItem,
  currentPage,
  setSortBy,
}) => {
  const url = backendUrl();
  const [sortList] = useState([
    {
      id: "sort_by=vote_average&order=desc",
      value: "Rating ( High to Low )",
    },
    {
      id: "sort_by=vote_average&order=asc",
      value: "Rating ( Low to High )",
    },
    {
      id: "sort_by=release_date&order=desc",
      value: "Release Date ( New First )",
    },
    {
      id: "sort_by=release_date&order=asc",
      value: "Release Date ( Old First )",
    },
  ]);
  const [selectedGenre, setSelectedGenre] = useState(""); // Added state for selected genre

  const handleGenreChange = (event) => {
    setSelectedGenre(event.target.value); // Update selected genre
    setSortBy(event.target.value);
  };
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const response = await axios.get(
          `${url}/v2/api/movies/?${selectedGenre}&page=${currentPage}&page_size=12`
        );
        setLoading(false);
        setData(response.data.results);
        setTotalItem(response.data.count);
      } catch (error) {
        console.error("Error fetching genre data:", error);
        setLoading(false);
      }
    }
    if (selectedGenre.length >= 3) {
      fetchData();
    }
  }, [selectedGenre, currentPage]);
  return (
    <div>
      <div>
        <select
          id="hs-select-label"
          className="py-3 px-4 pr-9 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 bg-slate-900 border-gray-700 text-gray-400"
          value={selectedGenre}
          onChange={handleGenreChange}
        >
          <option value="">Sort By</option>
          {sortList.map((item) => (
            <option key={item.id} value={item.id}>
              {item.value}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default SortBy;
