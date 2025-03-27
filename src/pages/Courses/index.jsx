/* eslint-disable no-unused-vars */
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(9);
  const [searchQuery, setSearchQuery] = useState("");
  const [totalPages, setTotalPages] = useState(1);
  const [sortQuery, setSortQuery] = useState("");

  const getAllCategories = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/v1/category/all`
      );
      setCategories(data?.courses);
      return data?.courses;
    } catch (error) {
      console.log(error);
    }
  };

  const {
    data: QCategories,
    isLoading: categoriesLoading,
    error: errorCategories,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: getAllCategories,
    staleTime: 1000 * 60 * 5,
  });

  useEffect(() => {
    getAllCategories();
  }, []);

  const getAllCourses = async () => {
    try {
      const searchParam = searchQuery ? `&search=${searchQuery}` : "";
      const sortParams = sortQuery ? `&sort=${sortQuery}` : "";
      const selectParams = `&select=title,price,rating,access_type,thumbnail,instructor,category`;
      const { data } = await axios.get(
        `${
          import.meta.env.VITE_BASE_URL
        }/api/v1/course/all?page=${currentPage}&size=${pageSize}${searchParam}${sortParams}${selectParams}`
      );
      setCourses(data?.courses);
      setOriginalUsers(data?.courses);
      setTotalPages(data?.totalPages || 6);
      return data?.courses;
    } catch (error) {
      setCustomError(error.message);
    }
  };

  const {
    data: Qcourses,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["courses"],
    queryFn: getAllCourses,
    staleTime: 1000 * 60 * 5,
  });

  useEffect(() => {
    getAllCourses();
    setOriginalUsers(courses);
  }, [currentPage, pageSize, searchQuery, sortQuery]);

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
    const value = e.target.value;
    setSearchQuery(value);
    setCurrentPage(1); // Reset to first page on new search
  };

  function handleSorting(e) {
    if (e.target.value == "Asc") {
      setSortQuery("title:asc");
      setCurrentPage(1);
      // const data = [...courses].sort((a, b) => a.title.localeCompare(b.title));
      // setCourses(data);
    } else {
      setSortQuery("title:desc");
      setCurrentPage(1);
      // const data = [...courses].sort((a, b) => b.title.localeCompare(a.title));
      // setCourses(data);
    }
  }

  const handleLimitSorting = (e) => {
    if (e.target.value == "all") {
      setPageSize(100);
    } else {
      setPageSize(+e.target.value);
    }
    setCurrentPage(1);
  };

  const getStars = (star) => {
    console.log(star);
    setSelectedStar(star);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  if (isLoading)
    return (
      <div
        style={{ zIndex: 1 }}
        className="flex justify-center items-center text-white font-bold  fixed inset-0 bg-[rgba(255,255,255,1)]"
      >
        <Loader />
      </div>
    );

  if (error) return <p>Error: {error.message}</p>;

  if (categoriesLoading)
    return (
      <div
        style={{ zIndex: 1 }}
        className="flex justify-center items-center text-white font-bold  fixed inset-0 bg-[rgba(255,255,255,1)]"
      >
        <Loader />
      </div>
    );

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
                <option value="9">9</option>
                <option value="12">12</option>
                <option value="21">21</option>
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
              <CourseCard
                course={course}
                customWidth={3}
                key={course._id}
                stars={stars}
              />
            ))
          ) : (
            <img src={noValueImg} className="w-[50%] mx-auto" alt="not found" />
          )}
        </div>

        {/* Add pagination controls */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-8">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-1 rounded bg-gray-200 disabled:opacity-50"
            >
              <FontAwesomeIcon icon={faChevronLeft} />
            </button>

            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index + 1}
                onClick={() => handlePageChange(index + 1)}
                className={`px-3 py-1 rounded ${
                  currentPage === index + 1
                    ? "bg-[#a5158c] text-white"
                    : "bg-gray-200"
                }`}
              >
                {index + 1}
              </button>
            ))}

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-3 py-1 rounded bg-gray-200 disabled:opacity-50"
            >
              <FontAwesomeIcon icon={faChevronRight} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
