import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faTrash } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import axios from "axios";

export const CartCard = ({ course , removeFromCart }) => {
    
  return (
    <div className="flex items-center mb-3 bg-white rounded-md border border-gray-200 p-4 gap-5">
      <img
        src={course.courseId.thumbnail}
        alt={course.courseId.title}
        className="w-[120px] h-[80px] object-cover rounded-md"
      />

      <div className="flex-1">
        <h3 className="text-xl font-semibold mb-1! text-gray-900">{course.courseId.title}</h3>
        <p className="text-sm text-gray-600 font-semibold!">By {course.courseId.instructorId.firstName || "Unknown"} {course.courseId.instructorId.lastName}</p>
      </div>

      <span className="text-lg mr-5 font-bold text-primary">E£{course.courseId.price}</span>

      <button
        className="text-red-500 cursor-pointer hover:text-red-700 transition"
        onClick={() => removeFromCart(course.courseId._id)}>
        <FontAwesomeIcon icon={faTrash} size="lg" />
      </button>
  </div>

  );
};


