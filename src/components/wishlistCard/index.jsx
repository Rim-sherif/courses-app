import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBagShopping, faHeart, faTrash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { cartIncrement , cartDecrement } from "../../redux/reducers/cartCount";

export const WishlistCard = ({ course , removeFromWishlist }) => {
  const dispatch = useDispatch();
  const [cart , setCart] = useState(false);
  console.log(course);
  
  const addToCart = async(courseId)=>{
    try {
      const {data} = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/v1/course/cart/add/${courseId}` , {} , {withCredentials: true});
      setCart(true);
      dispatch(cartIncrement());
      // getCourseAddedCart(courseId);
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

  const getCourseAddedCart = async(courseId)=>{
    try {
      const {data} = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/v1/course/wishlist/getCourseAddedCart/${courseId}` , {withCredentials: true});
      console.log(data.data);
      
      setCart(data.data.isCartAdded);
      // dispatch(cartDecrement());
      // toast.success(data.message , { autoClose: 500 });
    } catch (error) {
      if(error?.response?.data?.message){
        toast.error(error?.response?.data?.message , { autoClose: 500 });
      }
      toast.error(error.message , { autoClose: 500 });
    }
  }
  


  return (
    <>
        <div className=" max-w-sm relative bg-white shadow-lg rounded-[5px] overflow-hidden border border-gray-200">
          <img
            src={course.courseId.thumbnail}
            alt={course.courseId.title}
            className="w-full h-[250px] object-cover"
          />
        
            <button className="absolute top-[10px] right-[10px] w-[40px] h-[40px] text-gray-100 text-xl rounded-full hover:bg-red-600 cursor-pointer transition"
            onClick={() => removeFromWishlist(course.courseId._id)}>
                <FontAwesomeIcon icon={faHeart} />
            </button>
        
          <div className="p-4">
            <h3 className="text-lg font-semibold text-gray-900">{course.courseId.title}</h3>
            <p className="text-sm text-gray-600 mt-2">{course.courseId.description.split(" ").slice(0 , 10).join(" ")}</p>
            <div className="mt-4 flex justify-between items-center">
              <span className="text-primary font-bold">${course.courseId.price}</span>
              {!cart ?
                  <button onClick={()=>addToCart(course.courseId._id)} className="bg-[#218838] px-4 py-2! cursor-pointer text-white rounded text-sm py-3">
                    <FontAwesomeIcon icon={faBagShopping} />
                  </button>
                  :
                  <button onClick={()=>removeFromCart(course.courseId._id)} className="bg-[#218838] px-4 py-0 cursor-pointer text-white rounded text-sm py-3">
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                }
            </div>
          </div>
        </div>
    </>
  );
};


