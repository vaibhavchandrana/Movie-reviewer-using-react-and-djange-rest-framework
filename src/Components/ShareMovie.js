import React, { useState } from "react";
import axios from "axios";
import { PiShareFatFill } from "react-icons/pi";
import { backendUrl } from "../backendUrl";
import swal from "sweetalert";
function ShareMovieModal({ id }) {
  const [email, setEmail] = useState("");
  const url = backendUrl();
  const userId = localStorage.getItem("mu_id") || 0;
  const shareMovie = async () => {
    const movieToken = localStorage.getItem("movie_token");
    const userId = localStorage.getItem("mu_id");

    if (!movieToken || !userId) {
      swal({
        title: "Please login to share the movie",
        icon: "error",
        button: false,
        timer: 5000,
      });
      return;
    }

    try {
      const response = await axios.post(
        `${url}/v2/api/share/watchlist/`,
        {
          owner_email: email,
          shared_by: userId,
          movie: id,
        },
        {
          headers: {
            Authorization: `Token ${movieToken}`,
          },
        }
      );

      if (response.status === 201) {
        swal({
          text: "Successfully added",
          icon: "success",
          buttons: false,
          timer: 3000,
        });
      } else {
        swal({
          title: response.data.error || "An error occurred",
          icon: "error",
          button: false,
          timer: 5000,
        });
      }
    } catch (error) {
      swal({
        title: error.response.data.error || "An error occurred",
        icon: "error",
        button: false,
        timer: 5000,
      });
    }
  };

  return (
    <>
      <button
        data-hs-overlay="#hs-vertically-centered-modal"
        className="w-12 h-12 rounded-full bg-white text-red-500 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center cursor-pointer my-4 mx-6"
      >
        <PiShareFatFill style={{ fontSize: "25px" }} />
      </button>

      <div
        id="hs-vertically-centered-modal"
        className="hs-overlay hidden w-full h-full fixed top-0 left-0 z-[60] overflow-x-hidden overflow-y-auto"
      >
        <div className="hs-overlay-open:mt-7 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 mt-0 opacity-0 ease-out transition-all sm:max-w-lg sm:w-full m-3 sm:mx-auto min-h-[calc(100%-3.5rem)] flex items-center">
          <div className="flex flex-col bg-white border shadow-sm rounded-xl bg-gray-800 border-gray-700 shadow-slate-700/[.7]">
            <div className="flex justify-between items-center py-3 px-4 border-b border-gray-700">
              <h3 className="font-bold  text-white">Share Movie</h3>
              <button
                type="button"
                className="hs-dropdown-toggle inline-flex flex-shrink-0 justify-center items-center h-8 w-8 rounded-md text-gray-500 hover:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-white transition-all text-sm focus:ring-gray-700 focus:ring-offset-gray-800"
                data-hs-overlay="#hs-vertically-centered-modal"
              >
                <span className="sr-only">Close</span>
                <svg
                  className="w-3.5 h-3.5"
                  width={8}
                  height={8}
                  viewBox="0 0 8 8"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0.258206 1.00652C0.351976 0.912791 0.479126 0.860131 0.611706 0.860131C0.744296 0.860131 0.871447 0.912791 0.965207 1.00652L3.61171 3.65302L6.25822 1.00652C6.30432 0.958771 6.35952 0.920671 6.42052 0.894471C6.48152 0.868271 6.54712 0.854471 6.61352 0.853901C6.67992 0.853321 6.74572 0.865971 6.80722 0.891111C6.86862 0.916251 6.92442 0.953381 6.97142 1.00032C7.01832 1.04727 7.05552 1.1031 7.08062 1.16454C7.10572 1.22599 7.11842 1.29183 7.11782 1.35822C7.11722 1.42461 7.10342 1.49022 7.07722 1.55122C7.05102 1.61222 7.01292 1.6674 6.96522 1.71352L4.31871 4.36002L6.96522 7.00648C7.05632 7.10078 7.10672 7.22708 7.10552 7.35818C7.10442 7.48928 7.05182 7.61468 6.95912 7.70738C6.86642 7.80018 6.74102 7.85268 6.60992 7.85388C6.47882 7.85498 6.35252 7.80458 6.25822 7.71348L3.61171 5.06702L0.965207 7.71348C0.870907 7.80458 0.744606 7.85498 0.613506 7.85388C0.482406 7.85268 0.357007 7.80018 0.264297 7.70738C0.171597 7.61468 0.119017 7.48928 0.117877 7.35818C0.116737 7.22708 0.167126 7.10078 0.258206 7.00648L2.90471 4.36002L0.258206 1.71352C0.164476 1.61976 0.111816 1.4926 0.111816 1.36002C0.111816 1.22744 0.164476 1.10028 0.258206 1.00652Z"
                    fill="currentColor"
                  />
                </svg>
              </button>
            </div>
            {userId ? (
              <>
                <div className="mx-12 my-4 share-movie-modal">
                  <div class="overflow-y-auto">
                    <p class="text-gray-400 mb-4">
                      Enter the email address of the user whom you want to share
                      the movie with. It will be added to their watchlist
                    </p>
                  </div>
                  <label
                    htmlFor="hs-leading-icon"
                    className="block text-sm font-medium mb-2 text-white"
                  >
                    Email address
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="hs-leading-icon"
                      name="hs-leading-icon"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="py-3 px-4 pl-11 block w-full border-gray-200 shadow-sm rounded-md text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 bg-slate-900 border-gray-700 text-gray-400"
                      placeholder="you@site.com"
                    />
                    <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none z-20 pl-4">
                      <svg
                        className="h-4 w-4 text-gray-400"
                        xmlns="http://www.w3.org/2000/svg"
                        width={16}
                        height={16}
                        fill="currentColor"
                        viewBox="0 0 16 16"
                      >
                        <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555ZM0 4.697v7.104l5.803-3.558L0 4.697ZM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757Zm3.436-.586L16 11.801V4.697l-5.803 3.546Z" />
                      </svg>
                    </div>
                  </div>
                </div>{" "}
              </>
            ) : (
              <div className="mx-12 my-4 share-movie-modal">
                <div class="overflow-y-auto">
                  <p class="text-gray-400 mb-4">
                    Please Login to Share the movie
                  </p>
                </div>
              </div>
            )}
            <div className="flex justify-end items-center gap-x-2 py-3 px-4 border-t border-gray-700">
              <button
                type="button"
                className="hs-dropdown-toggle py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm bg-slate-900 hover:bg-slate-800 border-gray-700 text-gray-400 hover:text-white focus:ring-offset-gray-800"
                data-hs-overlay="#hs-vertically-centered-modal"
              >
                Close
              </button>
              {userId ? (
                <button
                  onClick={shareMovie}
                  className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm focus:ring-offset-gray-800"
                >
                  Share
                </button>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ShareMovieModal;
