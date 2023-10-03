import React, { useEffect, useState } from "react";
import ReactStars from "react-stars";
import { ThreeCircles } from "react-loader-spinner";
import { Link } from "react-router-dom";
import axios from "axios";
import { backendUrl } from "../backendUrl";

const Card = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const url = backendUrl();
  useEffect(() => {
    async function getData() {
      setLoading(true);
      axios.get(`${url}/v2/api/movies/`).then((res) => {
        const mydata = res.data.results;
        setData(mydata);

        console.log(data);
      });

      setLoading(false);
    }
    getData();
  }, []);

  return (
    <div className="flex flex-wrap justify-between px-3  mt-2">
      {loading ? (
        <div className="w-full flex justify-center items-center h-96">
          <ThreeCircles height={80} color="white" />{" "}
        </div>
      ) : (
        data.map((element, index) => {
          return (
            <Link to={`/detail/${element.id}`}>
              {" "}
              <div
                key={index}
                className="card font-medium shadow-lg p-2 hover:-translate-y-3 cursor-pointer mt-6 transition-all duration-500"
              >
                <img
                  className="h-58 md:h-72 w-32 md:w-full pl-2"
                  src={element.poster_path}
                  alt=" ka alternative"
                />
                <h1>
                  <span className="text-red-500"></span> {element.title}
                </h1>
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
          );
        })
      )}
    </div>
  );
};

export default Card;
