import React, { useEffect, useState } from "react";
import ProfileSettings from "./ProfileSetting";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getToken } from "../../redux/reducers/tokenSlice";
import { toast } from "react-toastify";

export default function Profile() {
  const [activeSection, setActiveSection] = useState("courses");
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const [courses] = useState([
    {
      id: 1,
      title: "Web Development Bootcamp",
      progress: 75,
      duration: "8 weeks",
      lessons: 45,
      thumbnail:
        "https://images.unsplash.com/photo-1550439062-609e1531270e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    },
    {
      id: 2,
      title: "Advanced JavaScript",
      progress: 30,
      duration: "6 weeks",
      lessons: 30,
      thumbnail:
        "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    },
    {
      id: 3,
      title: "React Masterclass",
      progress: 15,
      duration: "5 weeks",
      lessons: 25,
      thumbnail:
        "https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    },
    {
      id: 4,
      title: "Python for Beginners",
      progress: 90,
      duration: "10 weeks",
      lessons: 50,
      thumbnail:
        "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    },
    {
      id: 5,
      title: "UI/UX Design Fundamentals",
      progress: 60,
      duration: "4 weeks",
      lessons: 20,
      thumbnail:
        "https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    },
    {
      id: 6,
      title: "Data Science Essentials",
      progress: 45,
      duration: "12 weeks",
      lessons: 60,
      thumbnail:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    },
    {
      id: 7,
      title: "Mobile Development with Flutter",
      progress: 25,
      duration: "7 weeks",
      lessons: 35,
      thumbnail:
        "https://images.unsplash.com/photo-1555099962-4199c345e5dd?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    },
    {
      id: 8,
      title: "Cloud Computing Basics",
      progress: 50,
      duration: "3 weeks",
      lessons: 15,
      thumbnail:
        "https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    },
    {
      id: 9,
      title: "Cybersecurity Fundamentals",
      progress: 10,
      duration: "6 weeks",
      lessons: 30,
      thumbnail:
        "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    },
    {
      id: 10,
      title: "Machine Learning Basics",
      progress: 5,
      duration: "10 weeks",
      lessons: 45,
      thumbnail:
        "https://images.unsplash.com/photo-1535378917042-10a22c95931a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    },
    {
      id: 11,
      title: "Full Stack Development",
      progress: 80,
      duration: "9 weeks",
      lessons: 40,
      thumbnail:
        "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    },
  ]);
  const dispatch = useDispatch();
  
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/v1/user/profile",
          { withCredentials: true }
        );

        if (response.data.success) {
          setUser(response.data.user);
          console.log(response.data.user)
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  const handleLogout = async () => {
    try {
      const {data} = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/v1/user/logout`, {} , {withCredentials: true});
      toast.success(data.message , { autoClose: 500 })
      dispatch(getToken(false))
      localStorage.removeItem("genToken");
      navigate("/");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className=" bg-gray-50">
      <div className="flex flex-col md:flex-row">
        {/* Side Menu */}
        <div className="w-full md:w-80 bg-white border-r border-gray-200 max-h-[calc(100vh-80px)] h-[calc(100vh-80px)] flex flex-col overflow-y-auto">
  <div className="p-3 md:p-4 flex-1">
    <div className="flex items-center space-x-2 md:space-x-4 mb-4 md:mb-8 group">
      <div className="relative flex-shrink-0">
        <img
          src={user.avatar}
          alt={`${user.firstName} ${user.lastName}'s avatar`}
          className="w-8 h-8 md:w-14 md:h-14 rounded-full object-cover transition-transform duration-300 hover:scale-105 cursor-pointer"
          loading="lazy"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "/default-avatar.png";
          }}
        />
        <span className="absolute bottom-0 right-0 w-2 h-2 md:w-3 md:h-3 bg-green-500 rounded-full border-2 border-white"></span>
      </div>
      <div className="leading-tight">
        <h3 className="font-semibold text-gray-900 text-sm md:text-base transition-colors group-hover:text-gray-800">
          {user.firstName} {user.lastName}
        </h3>
      </div>
    </div>

    <nav className="space-y-1 md:space-y-2">
      <button
        onClick={() => setActiveSection("courses")}
        className={`w-full flex items-center space-x-2 md:space-x-3 px-2 py-1.5 md:px-3 md:py-2 rounded-lg ${
          activeSection === "courses"
            ? "text-[#c591c8] bg-[#410445]"
            : "text-gray-600 hover:bg-gray-50"
        }`}
      >
        <svg
          className="w-4 h-4 md:w-5 md:h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
          />
        </svg>
        <span className="text-sm md:text-base">My Courses</span>
      </button>

      <button
        onClick={() => setActiveSection("profile")}
        className={`w-full flex items-center space-x-2 md:space-x-3 px-2 py-1.5 md:px-3 md:py-2 rounded-lg ${
          activeSection === "profile"
            ? "text-[#c591c8] bg-[#410445]"
            : "text-gray-600 hover:bg-gray-50"
        }`}
      >
        <svg
          className="w-4 h-4 md:w-5 md:h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          />
        </svg>
        <span className="text-sm md:text-base">Profile Settings</span>
      </button>
    </nav>
  </div>
  <div className="p-3 md:p-4 border-t border-gray-100">
    <button
      onClick={handleLogout}
      className="w-full flex items-center space-x-2 md:space-x-3 px-2 py-1.5 md:px-3 md:py-2 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
    >
      <svg
        className="w-4 h-4 md:w-5 md:h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
        />
      </svg>
      <span className="text-sm md:text-base">Log Out</span>
    </button>
  </div>
</div>

        {/* Main Content */}
        <div className="flex-1 ">
          {activeSection === "profile" ? (
            <ProfileSettings user={user} setUser={setUser} />
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 p-8">
              {courses.map((course) => (
                <div
                  key={course.id}
                  className="bg-white rounded-xl shadow-md "
                >
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-gray-800">
                      {course.title}
                    </h3>
                    <div className="mt-4 space-y-2">
                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <span>Progress</span>
                        <span>{course.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-[#2A0B2C] rounded-full h-2"
                          style={{ width: `${course.progress}%` }}
                        ></div>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <div className="flex items-center">
                          <svg
                            className="w-5 h-5 mr-1"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                          <span>{course.duration}</span>
                        </div>
                        <div className="flex items-center">
                          <svg
                            className="w-5 h-5 mr-1"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                            />
                          </svg>
                          <span>{course.lessons} lessons</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
