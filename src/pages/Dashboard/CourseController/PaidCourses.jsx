import React from "react";
import img5 from "../../../assets/images/3409297.jpg";
import img7 from "../../../assets/images/SL.123119.26540.04.jpg";
import img8 from "../../../assets/images/man-jumping-impossible-possible-cliff-sunset-background-business-concept-idea.jpg";
import img6 from "../../../assets/images/top-view-photography-accesories-with-copy-space.jpg";

const PaidCourses = () => {
  const paidCourses = [
    {
      id: 1,
      title: "Advanced Web Development",
      image: img5,
      price: 49.99,
      duration: "20h",
      level: "Advanced",
      students: 2345,
    },
    {
      id: 2,
      title: "Photography Masterclass",
      image: img6,
      price: 39.99,
      duration: "15h",
      level: "Intermediate",
      students: 1567,
    },
    {
      id: 3,
      title: "Digital Marketing",
      image: img7,
      price: 59.99,
      duration: "25h",
      level: "Beginner",
      students: 3421,
    },
    {
      id: 4,
      title: "Personal Development",
      image: img8,
      price: 29.99,
      duration: "12h",
      level: "All Levels",
      students: 892,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-3 ">
      <div className="min-h-screen mx-auto bg-white rounded-xl shadow-md overflow-hidden p-8">
        <h2 className="text-2xl font-semibold mb-4">Paid Courses</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {paidCourses.map((course) => (
            <div
              key={course.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <img
                src={course.image}
                alt={course.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {course.title}
                </h3>
                <div className="text-xl font-bold text-[#410445] mb-2">
                  ${course.price}
                </div>
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
                  {course.students.toLocaleString()} students
                </div>
                <button className="mt-4 w-full bg-[#410445] hover:bg-[#402841] text-white py-2 px-4 rounded-lg transition-colors">
                  Buy Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PaidCourses;
