import React from "react";
import CarItem from "./CarItem";
import Spinner from "./Spinner";
import { Link } from "react-router-dom";

const CarRow = ({ rowTitle, data, isLoading, mobileView, className }) => {
  return (
    <div className="px-10 md:px-0 mt-36">
      {rowTitle && (
        <div className="flex justify-between items-center mt-4 mb-4">
          <h2 className="ml-4 mb-6 font-semibold text-secondary-300">
            {rowTitle}
          </h2>
          <Link
            to="/cars"
            className="text-xl hover:bg-blue-600 transition duration-500 ease text-white cursor-pointer no-underline px-3 py-2.5 bg-blue-400 flex items-center"
            style={{ borderRadius: "23px" }} // Optional: Makes the button rounded
          >
            View All
          </Link>
        </div>
      )}
      <div className="flex justify-center items-center">
        {isLoading && <Spinner />}
      </div>
      {!isLoading && (
        <ul
          className={`mb-12 grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 ${
            mobileView ? "grid grid-cols-1" : ""
          } ${className}`}
        >
          {data.map((car) => (
            <CarItem key={car.id} car={car} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default CarRow;
