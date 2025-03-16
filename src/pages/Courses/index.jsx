import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faClose, faStar } from "@fortawesome/free-solid-svg-icons";
import noValueImg from "/no-value.png";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Instructors() {
  const [courses, setCourses] = useState([]);
  const [selectedCategories , setSelectedCategories] = useState([]);
  const [originalUsers, setOriginalUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [categories, setCategories] = useState([
    { id: "1", category: "Business and Entrepreneurship" },
    { id: "2", category: "Health and Nutrition" },
    { id: "3", category: "Science & Environment" },
    { id: "4", category: "Education and Teaching" },
    { id: "5", category: "Personal Development" },
    { id: "6", category: "Technology" },
    { id: "7", category: "Humanities" },
    { id: "8", category: "Art, Design & Media" },
    { id: "9", category: "Career Readiness" },
    { id: "10", category: "Languages" },
  ]);
  const [filter , setFilter] = useState([]);
  const [close , setClose] = useState(false);
  const [selectedStar , setSelectedStar] = useState(0);
  const stars = [1, 2, 3, 4, 5];

  const getAllCourses = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/v1/course/all`
      );
      setCourses(data?.courses);
      setOriginalUsers(data?.courses);
      setLoading(false);
      setError("");
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    getAllCourses();
    setOriginalUsers(courses);
  }, []);
  
  const handleCategory = (item ,e)=>{
    let updatedCategories = [...selectedCategories];

    if(e.target.checked){
      updatedCategories.push(item);
    }else{
      updatedCategories = updatedCategories.filter(el=>el != item);
    }

    setSelectedCategories(updatedCategories);

    if(updatedCategories.length > 0){
      setCourses(originalUsers.filter(user=> updatedCategories.includes(user.category)))
    }else{
      setCourses(originalUsers)
    }

  }

  const closeFun = (e)=>{
    setClose(!close)
  }

  
  const handleSearchValue = (e)=>{
    
    if(e.target.value.length > 0){
      const searchFilteration = users.filter(item=>item.firstName.toLowerCase().startsWith(e.target.value.toLowerCase()))
      if(searchFilteration.length > 0){
        setError("")
        setCourses(searchFilteration);     
      }else{
        setError("There are no instructors with this Name")
        setCourses([]);
      }
      
    }else{
      setCourses(originalUsers);
      setError("")
    }
  }

  function handleSorting(e){
    if(e.target.value == "Asc"){
      const data = [...courses].sort((a,b)=>a.title.localeCompare(b.title))
      setCourses(data)
    }else{
      const data = [...courses].sort((a,b)=>b.title.localeCompare(a.title))
      setCourses(data)
    }
  }

  const handleLimitSorting = (e)=>{
    if(e.target.value == "all"){
      setCourses(originalUsers)
    }else{
      const results = [...originalUsers];
      const data = results.slice(0,+e.target.value);
      setCourses(data);
    }
  }

  const getStars = (star)=>{
    console.log(star);
    setSelectedStar(star);

  }

  return (
    <div className="flex w-[90%] mx-auto justify-between">
      <div style={{transition: "1s" , zIndex: 222}} className={`w-[50%] z-30 md:w-[23%] px-10 py-10 md:px-3 fixed mt-1 h-[100vh] md:left-0 md:static md:bg-[transparent] bg-white ${close ? 'left-[0%]' : 'left-[-50%]'}`}>
        
        <div onClick={closeFun} className="close block md:hidden absolute top-2 right-[-30px] bg-blue-300 py-1 px-2">
          {close ? <FontAwesomeIcon icon={faClose} /> : <FontAwesomeIcon icon={faBars} />}
        </div>
       
       {loading ?
        <div style={{zIndex: 1}} className="flex justify-center items-center text-white font-bold  fixed inset-0 bg-[rgba(0,0,0,0.5)]">Loading...</div>
        :""}
        {/* filter by instructor Name */}
        <div className="mb-4 relative">
          <label htmlFor="" className="absolute bg-white text-[13px] left-4 top-[-13px] text-gray-400 font-semibold p-1">Search Instructor</label>
          <input type="text" onChange={handleSearchValue} className="border-2 w-full outline-0 px-3 py-3 text-[13px] rounded border-gray-300" />   
        </div>

        <h2 className="text-xl">Filter By Catgeories</h2>
        
        {categories
          ? categories.map((item) => (
            <div key={item.id} className="flex items-center gap-3 mb-3">
            <input
              type="checkbox"
              onChange={(e)=>handleCategory(item.category , e)}
              id={`checkbox-${item.id}`}
              className="hidden peer border-gray-300"
            />
            <div className="w-5 h-5 border-2 border-gray-400 rounded-md flex items-center justify-center transition-all duration-300 peer-checked:bg-[#2A0B2C] peer-checked:border-[#2A0B2C]">
              <svg
                className="w-4 h-4 text-white opacity-0 transition-all duration-200 peer-checked:opacity-100"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </div>
            <label
              htmlFor={`checkbox-${item.id}`}
              className="cursor-pointer text-gray-700 font-medium peer-checked:text-blue-600 transition-all duration-300"
            >
              {item.category}
            </label>
          </div>
          
            ))
          : ""}

          <div className="mt-5">
            <h2>Filter By Rating</h2>
            <div>
              {stars ? stars.map(star=><FontAwesomeIcon onClick={()=>getStars(star)} className={`mr-1 cursor-pointer ${star <= selectedStar ? 'text-yellow-500' : 'text-gray-400'} text-xl`} key={star} icon={faStar} />):""}
            </div>
          </div>

      </div>

      <div className="w-[100%] lg:w-[75%] my-10 ">
        {error ?
          <img className="w-[50%] mx-auto" src={noValueImg} alt="not found"/>
          : ""}

        {courses?.length > 0 ?
        <div className="flex gap-5 justify-end">
          <div className="text-right mb-4">
            <span>show: </span>
            <select defaultValue="limit" onChange={handleLimitSorting} className="w-[150px] cursor-pointer outline-0 rounded border-1 py-2 px-1 border-gray-300">
              <option value="all">All</option>
              <option value="3">3</option>
              <option value="6">6</option>
              <option value="8">8</option>
              <option value="25">25</option>
              <option value="50">50</option>
              <option value="75">75</option>
              <option value="100">100</option>
            </select>
          </div>
        
          <div className="text-right mb-4">
            <select name="" defaultValue="Order" onChange={handleSorting} className="w-[150px] cursor-pointer outline-0 rounded border-1 py-2 px-1 border-gray-300">
              <option value="Order" disabled>Order</option>
              <option value="Asc">Sort A-Z</option>
              <option value="Dsc">Sort Z-A</option>
            </select>
          </div>
        </div>
        :""}

        <div className="flex items-start flex-wrap justify-between">
          {courses ? (
            courses.map((course) => (
              <div
                className="lg:w-[32.5%] w-[100%] sm:w-[48%] border-1 rounded border-gray-200 p-5 mb-3 text-center"
                key={course._id}
              >
                <div className="mb-3">
                  <img
                    src={course.thumbnail}
                    className="w-full h-50 mx-auto"
                    alt=""
                  />
                </div>
          
                <h2 className="text-xl font-semibold mb-1">
                  {course.title.split(" ").slice(0,2).join(" ")}
                </h2>
          
                {/* <span className="block mt-[-10px]">
                  {stars
                    ? stars.map((star, index) => (
                        <FontAwesomeIcon
                          key={index}
                          className={`${user?.courses.length > 0 ? 'text-yellow-300' : "text-gray-400"}  me-[2px]`}
                          icon={faStar}
                        />
                      ))
                    : ""}
                </span> */}
          
                <div className="flex mt-3 justify-between">
                  <section className="text-[#d2a752] bg-[#fbf8ec] text-sm rounded font-semibold p-1">
                    {/* {user?.category?.split(" ").slice(0,1).join(" ") || "Data Scientist"} */}
                  </section>
                  <section>
                    {/* <strong>{course?.courses.length}</strong> Courses */}
                  </section>
                </div>
                <Link to="/">
                  <button className="bg-[#2A0B2C] cursor-pointer text-white block w-full py-2 rounded mt-3">Details</button>
                </Link>
              </div>
            ))
          ) : (
            <img src={noValueImg} className="w-[50%] mx-auto" alt="not found"/>
          )}
        </div>
      </div>
    </div>
  );
}
