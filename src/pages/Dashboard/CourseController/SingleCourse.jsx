import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const SingleCourse = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { course, type } = state;
  const [isEditing, setIsEditing] = useState(false);
  const [editedCourse, setEditedCourse] = useState(course);

  const handleUpdate = () => {
    // Here you would typically make an API call to update the course
    setIsEditing(false);
  };

  const handleDelete = () => {
    // Here you would typically make an API call to delete the course
    if (window.confirm('Are you sure you want to delete this course?')) {
      navigate(-1);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden p-6">
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={() => navigate(-1)}
            className="text-[#410445] hover:text-[#402841]"
          >
            ← Back
          </button>
          <div className="space-x-4">
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="bg-[#410445] text-white px-4 py-2 rounded-lg hover:bg-[#402841]"
            >
              {isEditing ? 'Cancel' : 'Edit'}
            </button>
            <button
              onClick={handleDelete}
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
            >
              Delete
            </button>
          </div>
        </div>

        <img
          src={course.image}
          alt={course.title}
          className="w-full h-64 object-cover rounded-lg mb-6"
        />

        {isEditing ? (
          <div className="space-y-4">
            <input
              type="text"
              value={editedCourse.title}
              onChange={(e) => setEditedCourse({...editedCourse, title: e.target.value})}
              className="w-full p-2 border rounded-lg"
            />
            {type === 'paid' && (
              <input
                type="number"
                value={editedCourse.price}
                onChange={(e) => setEditedCourse({...editedCourse, price: e.target.value})}
                className="w-full p-2 border rounded-lg"
              />
            )}
            <div className="flex gap-4">
              <input
                type="text"
                value={editedCourse.duration}
                onChange={(e) => setEditedCourse({...editedCourse, duration: e.target.value})}
                className="flex-1 p-2 border rounded-lg"
              />
              <select
                value={editedCourse.level}
                onChange={(e) => setEditedCourse({...editedCourse, level: e.target.value})}
                className="flex-1 p-2 border rounded-lg"
              >
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>
            <button
              onClick={handleUpdate}
              className="w-full bg-[#410445] text-white py-2 rounded-lg hover:bg-[#402841]"
            >
              Save Changes
            </button>
          </div>
        ) : (
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-4">{course.title}</h1>
            {type === 'paid' && (
              <p className="text-2xl text-[#410445] font-bold mb-4">${course.price}</p>
            )}
            <div className="grid grid-cols-2 gap-4 text-gray-600">
              <div>
                <i className="fas fa-clock mr-2"></i>
                Duration: {course.duration}
              </div>
              <div>
                <i className="fas fa-signal mr-2"></i>
                Level: {course.level}
              </div>
              <div>
                <i className="fas fa-users mr-2"></i>
                Students: {course.students.toLocaleString()}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SingleCourse;
