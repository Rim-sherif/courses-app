import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";

export default function InstructorCard({user , stars , customWidth}) {
  return (
    <div
      className={`${customWidth == 4 ? 'lg:w-[24%]' : 'lg:w-[32.5%]'} w-[100%] sm:w-[48%] border-1 rounded border-gray-200 p-5 text-center`}>

      <div className="mb-3">
        <img
          src={user?.avatar}
          className="w-50 h-50 mx-auto object-cover rounded-full"
          alt=""
        />
      </div>

      <h2 className="text-xl font-semibold mb-1">
        {user?.firstName} {user?.lastName}
      </h2>

      <span className="block mt-[-10px]">
        {stars
          ? stars.map((star, index) => (
              <FontAwesomeIcon
                key={index}
                className={`${
                  user?.courses?.length > 0 ? "text-yellow-300" : "text-gray-400"
                }  me-[2px]`}
                icon={faStar}
              />
            ))
          : ""}
      </span>

      <div className="flex mt-3 justify-between">
        <section className="text-[#d2a752] bg-[#fbf8ec] text-sm rounded font-semibold p-1">
          {user?.jobTitle?.split(" ").slice(0, 1).join(" ") || "Data Scientist"}
        </section>
        <section>
          <strong>{user?.courses?.length}</strong> Courses
        </section>
      </div>
      <Link to={`/instructors/${user._id}`}>
        <button className="bg-[#2A0B2C] cursor-pointer text-white block w-full py-2 rounded mt-3">
          Profile
        </button>
      </Link>
    </div>
  );
}
