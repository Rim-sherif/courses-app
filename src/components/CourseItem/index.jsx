import React from 'react'

export default function CourseItem({course}) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
        <img src={course.thumbnail}
        alt={course.title}
        className="w-full h-48 object-cover" />
        <div className="p-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
                {course.title}
            </h3>
            <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                <span className="flex items-center">
                <i className="fas fa-clock mr-2"></i>
                {course.duration}
                </span>
                <span className="flex items-center">
                <i className="fas fa-signal mr-2"></i>
                {course.level}
                </span>
            </div>
            <div className="flex items-center text-sm text-gray-600">
                <i className="fas fa-users mr-2"></i>
                {course.students?.toLocaleString()} students
            </div>
            <button 
                onClick={() => navigate(`/dashboard/courses/${course._id}`, { state: { course, type: 'free' } })}
                className="mt-4 w-full bg-[#410445] hover:bg-[#402841] text-white py-2 px-4 rounded-lg transition-colors">
                View
            </button>
        </div>
    </div>
  )
}
