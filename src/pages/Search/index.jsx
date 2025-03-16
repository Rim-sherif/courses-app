import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import noValue from "/no-value.png";

export default function Search() {
    const [search] = useSearchParams();
    const key = search.get("key");
    const searchVal = search.get("q");
    const [result,setResult] = useState([]);
    const [error , setError] = useState(false);
    const [loading , setLoading] = useState(false);
    const stars = [1,2,3,4,5];

    const getData = async ()=>{
        setLoading(true);
        const values = {
            collectionName: key,
            searchFilters: searchVal
        }

        try {
            const {data} = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/v1/course/search`,values);
            console.log(data);
            setResult(data?.data);
            setLoading(false);
        } catch (error) {
            console.log(error);
            setError(error);
            setLoading(false);
        }
    }

    useEffect(()=>{
        getData();
    },[key,searchVal])
    

  return (
    <div className="w-[94%] mx-auto my-10 flex items-start flex-wrap justify-between">

        {loading ? <div className='inset-0 fixed bg-[rgba(0,0,0,0.5)] flex text-white justify-center items-center text-2xl'>Loading...</div>:""}

        {error ? <div>{error}</div> : ""}

        {result.length > 0 ? (
          result.map((user) => (
            <div
              className="lg:w-[32.5%] w-[100%] sm:w-[48%] border-1 rounded border-gray-200 p-5 mb-3 text-center"
              key={user._id}
            >
              <div className="mb-3">
                <img
                  src={user.avatar}
                  className="w-50 h-50 mx-auto object-cover rounded-full"
                  alt=""
                />
              </div>

              <h2 className="text-xl font-semibold mb-1">
                {user.firstName} {user.lastName}
              </h2>

              <span>
                {stars
                  ? stars.map((star, index) => (
                      <FontAwesomeIcon
                        key={index}
                        className="text-yellow-300 me-[2px]"
                        icon={faStar}
                      />
                    ))
                  : ""}
              </span>

              <div className="flex mt-3 justify-between">
                <section className="text-[#d2a752] bg-[#fbf8ec] text-sm rounded font-semibold p-1">
                  {user?.category?.split(" ").slice(0,1).join(" ") || "Data Scientist"}
                </section>
                <section>
                  <strong>2</strong> Courses
                </section>
              </div>
              <Link to="/">
                <button className="bg-[#2A0B2C] cursor-pointer text-white block w-full py-2 rounded mt-3">Profile</button>
              </Link>
            </div>
          ))
        ) : (
          <div>
            <h2 className='text-2xl text-center'>No {key} yet for this search</h2>
            <img className='w-[30%] mx-auto' src={noValue} alt="" />
          </div>
        )}
      </div>
  )
}
