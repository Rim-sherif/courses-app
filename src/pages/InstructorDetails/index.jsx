import { faLinkedin, faLinkedinIn, faXTwitter, faYoutube } from "@fortawesome/free-brands-svg-icons";
import {
  faCalendar,
  faCalendarAlt,
  faCheck,
  faDesktop,
  faMobile,
  faNewspaper,
  faPlay,
  faStar,
  faTrophy,
  faTv,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import CourseCard from "../../components/courseCard/CourseCard";

export default function InstructorDetails() {
  const { id } = useParams();
  const [instructor, setInstructor] = useState({});
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

  const getInstructorDetails = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/v1/user/${id}`
      );
      console.log(data);
      setInstructor(data.instructor);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getInstructorDetails();
  }, []);

  return (
    <div className="mb-10">
      {Object.keys(instructor).length > 0 && (
        <>

          <div className="bg-[#F2EFFF] p-5">
            <div className="w-[80%] mx-auto flex  items-center justify-between">
              
              <div className="w-[65%]">
                <h2 className="font-bold text-xl uppercase mb-[3px]!">Instructor</h2>
                <h2 className="font-extrabold! text-[#303141] text-4xl uppercase mb-5">{instructor.firstName} {instructor.lastName}</h2>

                <section className="text-gray-500 mt-1 text-sm font-semibold">
                  {instructor.jobTitle}, Teacher
                </section>
              </div>

              <div className="w-[30%] bg-white py-5 px-10 rounded-2xl">

                <div>
                  <img className="w-[150px] h-[150px] mx-auto object-cover rounded-full" src={instructor.avatar}
                  alt=""/>
                </div>

                <div className="flex justify-center gap-3 mt-5">

                  <a href="#" className="border border-[#6D28D2] text-[#6D28D2] block w-fit px-4 py-2 rounded">
                    <FontAwesomeIcon icon={faLinkedinIn} />
                  </a>
                  <a href="#" className="border border-[#6D28D2] text-[#6D28D2] block w-fit px-4 py-2 rounded">
                    <FontAwesomeIcon icon={faYoutube} />
                  </a>
                  <a href="#" className="border border-[#6D28D2] text-[#6D28D2] block w-fit px-4 py-2 rounded">
                    <FontAwesomeIcon icon={faXTwitter} />
                  </a>

                </div>

              </div>

            </div>
          </div>

          <div className="p-6 my-5 mx-auto w-[80%]">
            
            <div className="flex mb-10 gap-15">
              <div>
                <h2 className="font-extrabold! mb-0!">2,119,972</h2>
                <span>Total learners</span>
              </div>
              <div>
                <h2 className="font-extrabold! mb-0!">471,691</h2>
                <span>Reviews</span>
              </div>
            </div>

            <article>
              <h2 className="font-black! text-3xl ">About me</h2>
              <section className="mb-2 mt-5 text-gray-500">
                I'm a Flutter Developer with a passion for building scalable,
                high-performance mobile applications. I hold a degree in
                Communication and Electronics Engineering from Alexandria
                University (Class of 2023). My expertise spans Flutter, Dart,
                Firebase, C, C++, MySQL, SQLite, and MS SQL Server.
              </section>
              <section className="text-gray-500">
                I also run a YouTube channel, where I share in-depth tutorials
                on Flutter development, helping developers enhance their skills
                and build amazing apps. In addition, I focus on best software
                engineering practices, such as SOLID principles, to ensure clean
                and maintainable code.
              </section>
            </article>

            <div className="courses mt-5">
              <h2 className="font-extrabold! text-2xl mb-5">
                My courses ({instructor.courses.length})
              </h2>
              <div className="flex justify-between flex-wrap">
                {instructor.courses.map(course=><CourseCard key={course._id} course={course}/>)}
              </div>
            </div>

          </div>

        </>
      )}
    </div>
  );
}
