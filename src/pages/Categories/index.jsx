import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Loader from "../../components/Loader";
import { motion } from "framer-motion";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BASE_URL}/api/v1/category/all`
        );
        const data = await response.json();
        if (data.success) {
          setCategories(data.courses || []);
        } else {
          setError("Failed to fetch categories");
        }
      } catch (err) {
        setError("Error fetching categories");
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <Loader className="text-purple-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="text-center text-red-600 font-semibold text-lg bg-white p-6 rounded-lg shadow-lg">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-[#5a124e] to-[#3b0e34] py-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background Circles */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute w-40 h-40 bg-purple-400/30 rounded-full blur-3xl top-10 left-16 animate-pulse"></div>
        <div className="absolute w-52 h-52 bg-purple-300/25 rounded-full blur-3xl bottom-10 right-20 animate-pulse"></div>
        <div className="absolute w-32 h-32 bg-purple-500/20 rounded-full blur-3xl top-1/2 left-1/3 animate-pulse"></div>
      </div>
      <div className="absolute -top-32 -right-32 w-64 h-64 bg-[#A5158C]/20 rounded-full"></div>
      <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-[#A5158C]/20 rounded-full"></div>

      {/* Explore Categories Heading */}
      <div className="text-center relative mb-12">
        <h1 className="text-4xl font-extrabold text-gray-100 relative inline-block">
          Explore Categories
          <span className="block w-16 h-1 bg-yellow-400 rounded-full mx-auto mt-2 transition-all duration-300 group-hover:w-24"></span>
        </h1>
      </div>

      {/* Categories Grid */}
      <div className="relative max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {categories.length === 0 ? (
          <div className="col-span-full text-center text-gray-500 font-medium text-lg bg-white p-8 rounded-lg shadow-md">
            <p>No categories available at the moment</p>
          </div>
        ) : (
          categories.map((category) => (
            <motion.div
              key={category._id}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <Link
                to={`/category/${category._id}`}
                className="relative group rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl"
              >
                {/* Category Image */}
                <img
                  src={category.thumbnail}
                  alt={category.title}
                  className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                  onError={(e) => {
                    e.target.src =
                      "https://via.placeholder.com/150?text=Image+Not+Found";
                  }}
                  loading="lazy"
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-70 transition-opacity duration-300 group-hover:opacity-90" />
                {/* Category Title */}
                <div className="absolute inset-0 flex flex-col justify-end items-start p-6 z-10">
                  <h3 className="text-white text-2xl font-extrabold capitalize drop-shadow-lg transition-colors duration-300 group-hover:text-yellow-400">
                    {category.title}
                  </h3>
                </div>
              </Link>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};

export default Categories;
