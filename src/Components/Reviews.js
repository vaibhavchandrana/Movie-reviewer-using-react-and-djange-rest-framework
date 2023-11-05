import React, { useState, useEffect } from "react";
import ReactStars from "react-stars";
import { TailSpin, ThreeDots } from "react-loader-spinner";
import swal from "sweetalert";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { backendUrl } from "../backendUrl";

const Reviews = ({ id }) => {
  const url = backendUrl();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [reviewLoading, setReviewLoading] = useState(false);
  const [data, setData] = useState([]);
  const [form, setForm] = useState({
    rating: 0,
    review_data: "",
    added_by: localStorage.getItem("mu_id") ?? 0,
    movie_id: id,
  });
  const [newAdded, setNewAdded] = useState(0);

  const handleReviewChange = (e) => {
    setForm({ ...form, review_data: e.target.value });
  };

  const handleRatingChange = (rate) => {
    setForm({ ...form, rating: rate });
  };

  const sendReview = async () => {
    setLoading(true);
    setData([]);
    const token = localStorage.getItem("movie_token");
    const userId = localStorage.getItem("mu_id") ?? 0;

    if (!token || !userId) {
      swal({
        title: "Please Login to add Movie to watchlist",
        icon: "error",
        button: false,
        timer: 5000,
      });
      navigate("/login");
      setLoading(false);
      return;
    }

    setForm({ ...form, added_by: userId });

    try {
      const response = await axios.post(`${url}/v2/api/reviews/`, form, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });

      if (response.status === 201) {
        swal({
          text: "Review Added Successfully",
          icon: "success",
          buttons: false,
          timer: 3000,
        });
        setForm({ ...form, review_data: "", rating: 0 });
        setNewAdded(newAdded + 1);
      } else {
        swal({
          text: "Unable to add review",
          icon: "error",
          buttons: false,
          timer: 3000,
        });
        setNewAdded(newAdded + 1);
      }
    } catch (err) {
      swal({
        title: err,
        icon: "error",
        button: false,
        timer: 5000,
      });
    }
    setLoading(false);
  };

  const trimReviewText = (text, limit = 300) => {
    return text.length <= limit ? text : text.slice(0, limit) + " ...";
  };

  const toggleReadMore = (index) => {
    const updatedData = [...data];
    updatedData[index].showFullText = !updatedData[index].showFullText;
    setData(updatedData);
  };

  useEffect(() => {
    const fetchData = async () => {
      setReviewLoading(true);
      const response = await axios.get(`${url}/v2/api/review/movie/${id}/`);
      const mydata = response.data.map((item) => ({
        ...item,
        showFullText: false,
      }));
      setData(mydata);
      setReviewLoading(false);
    };
    fetchData();
  }, [newAdded]);

  return (
    <div className="mt-2 py-2 border-t-2 border-gray-700 w-full">
      <ReactStars
        size={30}
        half={true}
        value={form.rating}
        onChange={handleRatingChange}
      />
      <input
        value={form.review_data}
        onChange={handleReviewChange}
        placeholder="Share your thoughts..."
        type="text"
        className="w-full p-2 outline-none bg-gray-600"
      />
      <button onClick={sendReview} className="bg-red-500 w-full p-1">
        {loading ? (
          <div className="flex justify-center items-center">
            <TailSpin height={15} color="white" />{" "}
          </div>
        ) : (
          "Share"
        )}
      </button>
      {reviewLoading ? (
        <div className="mt-6 flex justify-center item-center">
          <ThreeDots height={20} color="red" />
        </div>
      ) : (
        <div>
          {data.map((e, i) => (
            <div
              className="p-5 w-full mt-4 border rounded-lg border-red-600"
              key={i}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <span className="inline-flex items-center justify-center h-[2.875rem] w-[2.875rem] rounded-full bg-white">
                    <span className="font-large text-red-600 leading-none text-lg">
                      {e.added_by.username.slice(0, 2).toUpperCase()}
                    </span>
                  </span>
                  <div className="ml-3">
                    <p className="text-red-500 font-bold">
                      {e.added_by.username}
                    </p>
                    <p className="text-xs text-gray-500">
                      {new Date(e.created_at).toLocaleString()}
                    </p>
                  </div>
                </div>
                <ReactStars
                  size={20}
                  half={true}
                  value={e.rating}
                  edit={false}
                />
              </div>
              {e.showFullText ? (
                <p className="text-justify">{e.review_data}</p>
              ) : (
                <p className="text-justify">{trimReviewText(e.review_data)}</p>
              )}
              {e.review_data.length > 300 && (
                <button
                  onClick={() => toggleReadMore(i)}
                  className="text-blue-500 underline cursor-pointer"
                >
                  {e.showFullText ? "Read Less" : "Read More"}
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Reviews;
