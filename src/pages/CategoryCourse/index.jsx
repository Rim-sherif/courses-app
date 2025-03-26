import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const CategoryCourses = () => {
  const { categoryId } = useParams();
  const [courses, setCourses] = useState([]);
  const [categoryTitle, setCategoryTitle] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/v1/course/all`);
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
          setError('Failed to fetch courses');
        }
      } catch (err) {
        setError('Error fetching courses');
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [categoryId]);

  if (loading) return <div className="text-center text-gray-600">Loading...</div>;
  if (error) return <div className="text-center text-red-600">{error}</div>;

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-6">
      <h1 className="text-4xl font-bold text-center text-black mb-8">
        {categoryTitle} Courses
      </h1>
      {courses.length === 0 ? (
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="text-center bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              No Courses Available
            </h2>
            <p className="text-gray-600 max-w-md">
              We currently don't have any courses in this category. Check back later or explore other categories!
            </p>
          </div>
        </div>
      ) : (
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <Link
              to={`/course/${course._id}`}
              key={course._id}
              className="bg-white rounded-lg overflow-hidden shadow-lg transition-transform transform hover:-translate-y-1"
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
                    {course.access_type === 'free' ? 'Free' : `$${course.price}`}
                  </span>
                  <span className="text-sm text-gray-600 capitalize">
                    {course.access_type}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryCourses;