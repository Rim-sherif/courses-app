import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import noValue from "/no-value.png";
import Loader from "../../components/Loader";
import CourseCard from "../../components/courseCard/CourseCard";
import InstructorCard from "../../components/instructorCard/InstructorCard";

export default function Search() {
  const [search] = useSearchParams();
  const key = search.get("key");
  const searchVal = search.get("q");
  const [result, setResult] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const stars = [1, 2, 3, 4, 5];

  const getData = async () => {
    setLoading(true);
    const values = {
      collectionName: key,
      searchFilters: searchVal,
    };

    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/v1/course/search`,
        values
      );
      setResult(data?.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setError(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, [key, searchVal]);

  return (
    <div className="w-[94%] mx-auto my-10 flex items-start flex-wrap justify-start gap-3">
      {loading ? (
        <div className="inset-0 fixed bg-[rgba(255,255,255,1)] flex text-white justify-center items-center text-2xl">
          <Loader />
        </div>
      ) : (
        ""
      )}

      {error ? <div>{error}</div> : ""}

      {result.length > 0 && key == "courses"
        ? result.map((user) => (
            <CourseCard
              course={user}
              key={user._id}
              customWidth={4}
              stars={stars}
            />
          ))
        : ""}

      {result.length == 0 && (
        <div>
          <h2 className="text-2xl text-center">No {key} yet for this search</h2>
          <img className="w-[30%] mx-auto" src={noValue} alt="" />
        </div>
      )}

      {result.length > 0 && key == "instructors"
        ? result.map((user) => (
            <InstructorCard
              user={user}
              key={user._id}
              customWidth={4}
              stars={stars}
            />
          ))
        : ""}
    </div>
  );
}
