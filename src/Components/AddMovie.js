import React, { useState, useEffect } from "react";
import { TailSpin } from "react-loader-spinner";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { backendUrl } from "../backendUrl";
const AddMovie = () => {
  const [form, setForm] = useState({
    title: "",
    poster_path: "",
    backdrop_path: "",
    genre_ids: [],
    adult: false,
    original_language: "",
    overview: "",
    popularity: 0,
    release_date: "",
    vote_average: 0,
    vote_count: 0,
  });

  const [selectedGenres, setSelectedGenres] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const url = backendUrl();

  // Fetch genres from the API or localStorage
  const [genreList, setGenreList] = useState(() => {
    const storedGenres = localStorage.getItem("mm_genres");
    return storedGenres ? JSON.parse(storedGenres) : [];
  });

  useEffect(() => {
    if (genreList.length === 0) {
      async function fetchData() {
        try {
          const response = await axios.get(`${url}/v2/api/genre/`);
          setGenreList(response.data);
          localStorage.setItem("mm_genres", JSON.stringify(response.data));
        } catch (error) {
          console.error("Error fetching genre data:", error);
        }
      }
      fetchData();
    }
  }, [url, genreList]);

  const handleGenreChange = (e) => {
    const selectedOptions = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setSelectedGenres(selectedOptions);
  };
  const addMovie = async () => {
    try {
      const token = localStorage.getItem("movie_token");
      if (token) {
        setLoading(true);
        const config = {
          headers: {
            Authorization: `Token ${token}`, // Include the token in the request headers
          },
        };
        const res = await axios.post(`${url}/v2/api/movies/`, form, config);
        if (res.status == 201) {
          swal({
            text: "Successfully added",
            icon: "success",
            buttons: false,
            timer: 3000,
          });
          setLoading(false);
          setForm({
            title: "",
            poster_path: "",
            backdrop_path: "",
            genre_ids: [],
            adult: false,
            original_language: "",
            overview: "",
            popularity: 0,
            release_date: "",
            vote_average: 0,
            vote_count: 0,
          });
        }
      } else {
        window.alert("Please login");
        navigate("/login");
      }
    } catch (err) {
      swal({
        title: err,
        icon: "error",
        button: false,
        timer: 5000,
      });
      setLoading(false);
    }
  };

  return (
    <div>
      <section className="text-black-600 body-font relative">
        <div className="container px-5 py-16 mx-auto">
          <div className="flex flex-col text-center w-full mb-4">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-white-900">
              Add New Movie
            </h1>
          </div>
          <div className="lg:w-1/2 md:w-2/3 mx-auto">
            <div className="flex flex-wrap -m-2">
              <div className="p-2 w-1/2">
                <div className="relative">
                  <label
                    for="name"
                    className="leading-7 text-sm text-white-600"
                  >
                    Name
                  </label>
                  <input
                    required
                    type="text"
                    id="name"
                    name="name"
                    value={form.title}
                    onChange={(e) =>
                      setForm({ ...form, title: e.target.value })
                    }
                    className="w-full bg-white-100  rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>
              <div className="p-2 w-1/2">
                <div className="relative">
                  <label
                    for="releaseDate"
                    className="leading-7 text-sm text-white-600"
                  >
                    Release Date
                  </label>
                  <input
                    required
                    type="date"
                    id="releaseDate"
                    name="releaseDate"
                    value={form.release_date}
                    onChange={(e) =>
                      setForm({ ...form, release_date: e.target.value })
                    }
                    className="w-full bg-white-100 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>

              <div className="p-2 w-full">
                <div className="relative">
                  <label
                    for="message"
                    className="leading-7 text-sm text-white-600"
                  >
                    Poster Image
                  </label>
                  <input
                    required
                    id="message"
                    name="message"
                    value={form.poster_path}
                    onChange={(e) =>
                      setForm({ ...form, poster_path: e.target.value })
                    }
                    className="w-full bg-white-100 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>
              <div className="p-2 w-full">
                <div className="relative">
                  <label
                    for="message"
                    className="leading-7 text-sm text-white-600"
                  >
                    Backdrop Image
                  </label>
                  <input
                    required
                    id="message"
                    name="message"
                    value={form.backdrop_path}
                    onChange={(e) =>
                      setForm({ ...form, backdrop_path: e.target.value })
                    }
                    className="w-full bg-white-100 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>
              <div className="p-2 w-full">
                <div className="relative">
                  <label
                    for="message"
                    className="leading-7 text-sm text-white-600"
                  >
                    Description
                  </label>
                  <textarea
                    required
                    id="message"
                    name="message"
                    value={form.overview}
                    onChange={(e) =>
                      setForm({ ...form, overview: e.target.value })
                    }
                    className="w-full bg-white-100 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                  ></textarea>
                </div>
              </div>
              <div className=" w-full flex">
                <div className="p-2 relative w-1/2">
                  <label
                    for="message"
                    className="leading-7 text-sm text-white-600"
                  >
                    Adult
                  </label>
                  <select className="w-full h-10  bg-white-100 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out">
                    <option value={true}>Yes</option>
                    <option value={false}>No</option>
                  </select>
                </div>
                <div className="p-2 w-1/2">
                  <div className="relative">
                    <label
                      for="name"
                      className="leading-7 text-sm text-white-600"
                    >
                      Language
                    </label>
                    <input
                      required
                      type="text"
                      id="name"
                      name="name"
                      value={form.original_language}
                      onChange={(e) =>
                        setForm({ ...form, original_language: e.target.value })
                      }
                      className="w-full bg-white-100  rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    />
                  </div>
                </div>
              </div>
              <div className="p-2 w-full">
                <div className="relative">
                  <label
                    htmlFor="message"
                    className="leading-7 text-sm text-white-600"
                  >
                    Select Genre
                  </label>
                  <select
                    className="w-full bg-white-100 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                    multiple
                    value={selectedGenres}
                    onChange={handleGenreChange}
                  >
                    {genreList.map((item, index) => (
                      <option key={item.id} value={item.id}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="p-2 w-full">
                <button
                  onClick={addMovie}
                  className="flex mx-auto text-white bg-red-500 border-0 py-2 px-8 focus:outline-none hover:bg-green-400 rounded text-lg"
                >
                  {loading ? <TailSpin height={25} color="white" /> : "Submit"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AddMovie;
