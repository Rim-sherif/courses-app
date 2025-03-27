import {
  faCalendar,
  faCalendarAlt,
  faCheck,
  faDesktop,
  faHeart,
  faMobile,
  faNewspaper,
  faPlay,
  faStar,
  faTrophy,
  faTv,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { faHeart as farHeart } from "@fortawesome/free-regular-svg-icons"; // Correct import

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { cartDecrement, cartIncrement} from "../../redux/reducers/cartCount";
import { decrement, increment} from "../../redux/reducers/wishlistCount";

export default function CourseDetails() {
  const { id } = useParams();
  const [course, setCourse] = useState({});
  const [wishlist , setWishlist] = useState(false);
  const [cart , setCart] = useState(false);
  const dispatch = useDispatch();
  const stars = [1, 2, 3, 4, 5];
  const whatLearn = [
    "Single responsibility principle",
    "Liskov substitution principle",
    "Inversion of control principle",
    "Dependency Injection design Pattern",
    "Open–closed principle",
    "Interface segregation principle",
    "Dependency inversion principle",
    "Control & Dependency flows",
  ];

  const getCourseDetails = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/v1/course/${id}`
      );
      setCourse(data.course);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const addToWishlist = async(courseId)=>{
    try {
      const {data} = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/v1/course/wishlist/add/${courseId}` , {} , {withCredentials: true});
      console.log(data);
      setWishlist(true);
      dispatch(increment());
      toast.success(data.message , { autoClose: 500 });
    } catch (error) {
      console.log(error);
      if(error?.response?.data?.message){
        toast.error(error?.response?.data?.message , { autoClose: 500 });
      }
      toast.error(error.message);
    }
  }

  const removeFromWishlist = async(courseId)=>{
    try {
      const {data} = await axios.delete(`${import.meta.env.VITE_BASE_URL}/api/v1/course/wishlist/remove/${courseId}` , {withCredentials: true});
      setWishlist(false);
      dispatch(decrement());
      toast.success(data.message , { autoClose: 500 });
    } catch (error) {
      if(error?.response?.data?.message){
        toast.error(error?.response?.data?.message , { autoClose: 500 });
      }
      toast.error(data.message , { autoClose: 500 });
    }
  }

  const getCourseById = async()=>{
    try {
      const {data} = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/v1/course/wishlist/getCourse/${id}` , {withCredentials: true});
      setWishlist(true);
    } catch (error) {
      
    }
  }

  const getCourseByIdCart = async()=>{
    try {
      const {data} = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/v1/course/cart/getCourse/${id}` , {withCredentials: true});
      setCart(true)
    } catch (error) {
      
    }
  }

  const addToCart = async(courseId)=>{
    try {
      const {data} = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/v1/course/cart/add/${courseId}` , {} , {withCredentials: true});
      console.log(data);
      setCart(true);
      dispatch(cartIncrement());
      toast.success(data.message , { autoClose: 500 });
    } catch (error) {
      console.log(error);
      if(error?.response?.data?.message){
        toast.error(error?.response?.data?.message , { autoClose: 500 });
      }
      toast.error(error.message);
    }
  }

  const removeFromCart = async(courseId)=>{
    try {
      const {data} = await axios.delete(`${import.meta.env.VITE_BASE_URL}/api/v1/course/cart/remove/${courseId}` , {withCredentials: true});
      setCart(false);
      dispatch(cartDecrement());
      toast.success(data.message , { autoClose: 500 });
    } catch (error) {
      if(error?.response?.data?.message){
        toast.error(error?.response?.data?.message , { autoClose: 500 });
      }
      toast.error(error.message , { autoClose: 500 });
    }
  }

  useEffect(() => {
    getCourseByIdCart();
    getCourseDetails();
    getCourseById();
  }, []);

  return (
    <div className="mb-20">
      {Object.keys(course).length > 0 && (
        <>
          <section className="bg-[#1D1E27] text-white">
            <div className="w-[80%] mx-auto py-8">
              <div className="w-[70%]">
                <section className="mb-2 text-[#C0C4FC] text-sm font-semibold">
                  {course.category.title}
                </section>
                <h1 className="text-4xl capitalize">{course.title}</h1>
                <p>{course.description.split(" ").slice(0, 15).join(" ")}</p>
                <div className="flex items-center gap-3">
                  <span className="bg-[#BBE7D3] px-1 py-[1px] rounded text-[12px] font-semibold text-[#3A614E]">
                    New
                  </span>

                  <div className="flex items-center">
                    <span className="mr-2 text-yellow-500 font-bold">4.9</span>
                    {stars
                      ? stars.map((star) => (
                          <FontAwesomeIcon
                            className={`mr-2 cursor-pointer text-yellow-500 text-sm`}
                            key={star}
                            icon={faStar}
                          />
                        ))
                      : ""}
                  </div>

                  <span className="text-sm">(49 Ratings)</span>
                  <span className="font-semibold text-sm">3,016 students</span>
                </div>

                <div className="mt-3 text-sm">
                  Created by{" "}
                  <Link className="underline text-[#C0C4FC]" to="">
                    {course.instructor.firstName} {course.instructor.lastName}
                  </Link>
                </div>

                <div className="mt-3 flex text-sm items-center">
                  <span>
                    <FontAwesomeIcon className="mr-2" icon={faCalendarAlt} />{" "}
                    Published at{" "}
                  </span>
                  <span className="text-[#5DC2B0] font-semibold ml-2">
                    3/2025
                  </span>
                </div>
              </div>
            </div>
          </section>

          <div className="w-[80%] mx-auto items-start flex justify-between mt-10">
            <div className="w-[68%]">
              <div className="border border-gray-300 p-6">
                <h2 className="font-bold text-2xl mb-4">What you'll learn</h2>
                <div className="flex justify-between flex-wrap text-sm">
                  {whatLearn &&
                    whatLearn.map((item, index) => (
                      <div
                        className="w-[50%] flex items-center gap-4 mb-2"
                        key={index}
                      >
                        <FontAwesomeIcon
                          className="text-gray-400"
                          icon={faCheck}
                        />{" "}
                        <span>{item}</span>
                      </div>
                    ))}
                </div>
              </div>

              <div className="mt-5 border border-gray-300 p-6">
                <h2 className="font-bold text-2xl mb-4">Course content</h2>
              </div>

              <div className="mt-5 p-6">
                <h2 className="font-bold text-2xl mb-4">Requirements</h2>
                <li>
                  الإلمام بلغة برمجة واحدة على الأقل، مثل Dart أو Java أو C# أو
                  Python
                </li>
                <li>
                  مفاهيم الOOP، بما في ذلك الObjects و الClasses و الوراثة
                  Inheritance و ال Polymorphism و ال Abstraction
                </li>
              </div>

              <div className="p-6">
                <h2 className="font-bold text-2xl mb-4">Description</h2>
                <p dir="auto">{course.description}</p>
              </div>

              <div className="p-6">
                <h2 className="font-bold text-2xl mb-4">Instructor</h2>
                <Link
                  className="font-extrabold text-medium underline text-[#6D28D2]"
                  to={`/instructors/${course.instructor._id}`}
                >
                  {course.instructor.firstName} {course.instructor.lastName}
                </Link>

                <section className="text-gray-500 mt-1 text-sm font-semibold">
                  Software Engineer - Flutter Developer
                </section>

                <div className="flex mt-4 gap-4 items-center">
                  <div>
                    <img
                      className="w-[100px] h-[100px] object-cover rounded-full"
                      src={course.instructor.avatar}
                      alt=""
                    />
                  </div>
                  <div>
                    <li className="list-none">
                      <FontAwesomeIcon
                        className={`mr-2 cursor-pointer text-yellow-500 text-sm`}
                        icon={faStar}
                      />
                      <span>4.9 Instructor Rating</span>
                    </li>
                    <li className="list-none">
                      <FontAwesomeIcon
                        className={`mr-2 cursor-pointer text-gray-500 text-sm`}
                        icon={faTrophy}
                      />
                      <span>49 Reviews</span>
                    </li>
                    <li className="list-none">
                      <FontAwesomeIcon
                        className={`mr-2 cursor-pointer text-gray-500 text-sm`}
                        icon={faUsers}
                      />
                      <span>3,016 Students</span>
                    </li>
                    <li className="list-none">
                      <FontAwesomeIcon
                        className={`mr-3 cursor-pointer text-gray-500 text-sm`}
                        icon={faPlay}
                      />
                      <span>1 Course</span>
                    </li>
                  </div>
                </div>

                <article className="text-gray-500">
                  <section className="mb-2 mt-5">
                    I'm a Flutter Developer with a passion for building
                    scalable, high-performance mobile applications. I hold a
                    degree in Communication and Electronics Engineering from
                    Alexandria University (Class of 2023). My expertise spans
                    Flutter, Dart, Firebase, C, C++, MySQL, SQLite, and MS SQL
                    Server.
                  </section>
                  <section>
                    I also run a YouTube channel, where I share in-depth
                    tutorials on Flutter development, helping developers enhance
                    their skills and build amazing apps. In addition, I focus on
                    best software engineering practices, such as SOLID
                    principles, to ensure clean and maintainable code.
                  </section>
                </article>

                <section className="mt-10 border border-gray-500 p-5 text-center">
Reviews 
               </section>

              </div>
            </div>

            <div className="w-[30%] sticky top-25 bg-white border border-gray-300 p-5">
              <div className="mb-3">
                <img src={course.thumbnail} alt="" />
              </div>

              <h2 className="text-2xl font-extrabold mb-3">E£{course.price}</h2>

              <div className="flex justify-between">
                
                {!cart ?
                  <button onClick={()=>addToCart(course._id)} className="bg-[#6D28D2] w-[80%] cursor-pointer font-semibold text-white block rounded text-sm py-3">
                    Add To Cart
                  </button>
                  :
                  <button onClick={()=>removeFromCart(course._id)} className="bg-[#6D28D2] w-[80%] cursor-pointer font-semibold text-white block rounded text-sm py-3">
                    Remove From Cart
                  </button>
                }

                {!wishlist ?
                  <button onClick={()=>addToWishlist(course._id)} className="cursor-pointer w-[17%] border-[#6D28D2] text-[#6D28D2] border rounded text-xl py-2">
                    <FontAwesomeIcon icon={farHeart} />
                  </button>
                  :
                  <button onClick={()=>removeFromWishlist(course._id)} className="cursor-pointer w-[17%] border-[#6D28D2] text-[#6D28D2] border rounded text-xl py-2">
                    <FontAwesomeIcon icon={faHeart} />
                  </button>
              }
              </div>
              <section className="text-center text-sm my-3 text-gray-500 font-semibold">
                30-Day Money-Back Guarantee
              </section>

              <div className="">
                <h2 className="text-lg font-bold">This course includes:</h2>
                <li className="list-none mb-2">
                  <FontAwesomeIcon className="mr-2" icon={faDesktop} />{" "}
                  <span>4.5 hours on-demand video</span>
                </li>
                <li className="list-none mb-2">
                  <FontAwesomeIcon className="mr-2" icon={faNewspaper} /> 1
                  article
                </li>
                <li className="list-none mb-2">
                  <FontAwesomeIcon className="mr-2" icon={faMobile} /> Access on
                  mobile and TV
                </li>
                <li className="list-none mb-2">
                  <FontAwesomeIcon className="mr-2" icon={faNewspaper} /> Full
                  lifetime access
                </li>
                <li className="list-none mb-2">
                  <FontAwesomeIcon className="mr-2" icon={faTrophy} />{" "}
                  Certificate of completion
                </li>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
