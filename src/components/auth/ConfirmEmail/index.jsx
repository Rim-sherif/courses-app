import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const ConfirmEmail = () => {
    const {token} = useParams();
    const [status , setStatus] = useState(false);
    
    const getData = async()=>{
        try {
            
            const {data} = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/v1/auth/confirm/email/${token}`)
            setStatus(true);
            toast.success(data?.message);
        } catch (error) {
          setStatus(false);
          console.log(error);
        }
    }

    useEffect(()=>{
        getData()
    } , [])

    const handleResend = async ()=>{
      try {
        const {data} = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/v1/auth/resend/confirm/email/${token}`)
        setStatus(true);
        console.log(data);
        
        toast.success(data?.message);
      } catch (error) {
        setStatus(false);
        console.log(error);
      }
    }

    return (
      
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
        <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md text-center">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Confirm Your Email</h2>
          <p className="text-gray-600 mb-6 font-semibold">
            {status ? "your Email is confirmed successfully, Now you can login" : "We've sent a confirmation email to your inbox. Please check your email and click the link to verify your account."}
          </p>
          <div className="flex flex-col gap-3">
            {status ?
            <Link to="/login">
                <button className="bg-blue-600 cursor-pointer w-full text-white px-6 py-2 rounded-lg font-medium transition-all hover:bg-blue-700">
                Login
                </button>
            </Link>
            : <button onClick={handleResend} className="bg-blue-600 cursor-pointer text-white px-6 py-2 rounded-lg font-medium transition-all hover:bg-blue-700">Resend</button>}
          </div>
        </div>
      </div>
    );
  };
  
  export default ConfirmEmail;
  