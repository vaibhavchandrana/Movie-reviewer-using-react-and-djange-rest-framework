import React, { useEffect, useState } from "react";
import ReactStars from "react-stars";
import { ThreeCircles } from "react-loader-spinner";
import { Link } from "react-router-dom";
import axios from "axios";
import { backendUrl } from "../backendUrl";
import Pagination from "./Pagination";
import GenreList from "./FilterItem/GenreList";
import SortBy from "./FilterItem/SortBy";
import SearchItem from "./FilterItem/SearchItem";
var screenWidth = window.screen.width;

const Card = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchItem, setSearchItem] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [genre, setGenre] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItem] = useState(0);
  const itemsPerPage = 12;
  const url = backendUrl();
  console.log(genre, sortBy);
  useEffect(() => {
    async function getData() {
      setLoading(true);
      await axios
        .get(`${url}/v2/api/movies/?page=${currentPage}&page_size=12`)
        .then((res) => {
          const mydata = res.data.results;
          setData(mydata);
          setTotalItem(res.data.count);
        });

      setLoading(false);
    }
    if (searchItem.length == 0 && sortBy.length == 0 && !Number(genre))
      getData();
  }, [currentPage, searchItem, genre, sortBy]);
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };
  function handleSeach(searchItem, result, count) {
    setSearchItem(searchItem);
    if (result.length > 0) {
      setData(result);
      setTotalItem(count);
    }
  }
  return (
    <>
      <div className="px-6 py-4 grid gap-3 md:flex md:justify-between md:items-center border-b border-gray-200 dark:border-gray-700">
        <div className="mx-1 md:w-1/3">
          <SearchItem
            handleSeach={handleSeach}
            currentPage={currentPage}
            setLoading={setLoading}
          />
        </div>
        <div className="flex  md:jutify-end">
          <div className="mx-1 md:px-2">
            <SortBy
              setLoading={setLoading}
              setData={setData}
              setTotalItem={setTotalItem}
              currentPage={currentPage}
              setSortBy={setSortBy}
            />
          </div>
          <div className="mx-1 md:px-2">
            <GenreList
              setLoading={setLoading}
              setData={setData}
              setTotalItem={setTotalItem}
              currentPage={currentPage}
              setGenre={setGenre}
            />
          </div>
        </div>
      </div>
      <div className="flex flex-wrap justify-between px-3 mt-2">
        {loading ? (
          <div className="w-full flex justify-center items-center h-96">
            <ThreeCircles height={80} color="white" />
          </div>
        ) : (
          data.map((element, index) => (
            <Link to={`/detail/${element.id}`} key={index}>
              <div className="card font-medium shadow-lg p-2 hover:-translate-y-3 cursor-pointer mt-6 transition-all duration-500">
                <img
                  className="h-58 md:h-72 w-32 md:w-full pl-2"
                  src={element.poster_path}
                  alt="ka alternative"
                />
                {screenWidth >= 600 ? (
                  <h1>
                    <span className="text-red-500"></span>{" "}
                    {element.title.length > 30
                      ? `${element.title.slice(0, 25)}...`
                      : element.title}
                  </h1>
                ) : (
                  <h1>
                    <span className="text-red-500"></span>{" "}
                    {element.title.length > 20
                      ? `${element.title.slice(0, 15)}...`
                      : element.title}
                  </h1>
                )}
                <h1 className="flex items-center">
                  <span className="text-red-500 mr-1">Rating:</span>
                  <ReactStars
                    size={20}
                    half={true}
                    value={element.vote_average / 2}
                    edit={false}
                  />
                </h1>
                <h1>
                  <span className="text-red-500">Year:</span>{" "}
                  {element.release_date}
                </h1>
              </div>
            </Link>
          ))
        )}
      </div>
      <center>
        {" "}
        {!loading && (
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(totalItems / itemsPerPage)}
            onPageChange={handlePageChange}
          />
        )}
      </center>
    </>
  );
};

export default Card;
