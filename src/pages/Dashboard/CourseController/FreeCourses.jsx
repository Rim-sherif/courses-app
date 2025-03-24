import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import CourseItem from "../../../components/CourseItem";

const FreeCourses = () => {
  const navigate = useNavigate();
  const [freeCourses , setFreeCourses] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [levelFilter, setLevelFilter] = useState("All");



  const getFreeCourses = async ()=>{
    try {
      const id = window.localStorage.getItem("instructor_id");
      const {data} = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/v1/user/${id}`);
      const coursesFree = data?.instructor?.courses.filter(course=>course.access_type == "free");
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
        <h2 className="text-2xl font-semibold mb-4">Free Courses</h2>
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

        <div className="grid gap-4  
            grid-cols-1  
            sm:grid-cols-2  
            md:grid-cols-3  
            lg:grid-cols-3  
            xl:grid-cols-4">
          {freeCourses.length > 0 && freeCourses.map(course=><CourseItem key={course._id} course={course} />)}
        </div>
      </div>
    </div>
  );
};

export default FreeCourses;
