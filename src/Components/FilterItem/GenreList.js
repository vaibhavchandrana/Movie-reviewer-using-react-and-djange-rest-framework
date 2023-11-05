import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl } from "../../backendUrl";

const GenreList = ({
  setLoading,
  setData,
  setTotalItem,
  currentPage,
  setGenre,
}) => {
  const [genreList, setGenreList] = useState(() => {
    return JSON.parse(localStorage.getItem("mm_genres")) || [];
  });
  const [selectedGenre, setSelectedGenre] = useState(0);
  const url = backendUrl();

  useEffect(() => {
    if (!genreList.length) {
      const fetchData = async () => {
        try {
          const response = await axios.get(`${url}/v2/api/genre/`);
          setGenreList(response.data);
          localStorage.setItem("mm_genres", JSON.stringify(response.data));
        } catch (error) {
          console.error("Error fetching genre data:", error);
        }
      };
      fetchData();
    }
  }, [url, genreList.length]);

  useEffect(() => {
    if (Number(selectedGenre)) {
      const fetchData = async () => {
        setLoading(true);
        try {
          const response = await axios.get(
            `${url}/v2/api/movies/genre/by_genre/?genre_id=${selectedGenre}&page=${currentPage}`
          );
          setData(response.data.results);
          setTotalItem(response.data.count);
        } catch (error) {
          console.error("Error fetching movies by genre:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    }
  }, [selectedGenre, currentPage]);

  const handleGenreChange = (event) => {
    setSelectedGenre(event.target.value);
    setGenre(event.target.value);
  };

  return (
    <div>
      <select
        id="hs-select-label"
        className="py-3 px-4 pr-9 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 bg-slate-900 border-gray-700 text-gray-400"
        value={selectedGenre}
        onChange={handleGenreChange}
      >
        <option value="0">
          {!Number(selectedGenre) ? "Select Genre" : "All"}
        </option>
        {genreList.map((item) => (
          <option key={item.id} value={item.id}>
            {item.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default GenreList;
