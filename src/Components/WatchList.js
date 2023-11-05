import React, { useEffect, useState } from "react";
import ReactStars from "react-stars";
import { ThreeCircles } from "react-loader-spinner";
import { Link } from "react-router-dom";
import axios from "axios";
import { backendUrl } from "../backendUrl";
import { AiOutlineDelete } from "react-icons/ai";
import swal from "sweetalert";
const WatchList = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const url = backendUrl();

  useEffect(() => {
    const movieToken = localStorage.getItem("movie_token");
    const userId = localStorage.getItem("mu_id");

    if (!movieToken || !userId) {
      console.error("User not logged in or token missing.");
      setLoading(false);
      return;
    }

    async function getData() {
      try {
        const response = await axios.get(
          `${url}/v2/api/get/movies/watchlist/${userId}/`,
          {
            headers: {
              Authorization: `Token ${movieToken}`,
            },
          }
        );
        const mydata = response.data.results;
        setData(mydata);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    }

    getData();
  }, []);

  async function deleteMovieFromWatchList(movieId) {
    const movieToken = localStorage.getItem("movie_token");

    if (!movieToken) {
      swal({
        title: "Please login to remove movie from watchlist",
        icon: "error",
        button: false,
        timer: 5000,
      });
      setLoading(false);
      return;
    }

    try {
      const response = await axios.delete(
        `${url}/v2/api/watchlist/delete/${movieId}/`,
        {
          headers: {
            Authorization: `Token ${movieToken}`,
          },
        }
      );

      if (response.status === 204) {
        swal({
          title: "Movie Removed from watchlist",
          icon: "success",
          button: false,
          timer: 5000,
        });
      } else {
        swal({
          title: "Unable to remove movie",
          icon: "error",
          button: false,
          timer: 5000,
        });
      }
    } catch (error) {
      swal({
        title: "Unable to remove movie",
        icon: "error",
        button: false,
        timer: 5000,
      });
    }
  }

  return (
    <div>
      <div className="flex flex-wrap  px-3 mt-2">
        {loading ? (
          <div className="w-full flex justify-center items-center h-96">
            <ThreeCircles height={80} color="white" />
          </div>
        ) : (
          data.map((element) => (
            <Link
              to={`/detail/${element.movie_details.id}`}
              key={element.movie_details.id}
            >
              <div className="relative card font-medium shadow-lg p-2 mx-3 hover:-translate-y-3 cursor-pointer mt-6 transition-all duration-500">
                <button
                  onClick={() => deleteMovieFromWatchList(element.id)}
                  className="delete-button-over-image text-xl bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-full focus:outline-none focus:ring focus:ring-red-400"
                >
                  <AiOutlineDelete />
                </button>
                <img
                  className="h-58 md:h-72 w-32 md:w-full pl-2"
                  src={element.movie_details.poster_path}
                  alt="ka alternative"
                />
                <h1>
                  <span className="text-red-500"></span>{" "}
                  {element.movie_details.title.length > 30
                    ? `${element.movie_details.title.slice(0, 25)}...`
                    : element.movie_details.title}
                </h1>
                <h1 className="flex items-center">
                  <span className="text-red-500 mr-1">Rating:</span>
                  <ReactStars
                    size={20}
                    half={true}
                    value={element.movie_details.rating / 2}
                    edit={false}
                  />
                </h1>
                <h1>
                  <span className="text-red-500">Year:</span>{" "}
                  {element.movie_details.release_date}
                </h1>
                <h1>
                  <span className="text-red-500">Added By:</span>{" "}
                  {element.owner == element.shared_by
                    ? "Me"
                    : element.shared_by_details.username}
                </h1>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default WatchList;
