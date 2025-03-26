import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/v1/category/all`);
        const data = await response.json();
        if (data.success) {
          setCategories(data.courses || []); // Using data.courses as per the API response
        } else {
          setError('Failed to fetch categories');
        }
      } catch (err) {
        setError('Error fetching categories');
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) return <div className="text-center text-gray-600">Loading...</div>;
  if (error) return <div className="text-center text-red-600">{error}</div>;

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-6">
      <h1 className="text-4xl font-bold text-center text-black mb-4">
        Categories
      </h1>
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {categories.length === 0 ? (
          <div className="text-center text-gray-600 col-span-full">
            No categories available at the moment
          </div>
        ) : (
          categories.map((category) => (
            <Link
              to={`/category/${category._id}`}
              key={category._id}
              className="relative rounded-lg p-6 h-40 flex items-center justify-center text-center transition-transform transform hover:scale-105 overflow-hidden"
            >
              {/* Use an img tag for better error handling */}
              <img
                src={category.thumbnail}
                alt={`${category.title} thumbnail`}
                className="absolute inset-0 w-full h-full object-cover z-0"
                onError={(e) => {
                  // Fallback to a placeholder image if the thumbnail fails to load
                  e.target.src = 'https://via.placeholder.com/150?text=Image+Not+Found';
                }}
                loading="lazy" // Lazy load images for better performance
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-black/70 to-black/40 z-10" />
              {/* Category title */}
              <h3 className="relative text-white text-lg font-semibold capitalize z-20">
                {category.title}
              </h3>
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default Categories;