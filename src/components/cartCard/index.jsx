import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faTrash } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import axios from "axios";

export const CartCard = ({ course , removeFromCart }) => {
    console.log(course);
    
  return (
    <>
        <div className=" max-w-sm relative bg-white shadow-lg rounded-[5px] overflow-hidden border border-gray-200">
          <img
            src={course.courseId.thumbnail}
            alt={course.courseId.title}
            className="w-full h-[250px] object-cover"
          />
        
            <button className="absolute bottom-[20px] right-[20px] w-[40px] h-[40px] bg-red-400 text-white rounded-full hover:bg-red-600 cursor-pointer transition"
            onClick={() => removeFromCart(course.courseId._id)}>
                <FontAwesomeIcon icon={faTrash} />
            </button>
        
          <div className="p-4">
            <h3 className="text-lg font-semibold text-gray-900">{course.courseId.title}</h3>
            <p className="text-sm text-gray-600 mt-2">{course.courseId.description.split(" ").slice(0 , 15).join(" ")}</p>
            <div className="mt-4 flex justify-between items-center">
              <span className="text-primary font-bold">${course.courseId.price}</span>
            </div>
          </div>
        </div>
    </>
  );
};


