import React, { useState, useEffect } from "react";
import { backendUrl } from "../backendUrl";
import axios from "axios";
const Casts = ({ id }) => {
  const url = backendUrl();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({});
  useEffect(() => {
    async function getData() {
      setLoading(true);
      axios.get(`${url}/v2/save_cast_data/${id}/`).then((res) => {
        const mydata = res.data;
        setData(mydata);
        console.log(mydata);
      });

      setLoading(false);
    }
    getData();
  }, []);

  return <div></div>;
};

export default Casts;
