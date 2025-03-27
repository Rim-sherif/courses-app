import { useNavigate } from "react-router-dom";
import { BarChart, Bar, PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import img3 from "../../../assets/images/business-people-blue-background.jpg";
import img1 from "../../../assets/images/html-css-collage-concept.jpg";
import img2 from "../../../assets/images/uiux.jpg";
import img4 from "../../../assets/images/usman-yousaf-6pmG8XIKE2w-unsplash.jpg";

const Main = () => {
  const navigate = useNavigate();

  const colors = {
    primary: '#410445',
    primaryLight: '#6D28D9',
    secondary: '#3B82F6',
    accent: '#10B981',
    background: '#F8FAFC',
    text: '#1E293B',
  };

  const statsCards = [
    {
      title: "Active Courses",
      value: "5",
      icon: (
        <svg className="h-8 w-8 text-white" viewBox="0 0 24 24" fill="currentColor">
          <path d="M8 16h8M8 12h8M8 8h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      )
    },
    {
      title: "Total Students",
      value: "124",
      icon: (
        <svg className="h-8 w-8 text-white" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm-2 5a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm4 0a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm-2 5a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"/>
        </svg>
      )
    },
    {
      title: "New Enrollments",
      value: "24",
      icon: (
        <svg className="h-8 w-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M12 6v6m0 0v6m0-6h6m-6 0H6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    },
    {
      title: "Balance",
      value: "3000 $",
      icon: (
        <svg className="h-8 w-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M9 12l2 2 4-4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    },
  ];

  const courses = [
    {
      title: "React Basics",
      students: "45",
      instructor: "Adham Elbeshbeshy",
      duration: "8 weeks",
      image: img1
    },
    {
      title: "React Basics",
      students: "45",
      instructor: "Adham Elbeshbeshy",
      duration: "8 weeks",
      image: img1
    },
    {
      title: "React Basics",
      students: "45",
      instructor: "Adham Elbeshbeshy",
      duration: "8 weeks",
      image: img1
    },
    {
      title: "Advanced CSS",
      students: "32",
      instructor: "Mohamed Hamed",
      duration: "6 weeks",
      image: img2
    },
    {
      title: "JavaScript Pro",
      students: "58",
      instructor: "aBDULRAHMAN",
      duration: "10 weeks",
      image: img3
    },
    {
      title: "Web Development",
      students: "58",
      instructor: "Reem SHERIF",
      duration: "12 weeks",
      image: img4
    }
  ];

  // Data for charts
  const studentsData = courses.map(course => ({ 
    name: course.title, 
    students: parseInt(course.students) 
  }));
  
  const COLORS = ["#410445", "#6D28D9", "#3B82F6", "#10B981"];

  return (
    <div className="min-h-screen w-full" style={{ backgroundColor: colors.background }}>
      <div className="flex flex-col flex-1 overflow-hidden">
        <main className="flex-1 px-6 py-8 overflow-x-hidden overflow-y-auto">
          {/* Stats Cards Section */}
          <div className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-2 lg:grid-cols-4">
            {statsCards.map((card) => (
              <div 
                key={card.title}
                className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 border border-gray-100"
              >
                <div className="flex items-center">
                  <div className="flex items-center justify-center w-12 h-12 mr-4 rounded-lg bg-gradient-to-br from-[#410445] to-[#6D28D9] shadow-sm">
                    {card.icon}
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">
                      {card.title}
                    </h3>
                    <h5 className="text-2xl font-bold" style={{ color: colors.primary }}>
                      {card.value}
                    </h5>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 gap-6 mb-8 lg:grid-cols-2">
            {/* Students per Course Bar Chart */}
            <div className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold" style={{ color: colors.text }}>Students per Course</h2>
              </div>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={studentsData}>
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'white',
                        borderRadius: '0.5rem',
                        border: '1px solid #e5e7eb',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                      }}
                    />
                    <Bar 
                      dataKey="students" 
                      fill={colors.primary}
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Popular Courses Pie Chart */}
            <div className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold" style={{ color: colors.text }}>Popular Courses</h2>
              </div>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie 
                      data={studentsData} 
                      cx="50%" 
                      cy="50%" 
                      innerRadius={60} 
                      outerRadius={90} 
                      paddingAngle={2}
                      dataKey="students"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {studentsData.map((entry, index) => (
                        <Cell 
                          key={`cell-${index}`} 
                          fill={COLORS[index % COLORS.length]} 
                        />
                      ))}
                    </Pie>
                    <Tooltip 
                      formatter={(value) => [`${value} students`, 'Enrollments']}
                      contentStyle={{ 
                        backgroundColor: 'white',
                        borderRadius: '0.5rem',
                        border: '1px solid #e5e7eb',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Featured Courses Section */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold" style={{ color: colors.text }}>Featured Courses</h2>
              <button 
                className="text-sm px-4 py-2 rounded-md bg-[#410445] text-white hover:bg-[#6D28D9] transition-colors"
                onClick={() => navigate("/dashboard/courses")}
              >
                View All Courses
              </button>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {courses.map((course) => (
                <div 
                  key={course.title}
                  className="overflow-hidden bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 border border-gray-100"
                >
                  <div className="h-40 overflow-hidden">
                    <img 
                      src={course.image} 
                      alt={course.title} 
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-semibold mb-2" style={{ color: colors.text }}>{course.title}</h3>
                    <div className="flex flex-col space-y-2 text-sm text-gray-600 mb-4">
                      <div className="flex items-center">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"/>
                        </svg>
                        <span>{course.instructor}</span>
                      </div>
                      <div className="flex items-center">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                        </svg>
                        <span>{course.duration}</span>
                      </div>
                      <div className="flex items-center">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
                        </svg>
                        <span>{course.students} Students</span>
                      </div>
                    </div>
                    <button 
                      className="w-full px-4 py-2 text-sm font-medium text-white transition-all duration-300 rounded-lg bg-gradient-to-r from-[#410445] to-[#6D28D9] hover:shadow-md"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions Section */}
          <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100">
            <h2 className="mb-6 text-2xl font-bold" style={{ color: colors.text }}>Quick Actions</h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-1">
              <button 
                className="px-6 py-4 text-sm font-medium text-white transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-md rounded-lg bg-gradient-to-r from-[#410445] to-[#6D28D9]"
                onClick={() => navigate("/dashboard/course/add")}
              >
                <div className="flex items-center justify-center space-x-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
                  </svg>
                  <span>Create New Course</span>
                </div>
              </button>
              {/* <button 
                className="px-6 py-4 text-sm font-medium text-white transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-md rounded-lg bg-gradient-to-r from-[#3B82F6] to-[#1D4ED8]"
                onClick={() => navigate("/dashboard/students")}
              >
                <div className="flex items-center justify-center space-x-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"/>
                  </svg>
                  <span>Manage Students</span>
                </div>
              </button> */}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Main;