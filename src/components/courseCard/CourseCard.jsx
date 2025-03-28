/* eslint-disable no-unused-vars */
import { faStar, faHeart, faClock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";

export default function CourseCard({ course, rating, customWidth }) {
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    return (
      <div className="flex gap-0.5">
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
      } group relative w-full sm:w-[48%] bg-white rounded-2xl p-4 mb-4 
      transition-all duration-300 hover:shadow-lg hover:-translate-y-2 border border-gray-100/70
      shadow-sm`}
    >
      {/* Image Container */}
      <div className="relative mb-6 overflow-hidden rounded-xl aspect-video">
        {/* Favorite Button */}
        <button className="absolute z-20 top-3 right-3  transition-colors duration-200">
          <FontAwesomeIcon 
            icon={faHeart} 
            className="text-gray-400 hover:text-red-400 text-lg" 
          />
        </button>
        <span className="absolute z-20 top-3 left-3 bg-gray-100 text-[#410445] text-xs font-medium px-2 py-1 rounded-lg">
            {course?.access_type}
          </span>

        {/* Duration Badge */}
        <div className="absolute z-20 bottom-3 left-3 px-3 py-1.5 bg-black/80 text-white 
          text-xs font-medium rounded-lg backdrop-blur-sm">
          <FontAwesomeIcon icon={faClock} className="me-2" />
          {course?.duration || "9 h"}
        </div>

        {/* Image with Gradient Overlay */}
        <div className="relative overflow-hidden">
          <img 
            src={course?.url} 
            className="w-full h-full object-cover transition-transform duration-500 
              group-hover:scale-105" 
            alt={course?.title} 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent 
            opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      </div>

      {/* Course Info */}
      <div className="px-1">
        {/* Category and Access Type */}
        <div className="flex justify-between items-start mb-3">
          <span className="px-2.5 py-1 bg-purple-50 text-purple-700 text-xs font-medium 
            rounded-md">
            {course?.category?.title?.split(" ")[0] || "Data Science"}
          </span>
       
        </div>

        {/* Title and Price */}
        <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 leading-snug min-h-[55px]">
          {course?.title}
        </h3>
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-[#410445]">
              ${course?.price}
            </span>
            {course.originalPrice && (
              <span className="text-gray-400 line-through text-sm">
                ${course.originalPrice}
              </span>
            )}
          </div>
          <div className="flex items-center gap-1 text-sm text-gray-500 font-medium">
            <FontAwesomeIcon icon={faStar} className="text-amber-500" />
            <span>{rating}</span>
            <span className="text-gray-400">({course.enrollments})</span>
          </div>
        </div>

        {/* Instructor and Action Button */}
        <div className="border-t border-gray-100 pt-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <img 
                src={course?.instructor?.avatar} 
                className="w-8 h-8 rounded-full object-cover" 
                alt="Instructor" 
              />
              <span className="text-sm text-gray-600 font-medium">
                {course?.instructor?.firstName} {course?.instructor?.lastName}
              </span>
            </div>
          </div>
          
          <Link 
            to={`/course/${course._id}`} 
            className="block w-full bg-[#410445]  hover:bg-[#372138]
              text-white text-center text-sm font-semibold py-3 rounded-xl transition-all 
              duration-300 hover:shadow-purple-200 hover:shadow-lg"
          >
            Explore Course
          </Link>
        </div>
      </div>
    </div>
  );
}
