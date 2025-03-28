/* eslint-disable no-unused-vars */
import {
  faChevronLeft,
  faChevronRight,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useEffect, useState } from "react";
import CourseCard from "../../components/courseCard/CourseCard";
import Loader from "../../components/Loader";
import Sidemenu from "./sidemenu";
import noValueImg from "/no-value.png";
import { useDispatch } from "react-redux";
import { decrement, increment } from "../../redux/reducers/wishlistCount";
import { toast } from "react-toastify";

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
  const [pageSize, setPageSize] = useState(6);
  const [searchQuery, setSearchQuery] = useState("");
  const [totalPages, setTotalPages] = useState(1);
  const [sortQuery, setSortQuery] = useState("");
  const [wishlist , setWishlist] = useState({});
  const dispatch = useDispatch();

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

  const addToWishlist = async(id)=>{ 
    try {
      const {data} = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/v1/course/wishlist/add/${id}` , {} , {withCredentials: true});
      setWishlist((prev) => ({ ...prev, [id]: true }));
      console.log(wishlist);
      dispatch(increment());
      toast.success(data.message , { autoClose: 500 });
    } catch (error) {
      console.log(error);
      if(error?.response?.data?.message){
        toast.error(error?.response?.data?.message , { autoClose: 500 });
      }
      toast.error(error.message);
    }
  }

  const removeFromWishlist = async(courseId)=>{
    try {
      const {data} = await axios.delete(`${import.meta.env.VITE_BASE_URL}/api/v1/course/wishlist/remove/${courseId}` , {withCredentials: true});
      setWishlist((prev) => {
        const updatedWishlist = { ...prev };
        delete updatedWishlist[courseId]; 
        return updatedWishlist;
      });
      dispatch(decrement());
      toast.success(data.message , { autoClose: 500 });
    } catch (error) {
      if(error?.response?.data?.message){
        toast.error(error?.response?.data?.message , { autoClose: 500 });
      }
      toast.error(data.message , { autoClose: 500 });
    }
  }

  const wishlistCheckCourse = async(id)=>{
      try {
        const {data} = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/v1/course/wishlist/wishlistCheckCourse/${id}` , {withCredentials: true});
        console.log(data.data);
        setWishlist((prev) => ({
          ...prev,
          [data.data._id]: true
        }));
        } catch (error) {
        console.log(error);
      }
  }

    const wishlistTest = async(id)=>{
      try {
        const {data} = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/v1/course/wishlist/allCourses` , {withCredentials: true});
        console.log(data.ids);
        if(data.ids.includes(id)){
          setWishlist((prev) => ({
            ...prev,
            [id]: true
          }));
        }
        } catch (error) {
        console.log(error);
      }
  }


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

        {courses?.length > 0 && (
          <div className="flex flex-wrap gap-4 justify-end mb-6">
            {/* Items Per Page Selector */}
            <div className="relative w-[200px]">
              {/* <label className="block text-sm font-medium text-gray-600 mb-1.5">
        Show items:
      </label> */}
              <div className="relative">
                <select
                  onChange={handleLimitSorting}
                  className="w-full pl-4 pr-8 py-2.5 rounded-xl border border-gray-200 
            bg-white focus:border-purple-500 focus:ring-2 focus:ring-purple-100 
            text-gray-700 transition-all duration-200 appearance-none
            hover:border-gray-300 cursor-pointer"
                  defaultValue="6"
                >
                  <option value="3">3 per page</option>
                  <option value="6">6 per page</option>
                  <option value="9">9 per page</option>
                  <option value="12">12 per page</option>
                  <option value="21">21 per page</option>
                </select>
                <FontAwesomeIcon
                  icon={faChevronDown}
                  className="absolute right-3 top-3.5 text-gray-400 text-sm pointer-events-none"
                />
              </div>
            </div>

            {/* Sorting Selector */}
            <div className="relative w-[200px]">
              {/* <label className="block text-sm font-medium text-gray-600 mb-1.5">
        Sort by:
      </label> */}
              <div className="relative">
                <select
                  onChange={handleSorting}
                  className="w-full pl-4 pr-8 py-2.5 rounded-xl border border-gray-200 
            bg-white focus:border-purple-500 focus:ring-2 focus:ring-purple-100 
            text-gray-700 transition-all duration-200 appearance-none
            hover:border-gray-300 cursor-pointer"
                  defaultValue="Order"
                >
                  <option value="Order" disabled className="text-gray-400">
                    Select order
                  </option>
                  <option value="Asc" className="hover:bg-purple-50">
                    A-Z (Ascending)
                  </option>
                  <option value="Dsc" className="hover:bg-purple-50">
                    Z-A (Descending)
                  </option>
                </select>
                <FontAwesomeIcon
                  icon={faChevronDown}
                  className="absolute right-3 top-3.5 text-gray-400 text-sm pointer-events-none"
                />
              </div>
            </div>
          </div>
        )}

        <div className="flex items-start flex-wrap gap-[1.2%]">
          {courses ? (
            courses.map((course) => (
              <CourseCard
                course={course}
                customWidth={3}
                key={course._id}
                stars={stars}
                wishlist={wishlist}
                addToWishlist={addToWishlist}
                removeFromWishlist={removeFromWishlist}
                wishlistCheckCourse={wishlistCheckCourse}
                wishlistTest={wishlistTest}
              />
            ))
          ) : (
            <img src={noValueImg} className="w-[50%] mx-auto" alt="not found" />
          )}
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-1.5 mt-12 mb-6">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`p-2 w-10 h-10 rounded-lg border border-gray-200 hover:border-[#410445] transition-all duration-200 ${
                currentPage === 1
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-[#410445]"
              }`}
            >
              <FontAwesomeIcon
                icon={faChevronLeft}
                className={`text-sm ${
                  currentPage === 1 ? "text-gray-400" : "text-[#ffffff]"
                }`}
              />
            </button>

            {/* Visible Page Numbers */}
            {(() => {
              const maxVisiblePages = 5;
              const halfVisible = Math.floor(maxVisiblePages / 2);
              let startPage = Math.max(currentPage - halfVisible, 1);
              const endPage = Math.min(
                startPage + maxVisiblePages - 1,
                totalPages
              );

              if (endPage - startPage + 1 < maxVisiblePages) {
                startPage = Math.max(endPage - maxVisiblePages + 1, 1);
              }

              return Array.from(
                { length: endPage - startPage + 1 },
                (_, i) => startPage + i
              ).map((page) => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`w-10 h-10 rounded-lg flex items-center justify-center text-sm font-medium transition-all duration-200 ${
                    currentPage === page
                      ? "bg-[#410445]  text-white shadow-md shadow-purple-200"
                      : "text-gray-600 hover:bg-[#410445] hover:text-white border border-gray-200"
                  }`}
                >
                  {page}
                </button>
              ));
            })()}

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`p-2 w-10 h-10 rounded-lg border border-gray-200 hover:border-purple-500 transition-all duration-200 ${
                currentPage === totalPages
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-purple-50"
              }`}
            >
              <FontAwesomeIcon
                icon={faChevronRight}
                className={`text-sm ${
                  currentPage === totalPages
                    ? "text-gray-400"
                    : "text-[#410445]"
                }`}
              />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
