/* eslint-disable no-unused-vars */
import { faBars, faClose, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from 'react';

const Sidemenu = ({categories, originalUsers, onSearch, onCategoryChange, onStarChange}) => {
   

    
      const [close, setClose] = useState(false);
      const [selectedStar, setSelectedStar] = useState(0);
      const stars = [1, 2, 3, 4, 5];

    const closeFun = () => {
        setClose(!close);
      };
    
      const handleSearchValue = (e) => {
        onSearch(e);
      };


      const handleCategory = (item, e) => {
        onCategoryChange(item, e);
      };

      
  const getStars = (star) => {
    setSelectedStar(star);
    onStarChange(star);
  };


    return (
          <div
                style={{ transition: "1s", zIndex: 222 }}
                className={`w-[50%] z-30 md:w-[23%] px-10 py-10 md:px-3 fixed mt-1 h-[100vh] md:left-0 md:static md:bg-[transparent] bg-white ${
                  close ? "left-[0%]" : "left-[-50%]"
                }`}
              >
                <div
                  onClick={closeFun}
                  className="close block md:hidden absolute top-2 right-[-30px] bg-blue-300 py-1 px-2"
                >
                  {close ? (
                    <FontAwesomeIcon icon={faClose} />
                  ) : (
                    <FontAwesomeIcon icon={faBars} />
                  )}
                </div>
        
                {/* filter by instructor Name */}
                <div className="mb-4 relative">
                  <label
                    htmlFor=""
                    className="absolute bg-white text-[13px] left-4 top-[-13px] text-gray-400 font-semibold p-1"
                  >
                    Search Course
                  </label>
                  <input
                    type="text"
                    onChange={handleSearchValue}
                    className="border-2 w-full outline-0 px-3 py-3 text-[13px] rounded border-gray-300"
                  />
                </div>
        
                <h2 className="text-xl">Filter By Catgeories</h2>
        
                {categories
                  ? categories.map((item) => (
                      <div key={item._id} className="flex items-center gap-3 mb-3">
                        <label
                          htmlFor={`checkbox-${item._id}`}
                          className="flex items-center gap-3 cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            onChange={(e) => handleCategory(item.title, e)}
                            id={`checkbox-${item._id}`}
                            className="hidden peer"
                          />
                          <div className="w-5 h-5 border-2 border-gray-400 rounded-md flex items-center justify-center transition-all duration-300 peer-checked:bg-[#a5158c] peer-checked:border-[#a5158c]">
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
                          <span className="text-gray-700 font-medium peer-checked:text-[#a5158c] peer-checked:font-bold transition-all duration-300">
                            {item.title}
                          </span>
                        </label>
                      </div>
                    ))
                  : ""}  
        
                <div className="mt-5">
                  <h2>Filter By Rating</h2>
                  <div>
                    {stars
                      ? stars.map((star) => (
                          <FontAwesomeIcon
                            onClick={() => getStars(star)}
                            className={`mr-1 cursor-pointer ${
                              star <= selectedStar ? "text-yellow-500" : "text-gray-400"
                            } text-xl`}
                            key={star}
                            icon={faStar}
                          />
                        ))
                      : ""}
                  </div>
                </div>
              </div>
    );
};

export default Sidemenu;