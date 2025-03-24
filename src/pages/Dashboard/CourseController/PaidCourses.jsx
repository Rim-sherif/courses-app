// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import img5 from "../../../assets/images/3409297.jpg";
// import img7 from "../../../assets/images/SL.123119.26540.04.jpg";
// import img8 from "../../../assets/images/man-jumping-impossible-possible-cliff-sunset-background-business-concept-idea.jpg";
// import img6 from "../../../assets/images/top-view-photography-accesories-with-copy-space.jpg";

// const PaidCourses = () => {
//   const navigate = useNavigate();
//   const paidCourses = [
//     {
//       id: 1,
//       title: "Advanced Web Development",
//       image: img5,
//       price: 49.99,
//       duration: "20h",
//       level: "Advanced",
//       students: 2345,
//     },
//     {
//       id: 2,
//       title: "Photography Masterclass",
//       image: img6,
//       price: 39.99,
//       duration: "15h",
//       level: "Intermediate",
//       students: 1567,
//     },
//     {
//       id: 3,
//       title: "Digital Marketing",
//       image: img7,
//       price: 59.99,
//       duration: "25h",
//       level: "Beginner",
//       students: 3421,
//     },
//     {
//       id: 4,
//       title: "Personal Development",
//       image: img8,
//       price: 29.99,
//       duration: "12h",
//       level: "All Levels",
//       students: 892,
//     },
//   ];

//   const [searchQuery, setSearchQuery] = useState("");
//   const [levelFilter, setLevelFilter] = useState("All");
//   const [priceFilter, setPriceFilter] = useState("All");

//   const getPriceRange = (price) => {
//     if (price < 30) return "0-30";
//     if (price < 50) return "30-50";
//     return "50+";
//   };

//   const filteredCourses = paidCourses.filter((course) => {
//     const matchesSearch = course.title
//       .toLowerCase()
//       .includes(searchQuery.toLowerCase());
//     const matchesLevel =
//       levelFilter === "All" || course.level === levelFilter;
//     const matchesPrice =
//       priceFilter === "All" || getPriceRange(course.price) === priceFilter;
//     return matchesSearch && matchesLevel && matchesPrice;
//   });

//   return (
//     <div className="min-h-screen bg-gray-50 py-8 px-3">
//       <div className="min-h-screen mx-auto bg-white rounded-xl shadow-md overflow-hidden p-6">
       
//       <div className="flex justify-between">
//         <div>
//         <h2 className="text-2xl font-bold text-[#410445] md:mb-0">Paid Courses</h2>
//         </div>
//         <div className="mb-6 flex flex-col md:flex-row gap-4">
//         <input
//             type="text"
//             placeholder="Search courses..."
//             className="p-2 border rounded-lg flex-1"
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//           />
//           <select
//             className="p-2 border rounded-lg w-full md:w-28"
//             value={levelFilter}
//             onChange={(e) => setLevelFilter(e.target.value)}
//           >
//             <option value="All">All Levels</option>
//             <option value="Beginner">Beginner</option>
//             <option value="Intermediate">Intermediate</option>
//             <option value="Advanced">Advanced</option>
//           </select>

//     <select
//       className="p-2 border rounded-lg w-full md:w-28 "
//       value={priceFilter}
//       onChange={(e) => setPriceFilter(e.target.value)}
//     >
//       <option value="All" className="text-[#410445]">All Prices</option>
//       <option value="0-30" className="text-[#410445]">$0-$30</option>
//       <option value="30-50" className="text-[#410445]">$30-$50</option>
//       <option value="50+" className="text-[#410445]">$50+</option>
//     </select>
//   </div>
//       </div>
        


  
 


//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//           {filteredCourses.map((course) => (
//             <div
//               key={course.id}
//               className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
//             >
//               <img
//                 src={course.image}
//                 alt={course.title}
//                 className="w-full h-48 object-cover"
//               />
//               <div className="p-4">
//                 <h3 className="text-lg font-semibold text-gray-800 mb-2">
//                   {course.title}
//                 </h3>
//                 <div className="text-xl font-bold text-[#410445] mb-2">
//                   ${course.price}
//                 </div>
//                 <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
//                   <span className="flex items-center">
//                     <i className="fas fa-clock mr-2"></i>
//                     {course.duration}
//                   </span>
//                   <span className="flex items-center">
//                     <i className="fas fa-signal mr-2"></i>
//                     {course.level}
//                   </span>
//                 </div>
//                 <div className="flex items-center text-sm text-gray-600">
//                   <i className="fas fa-users mr-2"></i>
//                   {course.students.toLocaleString()} students
//                 </div>
//                 <button 
//                   onClick={() => navigate(`/dashboard/courses/${course.id}`, { state: { course, type: 'paid' } })}
//                   className="mt-4 w-full bg-[#410445] hover:bg-[#402841] text-white py-2 px-4 rounded-lg transition-colors"
//                 >
//                   View
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PaidCourses;


import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import img3 from "../../../assets/images/business-people-blue-background.jpg";
import img1 from "../../../assets/images/html-css-collage-concept.jpg";
import img2 from "../../../assets/images/uiux.jpg";
import img4 from "../../../assets/images/usman-yousaf-6pmG8XIKE2w-unsplash.jpg";
import { toast } from "react-toastify";
import axios from "axios";
import CourseCard from "../../../components/courseCard/CourseCard";
import CourseItem from "../../../components/CourseItem";

const FreeCourses = () => {
  const navigate = useNavigate();
  // const freeCourses = [
  //   {
  //     id: 1,
  //     title: "HTML & CSS Basics",
  //     image: img1,
  //     duration: "6h",
  //     level: "Beginner",
  //     students: 1234,
  //   },
  //   {
  //     id: 2,
  //     title: "UI/UX Design",
  //     image: img2,
  //     duration: "8h",
  //     level: "Intermediate",
  //     students: 890,
  //   },
  //   {
  //     id: 3,
  //     title: "Business Management",
  //     image: img3,
  //     duration: "10h",
  //     level: "Advanced",
  //     students: 756,
  //   },
  //   {
  //     id: 4,
  //     title: "Medical Sciences",
  //     image: img4,
  //     duration: "12h",
  //     level: "Intermediate",
  //     students: 543,
  //   },
  // ];
  const [freeCourses , setFreeCourses] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [levelFilter, setLevelFilter] = useState("All");



  const getFreeCourses = async ()=>{
    try {
      const id = window.localStorage.getItem("instructor_id");
      const {data} = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/v1/user/${id}`);
      const coursesFree = data?.instructor?.courses.filter(course=>course.access_type == "paid");
      console.log(coursesFree);
      
      setFreeCourses(coursesFree);
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(()=>{
    getFreeCourses()
  } , [])

  const filteredCourses = freeCourses.filter((course) => {
    const matchesSearch = course.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesLevel =
      levelFilter === "All" || course.level === levelFilter;
    return matchesSearch && matchesLevel;
  });

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-3">
      <div className="min-h-screen mx-auto bg-white rounded-xl shadow-md overflow-hidden p-6">
        <div className="flex justify-between">
        <div>
        <h2 className="text-2xl font-semibold mb-4">Paid Courses</h2>
        </div>
        <div className="mb-6 flex flex-col md:flex-row gap-4">
          <input
            type="text"
            placeholder="Search courses..."
            className="p-2 border rounded-lg flex-1"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <select
            className="p-2 border rounded-lg w-full md:w-48"
            value={levelFilter}
            onChange={(e) => setLevelFilter(e.target.value)}
          >
            <option value="All">All Levels</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>
        </div>
        </div>

        <div className="flex flex-wrap justify-between">
          {freeCourses.length > 0 && freeCourses.map(course=><CourseItem key={course._id} course={course} />)}
          {/* {filteredCourses.map((course) => (
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
                <button 
                  onClick={() => navigate(`/dashboard/courses/${course.id}`, { state: { course, type: 'free' } })}
                  className="mt-4 w-full bg-[#410445] hover:bg-[#402841] text-white py-2 px-4 rounded-lg transition-colors"
                >
                  View
                </button>
              </div>
            </div>
          ))} */}
        </div>
      </div>
    </div>
  );
};

export default FreeCourses;
