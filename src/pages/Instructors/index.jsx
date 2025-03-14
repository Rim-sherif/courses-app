import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Instructors() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [category, setCategory] = useState([]);

  const categories = [
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
  ];

  const stars = [1, 2, 3, 4, 5];

  const getAllInstructors = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/v1/instructors`
      );
      console.log(data);
      setUsers(data?.data);
      setLoading(false);
      setError("");
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    getAllInstructors();
  }, []);

  return (
    <div className="flex w-[90%] mx-auto justify-between">
      <div className="w-[23%] py-10 px-3">
        {categories
          ? categories.map((item) => (
              <div key={item.id}>
                <input type="checkbox" />
                <label htmlFor="">{item.category}</label>
              </div>
            ))
          : ""}
      </div>

      <div className="w-[75%] my-10 flex flex-wrap justify-between">
        {error ? <div>{error}</div> : ""}

        {users ? (
          users.map((user) => (
            <div
              className="w-[32.5%] border-1 rounded border-gray-200 p-5 mb-3 text-center"
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
                  Data Scientist
                </section>
                <section>
                  <strong>2</strong> Courses
                </section>
              </div>
              <Link to="/">
                <button className="bg-[]">Profile</button>
              </Link>
            </div>
          ))
        ) : (
          <h1>No instructors yet</h1>
        )}
      </div>
    </div>
  );
}
