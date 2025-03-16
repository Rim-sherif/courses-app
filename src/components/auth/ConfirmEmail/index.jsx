import axios from "axios";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";

const ConfirmEmail = () => {
    const {token} = useParams();
    
    const getData = async()=>{
        try {
            
            const {data} = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/v1/confirm/email/${token}`)
            console.log(data);

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(()=>{
        getData()
    } , [])

    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
        <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md text-center">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Confirm Your Email</h2>
          <p className="text-gray-600 mb-6">
            We've sent a confirmation email to your inbox. Please check your email and click the link to verify your account.
          </p>
          <div className="flex flex-col gap-3">
            <Link to="/login">
                <button className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium transition-all hover:bg-blue-700">
                Login
                </button>
            </Link>
            <p className="text-sm text-gray-500">
              Didn't receive an email? <span className="text-blue-600 cursor-pointer hover:underline">Check your spam folder</span>.
            </p>
          </div>
        </div>
      </div>
    );
  };
  
  export default ConfirmEmail;
  