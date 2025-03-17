import React, { useEffect, useState } from "react";
import ProfileSettings from "./ProfileSetting";
import axios from "axios";

export default function Profile() {
  const [activeSection, setActiveSection] = useState("courses");
  const [user, setUser] = useState(null);
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
  ]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/v1/user/profile',{withCredentials: true});
       
        
        if (response.data.success) {
          setUser(response.data.user); 
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="min-h-screen bg-gray-50 flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex flex-col md:flex-row">
        {/* Side Menu */}
        <div className="w-full md:w-80 bg-white border-r border-gray-200 min-h-screen">
          <div className="p-4">
            <div className="flex items-center space-x-3 md:space-x-4 mb-6 md:mb-8 group">
              <div className="relative flex-shrink-0">
                <img
                  src={user.avatar}
                  alt={`${user.firstName} ${user.lastName}'s avatar`}
                  className="w-10 h-10 md:w-14 md:h-14 rounded-full object-cover transition-transform duration-300 hover:scale-105 cursor-pointer"
                  loading="lazy"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/default-avatar.png";
                  }}
                />
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
              </div>
              <div className="leading-tight">
                <h3 className="font-semibold text-gray-900 transition-colors group-hover:text-gray-800">
                  {user.firstName} {user.lastName}
                </h3>
              </div>
            </div>

            <nav className="space-y-2">
              <button
                onClick={() => setActiveSection("courses")}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg ${
                  activeSection === "courses"
                    ? "text-[#c591c8] bg-[#410445]"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <svg
                  className="w-5 h-5"
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
                <span>My Courses</span>
              </button>

              <button
                onClick={() => setActiveSection("profile")}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg ${
                  activeSection === "profile"
                    ? "text-[#c591c8] bg-[#410445]"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <svg
                  className="w-5 h-5"
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
                <span>Profile Settings</span>
              </button>
            </nav>
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
                  className="bg-white rounded-xl shadow-md overflow-hidden"
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









