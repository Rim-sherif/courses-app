import { faStar, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";

export default function InstructorCard({ user, rating, customWidth }) {
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    return (
      <div className="flex gap-0.5 justify-center">
        {[...Array(5)].map((_, index) => (
          <FontAwesomeIcon
            key={index}
            className={`text-base ${
              index < fullStars
                ? "text-amber-500"
                : hasHalfStar && index === fullStars
                ? "text-amber-500"
                : "text-gray-200"
            }`}
            icon={faStar}
          />
        ))}
      </div>
    );
  };

  return (
    <div
      className={`${
        customWidth === 4 ? "lg:w-[24%]" : "lg:w-[32%]"
      } group relative w-full sm:w-[48%] bg-white rounded-2xl p-5 
      transition-all duration-300 hover:shadow-lg hover:-translate-y-2 
      border border-gray-100/70 shadow-sm`}
    >
      {/* Follow Button */}
      <button className="absolute top-4 right-4 z-20 hover:bg-[#410445] transition-colors duration-200">
        <FontAwesomeIcon 
          icon={faUserPlus} 
          className="text-gray-500 hover:text-purple-600 text-lg" 
        />
      </button>

      {/* Instructor Avatar */}
      <div className="relative mb-6">
        <div className="relative w-32 h-32 mx-auto overflow-hidden rounded-full 
          ring-4 ring-purple-50 ring-offset-2 transition-transform duration-300 
          group-hover:scale-105">
          <img
            src={user?.avatar}
            className="w-full h-full object-cover"
            alt={`${user?.firstName} ${user?.lastName}`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-purple-600/20 to-transparent 
            opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      </div>

      {/* Instructor Info */}
      <div className="px-1">
        {/* Name and Rating */}
        <h3 className="text-2xl font-bold text-gray-900 mb-2 text-center">
          {user?.firstName} {user?.lastName}
        </h3>
        <div className="flex items-center justify-center gap-1 mb-4">
          {renderStars(rating || 0)}
          <span className="text-sm text-gray-500 font-medium">
            ({rating?.toFixed(1)})
          </span>
        </div>

        {/* Job Title and Courses */}
        <div className="flex justify-between items-center mb-6">
          <span className="px-3 py-1.5 bg-purple-50 text-[#410445] text-sm font-medium 
            rounded-lg">
            {user?.jobTitle?.split(" ")[0] || "Data Scientist"}
          </span>
          <div className="text-sm text-gray-600 font-medium">
            <span className="text-[#410445] font-bold">{user?.courses?.length}</span> Courses
          </div>
        </div>

        {/* Profile Button */}
        <Link 
          to={`/instructors/${user._id}`}
          className="block w-full bg-[#410445]  hover:bg-[#372138]
            text-white text-center text-sm font-semibold py-3 rounded-xl transition-all 
            duration-300 hover:shadow-purple-200 hover:shadow-lg"
        >
          View Profile
        </Link>
      </div>
    </div>
  );
}
