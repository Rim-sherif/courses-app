import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faClose, faStar } from "@fortawesome/free-solid-svg-icons";
import noValueImg from "/no-value.png";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loader from "../../components/Loader";
import { useQuery } from "@tanstack/react-query";
import CourseCard from "../../components/courseCard/CourseCard";

export default function Instructors() {
  const [courses, setCourses] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [originalUsers, setOriginalUsers] = useState([]);
  const [customError, setCustomError] = useState("");
  const [categories, setCategories] = useState([]);
  const [filter, setFilter] = useState([]);
  const [close, setClose] = useState(false);
  const [selectedStar, setSelectedStar] = useState(0);
  const stars = [1, 2, 3, 4, 5];

  
  const getAllCategories = async()=>{
    try {
      const {data} = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/v1/category/all`);
      setCategories(data?.courses);
      return data?.courses;
    } catch (error) {
      console.log(error);
    }
  }

  const { data: QCategories, isLoading:categoriesLoading, error:errorCategories } = useQuery({
    queryKey: ["categories"],  // Unique key for caching
    queryFn: getAllCategories,   // Fetch function
    staleTime: 1000 * 60 * 5, // Cache data for 5 minutes
  });
  
  useEffect(()=>{
    getAllCategories();
  } , []);

  
  const getAllCourses = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/v1/course/all`);
      setCourses(data?.courses);
      setOriginalUsers(data?.courses);
      return data?.courses
    } catch (error) {
      setCustomError(error.message);
    }
  };

  const { data: Qcourses, isLoading, error } = useQuery({
    queryKey: ["courses"],  // Unique key for caching
    queryFn: getAllCourses,   // Fetch function
    staleTime: 1000 * 60 * 5, // Cache data for 5 minutes
  });

  console.log(Qcourses);


  useEffect(() => {
    getAllCourses();
    setOriginalUsers(courses);
  }, []);

  const handleCategory = (item, e) => {
    let updatedCategories = [...selectedCategories];
    console.log(item);
    
    if (e.target.checked) {
      updatedCategories.push(item);
    } else {
      updatedCategories = updatedCategories.filter((el) => el != item);
    }

    setSelectedCategories(updatedCategories);

    if (updatedCategories.length > 0) {
      console.log(updatedCategories);
      console.log(originalUsers);
      
      setCourses(
        originalUsers.filter((course) =>
          updatedCategories.includes(course.category?.title)
        )
      );
    } else {
      setCourses(originalUsers);
    }
  };

  const closeFun = (e) => {
    setClose(!close);
  };

  const handleSearchValue = (e) => {
    if (e.target.value.length > 0) {
      const searchFilteration = courses.filter((item) =>
        item.title.toLowerCase().startsWith(e.target.value.toLowerCase())
      );
      if (searchFilteration.length > 0) {
        setCustomError("");
        setCourses(searchFilteration);
      } else {
        setCustomError("There are no instructors with this Name");
        setCourses([]);
      }
    } else {
      setCourses(originalUsers);
      setCustomError("");
    }
  };

  function handleSorting(e) {
    if (e.target.value == "Asc") {
      const data = [...courses].sort((a, b) => a.title.localeCompare(b.title));
      setCourses(data);
    } else {
      const data = [...courses].sort((a, b) => b.title.localeCompare(a.title));
      setCourses(data);
    }
  }

  const handleLimitSorting = (e) => {
    if (e.target.value == "all") {
      setCourses(originalUsers);
    } else {
      const results = [...originalUsers];
      const data = results.slice(0, +e.target.value);
      setCourses(data);
    }
  };

  const getStars = (star) => {
    console.log(star);
    setSelectedStar(star);
  };

  if (isLoading) return <div style={{ zIndex: 1 }} className="flex justify-center items-center text-white font-bold  fixed inset-0 bg-[rgba(255,255,255,1)]">
  <Loader />
  </div>;

  if (error) return <p>Error: {error.message}</p>;

  if (categoriesLoading) return <div style={{ zIndex: 1 }} className="flex justify-center items-center text-white font-bold  fixed inset-0 bg-[rgba(255,255,255,1)]">
  <Loader />
  </div>;

  if (errorCategories) return <p>Error: {errorCategories.message}</p>;

  return (
    <div className="flex w-[90%] mx-auto justify-between">
      <div
        style={{ transition: "1s", zIndex: 222 }}
        className={`w-[50%] z-30 md:w-[23%] px-10 py-10 md:px-3 fixed mt-1 h-[100vh] md:left-0 md:static md:bg-[transparent] bg-white ${
          close ? "left-[0%]" : "left-[-50%]"
        }`}
      >
        <div
          onClick={closeFun}
          className="close block md:hidden absolute top-2 right-[-30px] bg-blue-300 py-1 px-2"
        >
          {close ? (
            <FontAwesomeIcon icon={faClose} />
          ) : (
            <FontAwesomeIcon icon={faBars} />
          )}
        </div>

        {/* filter by instructor Name */}
        <div className="mb-4 relative">
          <label
            htmlFor=""
            className="absolute bg-white text-[13px] left-4 top-[-13px] text-gray-400 font-semibold p-1"
          >
            Search Course
          </label>
          <input
            type="text"
            onChange={handleSearchValue}
            className="border-2 w-full outline-0 px-3 py-3 text-[13px] rounded border-gray-300"
          />
        </div>

        <h2 className="text-xl">Filter By Catgeories</h2>

        {categories
          ? categories.map((item) => (
              <div key={item._id} className="flex items-center gap-3 mb-3">
                <label
                  htmlFor={`checkbox-${item._id}`}
                  className="flex items-center gap-3 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    onChange={(e) => handleCategory(item.title, e)}
                    id={`checkbox-${item._id}`}
                    className="hidden peer"
                  />
                  <div className="w-5 h-5 border-2 border-gray-400 rounded-md flex items-center justify-center transition-all duration-300 peer-checked:bg-[#a5158c] peer-checked:border-[#a5158c]">
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
                  <span className="text-gray-700 font-medium peer-checked:text-[#a5158c] peer-checked:font-bold transition-all duration-300">
                    {item.title}
                  </span>
                </label>
              </div>
            ))
          : ""}

        <div className="mt-5">
          <h2>Filter By Rating</h2>
          <div>
            {stars
              ? stars.map((star) => (
                  <FontAwesomeIcon
                    onClick={() => getStars(star)}
                    className={`mr-1 cursor-pointer ${
                      star <= selectedStar ? "text-yellow-500" : "text-gray-400"
                    } text-xl`}
                    key={star}
                    icon={faStar}
                  />
                ))
              : ""}
          </div>
        </div>
      </div>

      <div className="w-[100%] lg:w-[75%] my-10 ">
        {customError ? (
          <img className="w-[50%] mx-auto" src={noValueImg} alt="not found" />
        ) : (
          ""
        )}

        {courses?.length > 0 ? (
          <div className="flex gap-5 justify-end">
            <div className="text-right mb-4">
              <span>show: </span>
              <select
                defaultValue="limit"
                onChange={handleLimitSorting}
                className="w-[150px] cursor-pointer outline-0 rounded border-1 py-2 px-1 border-gray-300"
              >
                <option value="all">All</option>
                <option value="3">3</option>
                <option value="6">6</option>
                <option value="8">8</option>
                <option value="25">25</option>
                <option value="50">50</option>
                <option value="75">75</option>
                <option value="100">100</option>
              </select>
            </div>

            <div className="text-right mb-4">
              <select
                name=""
                defaultValue="Order"
                onChange={handleSorting}
                className="w-[150px] cursor-pointer outline-0 rounded border-1 py-2 px-1 border-gray-300"
              >
                <option value="Order" disabled>
                  Order
                </option>
                <option value="Asc">Sort A-Z</option>
                <option value="Dsc">Sort Z-A</option>
              </select>
            </div>
          </div>
        ) : (
          ""
        )}

        <div className="flex items-start flex-wrap gap-[1.2%]">
          {courses ? (
            courses.map((course) => (
              <CourseCard course={course} customWidth={3} key={course._id} stars={stars} />
            ))

          ) : (
            <img src={noValueImg} className="w-[50%] mx-auto" alt="not found" />
          )}
        </div>
      </div>
    </div>
  );
}
