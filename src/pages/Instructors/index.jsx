import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Instructors() {
  const [users, setUsers] = useState([]);
  const [selectedCategories , setSelectedCategories] = useState([]);
  const [originalUsers, setOriginalUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [categories, setCategories] = useState([
    { id: "1", category: "Business and Entrepreneurship" },
    { id: "2", category: "Health and Nutrition" },
    { id: "3", category: "Science & Environment" },
    { id: "4", category: "Education and Teaching" },
    { id: "5", category: "Personal Development" },
    { id: "6", category: "Technology" },
    { id: "7", category: "Humanities" },
    { id: "8", category: "Art, Design & Media" },
    { id: "9", category: "Career Readiness" },
    { id: "10", category: "Languages" },
  ]);
  const [filter , setFilter] = useState([]);
  const [close , setClose] = useState(false);

  const stars = [1, 2, 3, 4, 5];

  const getAllInstructors = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/v1/instructors`
      );
      setUsers(data?.data);
      setOriginalUsers(data?.data);
      setLoading(false);
      setError("");
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    getAllInstructors();
  }, []);
  
  const handleCategory = (item ,e)=>{
    let updatedCategories = [...selectedCategories];

    if(e.target.checked){
      updatedCategories.push(item);
    }else{
      updatedCategories = updatedCategories.filter(el=>el != item);
    }

    setSelectedCategories(updatedCategories);

    if(updatedCategories.length > 0){
      setUsers(originalUsers.filter(user=> updatedCategories.includes(user.category)))
    }else{
      setUsers(originalUsers)
    }

  }

  const closeFun = (e)=>{
    setClose(!close)
  }


  return (
    <div className="flex w-[90%] mx-auto justify-between">
      <div style={{transition: "1s" , zIndex: 222}} className={`w-[50%] z-30 md:w-[23%] px-10 py-10 md:px-3 fixed h-[100vh] md:left-0 md:static md:bg-[transparent] bg-white ${close ? 'left-[0%]' : 'left-[-50%]'}`}>
        
        <div onClick={closeFun} className="close block md:hidden absolute top-2 right-[-30px] bg-blue-300 py-1 px-3">
          {close ? "X" : "B"}
        </div>
       
        {/* <div style={{zIndex: 1}} className=" fixed inset-0 bg-[rgba(0,0,0,0.5)]"></div> */}

        {categories
          ? categories.map((item) => (
            <div key={item.id} className="flex items-center gap-3 mb-3">
            <input
              type="checkbox"
              onChange={(e)=>handleCategory(item.category , e)}
              id={`checkbox-${item.id}`}
              className="hidden peer border-gray-300"
            />
            <div className="w-5 h-5 border-2 border-gray-400 rounded-md flex items-center justify-center transition-all duration-300 peer-checked:bg-blue-500 peer-checked:border-blue-500">
              <svg
                className="w-4 h-4 text-white opacity-0 transition-all duration-200 peer-checked:opacity-100"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </div>
            <label
              htmlFor={`checkbox-${item.id}`}
              className="cursor-pointer text-gray-700 font-medium peer-checked:text-blue-600 transition-all duration-300"
            >
              {item.category}
            </label>
          </div>
          
            ))
          : ""}
      </div>

      <div className="w-[100%] lg:w-[75%] my-10 flex flex-wrap justify-between">
        {error ? <div>{error}</div> : ""}

        {users ? (
          users.map((user) => (
            <div
              className="lg:w-[32.5%] w-[100%] sm:w-[48%] border-1 rounded border-gray-200 p-5 mb-3 text-center"
              key={user._id}
            >
              <div className="mb-3">
                <img
                  src={user.avatar}
                  className="w-50 h-50 mx-auto object-cover rounded-full"
                  alt=""
                />
              </div>

              <h2 className="text-xl font-semibold mb-1">
                {user.firstName} {user.lastName}
              </h2>

              <span>
                {stars
                  ? stars.map((star, index) => (
                      <FontAwesomeIcon
                        key={index}
                        className="text-yellow-300 me-[2px]"
                        icon={faStar}
                      />
                    ))
                  : ""}
              </span>

              <div className="flex mt-3 justify-between">
                <section className="text-[#d2a752] bg-[#fbf8ec] text-sm rounded font-semibold p-1">
                  Data Scientist
                </section>
                <section>
                  <strong>2</strong> Courses
                </section>
              </div>
              <Link to="/">
                <button className="bg-[#0194FE] cursor-pointer text-white block w-full py-2 rounded mt-3">Profile</button>
              </Link>
            </div>
          ))
        ) : (
          <h1>No instructors yet</h1>
        )}
      </div>
    </div>
  );
}
