import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { WishlistCard } from '../../components/wishlistCard';
import noValueImg from "/no-value.png";
import Loader from '../../components/Loader';
import { cartDecrement } from '../../redux/reducers/cartCount';
import { useDispatch } from 'react-redux';
import { CartCard } from '../../components/cartCard';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CourseItem from '../../components/CourseItem';
import CourseCard from '../../components/courseCard/CourseCard';

export default function Cart() {
    const [error , setError] = useState("");
    const [isLoading , setIsLoading] = useState(false);
    const [courses , setCourses] = useState([]);
    const [total , setTotal] = useState(0);
    const dispatch = useDispatch();
    const [ coursesBasedCategory , setCoursesBasedCategory] = useState([]);
    const stars = [1, 2, 3, 4, 5];

    const getCartCourses = async () => {
        try {
        setIsLoading(true);
          const { data } = await axios.get(
            `${import.meta.env.VITE_BASE_URL}/api/v1/course/cart/allCourses`
          , {withCredentials: true});
          setCourses(data.data);
          setIsLoading(false);
          setError("");
        } catch (error) {
            if(error?.response?.data?.message){
                setError(error?.response?.data?.message);
            }
            setIsLoading(false);
            setCourses([]);
            setError(error.message);
            toast.error(error.message);
        }
    };

    useEffect(()=>{      
        getCartCourses();
    },[])
    useEffect(()=>{
       if(courses.length > 0){
          const totalPrice = courses.map(course =>{
            return course.courseId?.price;
          });
          console.log(totalPrice);
          setTotal(totalPrice.reduce((acc,initVal)=>acc+initVal));
          getCoursesBasedCategory()
        }
    },[courses])

    const getCoursesBasedCategory = async()=>{
      try {
        if(courses.length > 0){
          const { data } = await axios.get(
            `${import.meta.env.VITE_BASE_URL}/api/v1/course/cart/getCoursesBasedCategory?category=${courses[0].courseId.categoryId.title}&category=${courses[1].courseId.categoryId.title}`
          , {withCredentials: true});
          const shuffledData = data.data.sort(() => Math.random() - 0.5).slice(0, 4);
          setCoursesBasedCategory(shuffledData);
        }
        
        } catch (error) {
            if(error?.response?.data?.message){
                setError(error?.response?.data?.message);
            }
            toast.error(error.message);
        }
    }

  
    const removeFromWishlist = async(courseId)=>{
        try {
          const {data} = await axios.delete(`${import.meta.env.VITE_BASE_URL}/api/v1/course/cart/remove/${courseId}` , {withCredentials: true});
          toast.success(data.message , { autoClose: 500 });
          dispatch(cartDecrement());
          setCourses(prev=>{
            const items = prev.filter(item=>item.courseId._id != courseId)
            return items
          });
        } catch (error) {
          console.log(error);
          if(error?.response?.data?.message){
            toast.error(error?.response?.data?.message , { autoClose: 500 });
          }
          toast.error(error.message , { autoClose: 500 });
        }
    }

    if(isLoading){
        return <div style={{ zIndex: 1 }} className="flex justify-center items-center text-white font-bold  fixed inset-0 bg-[rgba(255,255,255,1)]">
          <Loader />
          </div>;
    }

  return (
    <div className='w-[85%] mx-auto'>
      <div className=' py-10 flex flex-wrap items-start justify-between'>
          
          <div className='lg:w-[70%] w-full mx-auto'>
            
            <div className=''>
              {error ? <h2>{error}</h2> : ""}
              {courses && courses?.length > 0 &&
               <>
                 <h2 className='text-4xl font-extrabold! text-[#303141]'>Shopping Cart</h2>
                 <h3 className='py-1 border-b-1 border-gray-200'>{courses?.length} Course in Cart</h3>
               </>
              }
            </div>
            <div>
              {courses && courses?.length > 0 ? 
                  <div className=''>
                      {courses.map((course)=><CartCard key={course._id} removeFromCart={removeFromWishlist} course={course}/>)}
                  </div>
              : <img className='w-[45%] mx-auto' src={noValueImg} alt="no courses founded" />}
            </div>
          </div>
          {courses && courses?.length > 0 &&
            <div className="lg:w-[25%] lg:sticky w-full top-25 border border-gray-200 p-4 rounded">
              <h2 className='font-semibold! text-[#303141]'>Total:</h2>
              <h2 className='text-4xl font-bold! text-[#303141]'>E£{total.toFixed(2)}</h2>
              <button className='font-semibold flex gap-2 items-center w-full justify-center bg-[#6D28D2] text-white py-3 px-4 rounded cursor-pointer text-sm'>
                <span>Proceed to checkout</span> <FontAwesomeIcon icon={faArrowRight} />
              </button>
              <p className='mt-2 text-gray-400 font-[500]! text-sm'>You won't be charged yet</p>
            </div>
          }

      </div>
      
      {courses && courses?.length > 0 &&
        <div>
            <h2 className='text-2xl mb-5 font-bold!'>You might also like</h2>
            <div>
              {coursesBasedCategory && coursesBasedCategory?.length > 0 ? 
                  <div className='flex flex-wrap my-10 gap-2'>
                      {coursesBasedCategory.map((course)=> 
                      <CourseCard course={course} customWidth={4} key={course._id} stars={stars}/>)}
                  </div>
              : <img className='w-[30%] mx-auto' src={noValueImg} alt="no courses founded" />}
            </div>
        </div>
      }

    </div>
  )
}
