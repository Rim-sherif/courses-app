import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";

export default function CourseCard({course , stars , customWidth}) {
  return (
    <div
      className={`${customWidth == 4 ? 'lg:w-[24%]' : 'lg:w-[32.5%]'} relative w-[100%] sm:w-[48%] border-1 rounded border-gray-200 p-5 mb-3 text-center
    `}>
      <div className="absolute text-[#b98826] bg-[#fbf8ec] text-sm rounded font-semibold p-1 px-2 top-[30px] left-[30px]">
        {course?.access_type}
      </div>
      <div className="mb-3">
        <img src={course?.thumbnail} className="w-full h-50 mx-auto" alt="" />
      </div>

      <h2 className="text-xl font-semibold mb-1">
        {course?.title?.split(" ")?.slice(0, 2).join(" ")}
      </h2>

      <span className="block mt-[-10px]">
        {stars
          ? stars.map((star, index) => (
              <FontAwesomeIcon
                key={index}
                className="text-gray-400 me-[2px]"
                icon={faStar}
              />
            ))
          : ""}
      </span>

      <div className="flex mt-[5px] justify-between">
        <section className="text-[#d2a752] bg-[#fbf8ec] text-sm rounded font-semibold p-1">
          <strong>Ins.{course?.instructorId?.firstName}</strong>
        </section>

        <section className="text-[#d2a752] bg-[#fbf8ec] text-sm rounded font-semibold p-1">
          {course?.categoryId?.title?.split(" ").slice(0, 1).join(" ") ||
            "Data Scientist"}
        </section>
      </div>
      <Link to="/">
        <button className="bg-[#2A0B2C] cursor-pointer text-white block w-full py-2 rounded mt-3">
          Details
        </button>
      </Link>
    </div>
  );
}
