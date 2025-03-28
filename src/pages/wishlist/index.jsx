import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { WishlistCard } from '../../components/wishlistCard';
import noValueImg from "/no-value.png";
import Loader from '../../components/Loader';
import { decrement } from '../../redux/reducers/wishlistCount';
import { useDispatch } from 'react-redux';

export default function Wishlist() {
    const [error , setError] = useState("");
    const [isLoading , setIsLoading] = useState(false);
    const [courses , setCourses] = useState([]);
    const dispatch = useDispatch();
    
    const getwishlistCourses = async () => {
        try {
        setIsLoading(true);
          const { data } = await axios.get(
            `${import.meta.env.VITE_BASE_URL}/api/v1/course/wishlist/allCourses`
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
        getwishlistCourses();
    },[])

    const removeFromWishlist = async(courseId)=>{
        try {
          const {data} = await axios.delete(`${import.meta.env.VITE_BASE_URL}/api/v1/course/wishlist/remove/${courseId}` , {withCredentials: true});
          toast.success(data.message , { autoClose: 500 });
          dispatch(decrement());
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
    <>
        {error ? <h2>{error}</h2> : ""}
        <h2 className='text-4xl text-center mt-10'>My Wishlist</h2>
        <div>
            {courses && courses?.length > 0 ? 
                <div className='grid w-[90%] mx-auto my-10 gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
                    {courses.map((course)=><WishlistCard key={course._id} removeFromWishlist={removeFromWishlist} course={course}/>)}
                </div>
            : <img className='w-[30%] mx-auto' src={noValueImg} alt="no courses founded" />}
        </div>
    </>
  )
}
