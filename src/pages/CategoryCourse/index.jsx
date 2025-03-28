import React, { useState, useEffect } from "react";
import { useParams, Link, NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import Loader from "../../components/Loader";

const CategoryCourses = () => {
  const { categoryId } = useParams();
  const [courses, setCourses] = useState([]);
  const [categoryTitle, setCategoryTitle] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const coursesPerPage = 6;

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BASE_URL}/api/v1/course/all`
        );
        const data = await response.json();
        if (data.success) {
          const filteredCourses = data.courses.filter(
            (course) => course.category._id === categoryId
          );
          setCourses(filteredCourses);
          if (filteredCourses.length > 0) {
            setCategoryTitle(filteredCourses[0].category.title);
          }
        } else {
          setError("Failed to fetch courses");
        }
      } catch (err) {
        setError("Error fetching courses");
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [categoryId]);

  // Pagination
  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = courses.slice(indexOfFirstCourse, indexOfLastCourse);
  const totalPages = Math.ceil(courses.length / coursesPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading)
    return (
      <div className="flex justify-center items-center text-white font-bold fixed inset-0 bg-white z-50">
        <Loader />
      </div>
    );
  if (error) return <div className="text-center text-red-600">{error}</div>;

  if (courses.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 p-6">
        <div className="text-center bg-white p-8 rounded-lg shadow-md max-w-lg">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            No Courses Available
          </h2>
          <p className="text-gray-600">
            We currently don't have any courses in this category. Check back
            later or explore other
            <NavLink
              to="/categories"
              className="text-gray-700 font-bold hover:text-[#A5158C] px-4 py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Categories
            </NavLink>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="relative w-full h-64 md:h-80 py-20 bg-[#410445] relative overflow-hidden">
        <div className="absolute -top-32 -right-32 w-64 h-64 bg-[#A5158C]/20 rounded-full"></div>
        <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-[#A5158C]/20 rounded-full"></div>
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-bold text-white text-center px-4"
          >
            {categoryTitle} Courses
          </motion.h1>
        </div>
      </div>

      <div className="py-10 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentCourses.map((course) => (
            <Link
              to={`/course/${course._id}`}
              key={course._id}
              className="bg-white rounded-lg overflow-hidden shadow-lg transition-transform transform hover:-translate-y-1 hover:shadow-2xl hover:brightness-110"
            >
              <img
                src={course.thumbnail}
                alt={course.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {course.title}
                </h3>
                <p className="text-gray-600 mb-4">{course.description}</p>
                <div className="flex items-center gap-3 mb-4">
                  <img
                    src={course.instructor.avatar}
                    alt={`${course.instructor.firstName} ${course.instructor.lastName}`}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <span className="text-gray-800">
                    {course.instructor.firstName} {course.instructor.lastName}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-purple-700">
                    {course.access_type === "free"
                      ? "Free"
                      : `$${course.price}`}
                  </span>
                  <span className="text-sm text-gray-600 capitalize">
                    {course.access_type}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryCourses;
