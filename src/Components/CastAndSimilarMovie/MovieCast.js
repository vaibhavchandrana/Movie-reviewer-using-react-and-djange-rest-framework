import React, { useState, useEffect } from "react";
import { backendUrl } from "../../backendUrl";
import MovieCastCard from "./CastMember";
import axios from "axios";
import { Bars } from "react-loader-spinner"; // Import the loading icon
import "./cast.css";

const Casts = ({ id }) => {
  const url = backendUrl();
  const [loading, setLoading] = useState(false); // Set loading to true initially
  const [data, setData] = useState([]);

  useEffect(() => {
    async function getData() {
      try {
        setLoading(true);
        const response = await axios.get(`${url}/v2/api/cast/movie/${id}/`);
        const mydata = response.data;
        setData(mydata);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setData([]);
        setLoading(false);
      }
    }
    getData();
  }, [id]);

  return (
    <div>
      {loading ? (
        <div className="flex justify-center items-center">
          <Bars height={50} color="white" />
        </div>
      ) : (
        <div>
          {data.length > 0 && (
            <div className="max-w-lg flex flex-1/2 cast-container-scroll ">
              {data.map((item, index) => (
                <MovieCastCard
                  key={index}
                  castMember={{
                    image: item.profile_path,
                    name: item.name,
                    character: item.character_name,
                  }}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Casts;
