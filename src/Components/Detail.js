import React, { useEffect, useState } from "react";
import ReactStars from "react-stars";
import { useParams } from "react-router-dom";
import { Bars } from "react-loader-spinner";
import Reviews from "./Reviews";
import axios from "axios";
import { backendUrl } from "../backendUrl";
import Casts from "./Casts";
const Detail = () => {
  const { id } = useParams();
  const url = backendUrl();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({});
  useEffect(() => {
    async function getData() {
      setLoading(true);
      axios.get(`${url}/v2/api/movies/${id}/`).then((res) => {
        const mydata = res.data;
        setData(mydata);
      });

      setLoading(false);
    }
    getData();
  }, []);

  return (
    <div className="p-4 mt-4 flex flex-col md:flex-row items-center md:items-start w-full justify-center">
      {loading ? (
        <div className="h-96 flex w-full justify-center items-center">
          <Bars height={50} color="white" />{" "}
        </div>
      ) : (
        <>
          <img
            className="h-96 block md:sticky top-24"
            src={
              data.poster_path
                ? "https://image.tmdb.org/t/p/w500/" + data.poster_path
                : ""
            }
            alt="bla bla"
          />

          <div className="md:ml-4 ml-0 w-full md:w-1/2">
            <h1 className="text-3xl font-bold text-gray-400">
              {data.title}{" "}
              <span className="text-xl"> ({data.release_date}) </span>
            </h1>
            <ReactStars
              size={20}
              half={true}
              value={data.vote_average / 2}
              edit={false}
            />
            <span id="rating">
              <h3>{`${data.vote_average} (${data.vote_count}) `}</h3>
            </span>
            <p className="mt-2">{data.overview}</p>
            <p className="flex ">
              <span>
                <h3 class="text-red-500">Language: </h3>
              </span>
              <span className="mx-3">{data.original_language}</span>
            </p>
            <div className="flex ">
              <span>
                <h3 className="text-red-500">Genre: </h3>
              </span>{" "}
              <div className="px-2">
                {data && data.genre_ids ? (
                  data.genre_ids.map((item, index) => {
                    return <span key={index}>{`${item.name}, `}</span>;
                  })
                ) : (
                  <span className="mx-3">No genres available</span>
                )}
              </div>
            </div>
            <Casts id={id} />
            <Reviews
              id={id}
              prevRating={data.rating}
              userRated={data.rated}
            ></Reviews>
          </div>
        </>
      )}
    </div>
  );
};

export default Detail;
