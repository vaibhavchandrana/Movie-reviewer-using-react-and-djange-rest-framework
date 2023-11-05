import React from "react";

const MovieCastCard = ({ castMember }) => {
  return (
    <div
      className="w-1/3 rounded-lg overflow-hidden shadow-md bg-gray-800 mx-4"
      style={{ minWidth: "200px" }}
    >
      <img
        src={castMember.image}
        alt={castMember.name}
        className="object-cover "
        style={{ borderRadius: "500px !important" }}
      />

      <div className="px-6 py-4">
        <div className=" text-md text-white-800 mb-2">{castMember.name}</div>
        <p className="text-gray-600 text-base">
          <span className="font-semibold text-red-600 text-sm">
            {castMember.character}
          </span>{" "}
        </p>
      </div>
    </div>
  );
};

export default MovieCastCard;
