import React, { useEffect, useState } from "react";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { BsCalendarHeartFill } from "react-icons/bs";

const Header = () => {
  const [token, setToken] = useState(localStorage.getItem("movie_token") || "");
  const [mu_id, setMuId] = useState(localStorage.getItem("mu_id") || 0);
  const checkForToken = () => {
    const newToken = localStorage.getItem("movie_token") || "";
    const newMuId = localStorage.getItem("mu_id") || 0;

    if (newToken !== token) {
      setToken(newToken);
    }

    if (newMuId !== mu_id) {
      setMuId(newMuId);
    }
  };
  setInterval(checkForToken, 10000);
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === "movie_token") {
        const newToken = localStorage.getItem("movie_token") ?? "";
        if (newToken !== token) {
          setToken(newToken);
        }
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [token]);

  function logout() {
    localStorage.removeItem("movie_token");
    localStorage.removeItem("mu_id");
    localStorage.removeItem("mm_genres");
    setToken("");
    setMuId(0);
  }

  return (
    <div className="text-lg sm:text-3xl flex flex-wrap items-center justify-between text-red-500 font-bold p-3 border-b-2 border-gray-500">
      <Link to="/">
        <span>
          {" "}
          Movie<span className="text-white">Reviewer</span>
        </span>
      </Link>
      {token && mu_id ? (
        <div className="flex">
          <Link to="/addmovie">
            <div className="text-lg cursor-pointer flex items-center">
              <Button>
                <AddBoxIcon className="text-lg sm:text-xl mr-2"> </AddBoxIcon>
                Add Movie
              </Button>
            </div>
          </Link>
          <Link to="/watchlist">
            <div className="text-lg cursor-pointer flex items-center">
              <Button>
                <BsCalendarHeartFill className="text-lg sm:text-xl mr-2" />
                Watchlist
              </Button>
            </div>
          </Link>
          <Link to="#">
            {" "}
            <div className="text-lg cursor-pointer flex items-center">
              <Button onClick={logout}>Logout</Button>
            </div>
          </Link>
        </div>
      ) : (
        <Link to="/login">
          <h1 className="text-lg text-white bg-red-500 cursor-pointer flex items-center">
            <Button>
              <p className="text-white"> Login</p>
            </Button>
          </h1>
        </Link>
      )}
    </div>
  );
};

export default Header;
