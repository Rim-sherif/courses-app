/* eslint-disable no-unused-vars */
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useEffect, useState } from "react";
import CourseCard from "../../components/courseCard/CourseCard";
import Loader from "../../components/Loader";
import Sidemenu from "./sidemenu";
import noValueImg from "/no-value.png";

export default function Instructors() {
  const [courses, setCourses] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [originalUsers, setOriginalUsers] = useState([]);
  const [customError, setCustomError] = useState("");
  const [categories, setCategories] = useState([]);
  // const [filter, setFilter] = useState([]);
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
    queryKey: ["categories"], 
    queryFn: getAllCategories, 
    staleTime: 1000 * 60 * 5, 
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
    queryKey: ["courses"],  
    queryFn: getAllCourses,   
    staleTime: 1000 * 60 * 5, 
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
      <Sidemenu 
        categories={categories} 
        originalUsers={originalUsers}
        onSearch={handleSearchValue}
        onCategoryChange={handleCategory}
        onStarChange={getStars}
      />

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
