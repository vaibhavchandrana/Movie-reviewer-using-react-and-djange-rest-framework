import React, { useEffect, useState } from "react";
import ReactStars from "react-stars";
import { useParams } from "react-router-dom";
import { Bars } from "react-loader-spinner";
import Casts from "./CastAndSimilarMovie/MovieCast";
import Reviews from "./Reviews";
import axios from "axios";
import { backendUrl } from "../backendUrl";
import { BsCalendarHeartFill } from "react-icons/bs";
import ShareMovieModal from "./ShareMovie";
import swal from "sweetalert";
const Detail = () => {
  const { id } = useParams();
  const url = backendUrl();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});
  const screenWidth = window.screen.width;
  const [addingWatchlist, setAddingWatchList] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [sucessMessage, setSuccessMessage] = useState("Add To Watchlist");

  const addMovieToWatchlist = async (id) => {
    const userId = localStorage.getItem("mu_id") || 0;
    const movieToken = localStorage.getItem("movie_token");

    if (!userId || !movieToken) {
      swal({
        title: "Please Login to add Movie to watchlist",
        icon: "error",
        button: false,
        timer: 5000,
      });
      return;
    }

    setAddingWatchList(true);

    const config = {
      headers: {
        Authorization: `Token ${movieToken}`,
      },
    };

    await axios
      .post(
        `${url}/v2/api/add/movie/watchlist/`,
        {
          owner: userId,
          movies: id,
          shared_by: localStorage.getItem("mu_id"),
        },
        config
      )
      .then((res) => {
        setAddingWatchList(false);
        setSuccessMessage("Movie Added");
      })
      .catch(() => {
        setAddingWatchList(false);
        setSuccessMessage("Failed. Retry");
      });
  };

  useEffect(() => {
    async function getData() {
      try {
        const response = await axios.get(`${url}/v2/api/movies/${id}/`);
        const mydata = response.data;
        setData(mydata);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    }
    getData();
  }, [id]);

  return (
    <div className="p-4 mt-4 px-10">
      {loading ? (
        <div className="h-96 flex w-full justify-center items-center">
          <Bars height={50} color="white" />
        </div>
      ) : (
        <>
          <div
            className="flex flex-col md:flex-row items-center md:items-start w-full justify-around"
            style={{
              backgroundImage:
                screenWidth >= 600
                  ? `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${data.backdrop_path})`
                  : null,
              backgroundRepeat: "no-repeat",
              backgroundSize: "100% 100%",
              padding: "20px",
            }}
          >
            <img
              className=" block md:sticky top-24 image-details"
              src={data.poster_path ? data.poster_path : ""}
              alt="bla bla"
            />

            <div className="md:ml-4 ml-0 w-full md:w-1/2 my-2">
              <h1 className="text-2xl sm:text-2xl md:text-2xl lg:text-6xl font-bold text-blue-400">
                {data.title}{" "}
                <span className="text-lg md:text-xl">
                  {" "}
                  ({new Date(data.release_date).toDateString()}){" "}
                </span>
              </h1>
              <ReactStars
                size={screenWidth >= 600 ? 60 : 40}
                half={true}
                value={data.vote_average / 2}
                edit={false}
              />
              <span id="rating">
                <h3>{`${data.vote_average} (${data.vote_count}) `}</h3>
              </span>
              <p className="mt-2 text-md md:text-lg md:font-bold">
                {data.overview}
              </p>
              <p className="flex ">
                <span>
                  <h3 class="text-red-500 text-md md:text-lg font-bold">
                    Language:{" "}
                  </h3>
                </span>
                <span className="mx-3 text-md md:text-lg md:font-bold">
                  {data.original_language}
                </span>
              </p>
              <div className="flex ">
                <span>
                  <h3 className="text-red-500 text-md md:text-lg font-bold">
                    Genre:{" "}
                  </h3>
                </span>{" "}
                <div className="px-2">
                  {data && data.genre_ids ? (
                    data.genre_ids.map((item, index) => {
                      return (
                        <span
                          key={index}
                          className="text-md md:text-lg md:font-bold"
                        >{`${item.name}, `}</span>
                      );
                    })
                  ) : (
                    <span className="mx-3">No genres available</span>
                  )}
                </div>
              </div>
              <div className="flex ">
                {" "}
                <button
                  type="button"
                  onClick={() => addMovieToWatchlist(id)}
                  className="py-3 px-4 my-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-red-500 text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800"
                >
                  {addingWatchlist ? (
                    "Adding ..."
                  ) : (
                    <>
                      {sucessMessage}
                      <BsCalendarHeartFill />
                    </>
                  )}
                </button>
                <ShareMovieModal id={id} />
              </div>
            </div>
          </div>
          <div className="my-2">
            <h1 className="text-2xl md:text-4xl font-bold text-red-600 ">
              Top Cast:{" "}
            </h1>
            <br />
            <Casts id={id} />
          </div>
          <Reviews
            id={id}
            prevRating={data.rating}
            userRated={data.rated}
          ></Reviews>
        </>
      )}
    </div>
  );
};

export default Detail;
