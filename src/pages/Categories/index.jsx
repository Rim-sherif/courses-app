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
    <div className="min-h-screen bg-gradient-to-b from-[#3e005c] to-[#6a0572] py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold text-center text-white mb-8">
        Explore Categories
      </h1>
      {/* Adjusted container for a cleaner grid layout */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {categories.length === 0 ? (
          <div className="col-span-full text-center text-gray-500 font-medium text-lg bg-white p-8 rounded-lg shadow-md">
            <p>No categories available at the moment</p>
          </div>
        ) : (
          categories.map((category) => (
            <Link
              to={`/category/${category._id}`}
              key={category._id}
              className="relative group rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-2xl"
            >
              {/* Category Image */}
              <img
                src={category.thumbnail}
                alt={category.title}
                className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
                onError={(e) => {
                  e.target.src =
                    "https://via.placeholder.com/150?text=Image+Not+Found";
                }}
                loading="lazy"
              />
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black to-white opacity-50 transition-opacity duration-300 group-hover:opacity-70" />
              {/* Category Title */}
              <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-4 z-10">
                <h3 className="text-white text-2xl font-extrabold capitalize drop-shadow-lg transition-colors duration-300 group-hover:text-gray-900">
                  {category.title}
                </h3>
              </div>
              {/* Badge */}
              <div className="absolute top-3 right-3 bg-white text-purple-600 text-xs font-semibold px-3 py-1 rounded-full shadow-md">
                {category.tag || "New"}
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default Categories;
