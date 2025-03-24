import { useNavigate } from "react-router-dom";
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
    title: "Completion Rate",
    value: "87%",
    icon: (
      <svg className="h-8 w-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path d="M9 12l2 2 4-4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
  },{
    title: "Balance",
    value: "3000 $",
    icon: (
      <svg className="h-8 w-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path d="M9 12l2 2 4-4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
  }
];



const courses = [
  {
    title: "React Basics",
    students: "45",
    completion: "80%",
    image: img1
  },
  {
    title: "Advanced CSS",
    students: "32",
    completion: "65%",
    image: img2
  },
  {
    title: "JavaScript Pro",
    students: "58",
    completion: "92%",
    image: img3
  },
  {
    title: "Web Development",
    students: "58",
    completion: "92%",
    image: img4
  }
];


  return (
    <div className="min-h-screen bg-gray-50 w-full mt-3" style={{ backgroundColor: colors.background }}>
    <div className="flex flex-col flex-1 overflow-hidden">
      <main className="flex-1 px-6 py-8 overflow-x-hidden overflow-y-auto ">
        {/* Stats Cards Section */}
        <div className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-4">
          {statsCards.map((card) => (
            <div 
              key={card.title}
              className="p-4 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1.5"
              style={{ background: `linear-gradient(135deg, ${colors.primary}20 0%, #FFFFFF 100%)` }}
            >
              <div className="flex items-center">
                <div className="flex items-center justify-center w-10 h-10 mr-4 rounded-lg bg-[#410445] shadow-soft-2xl" 
                    >
                  {card.icon}
                </div>
                <div>
                  <h3 className="mb-0 font-sans font-semibold leading-normal text-sm dark:opacity-60">
                    {card.title}
                  </h3>
                  <h5 className="mb-0 font-bold dark:text-white">
                    {card.value}
                  </h5>
                </div>
              </div>
            </div>
          ))}
        </div>
   

        {/* Featured Courses Section */}
        <div className="mb-8">
          <h2 className="mb-6 text-2xl font-bold" style={{ color: colors.text }}>Featured Courses</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
            {courses.map((course) => (
              <div 
                key={course.title}
                className="overflow-hidden bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1.5"
              >
                <div className="h-32 overflow-hidden">
                  <img 
                    src={course.image} 
                    alt={course.title} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold mb-2" style={{ color: colors.text }}>{course.title}</h3>
                  <div className="flex justify-between text-sm mb-4" style={{ color: colors.textLight }}>
                    <span>{course.students} Students</span>
                    <span>{course.completion} Complete</span>
                  </div>
                  <div className="relative pt-1">
                    <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-purple-100">
                      <div 
                        style={{ 
                          width: course.completion,
                          background: `linear-gradient(90deg, ${colors.primary} 0%, ${colors.primary} 100%)`
                        }}
                        className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center transition-all duration-500"
                      ></div>
                    </div>
                  </div>
                  <button 
                    className="w-full px-4 py-3 text-sm font-medium text-white transition-all duration-300 rounded-lg bg-[#410445] hover:shadow-lg"
                   
                  >
                    View Course
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions Section */}
        <div className="p-6 bg-white rounded-2xl shadow-lg">
          <h2 className="mb-6 text-2xl font-bold" style={{ color: colors.text }}>Quick Actions</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <button 
              className="px-6 py-4 text-sm font-medium text-white transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-lg rounded-xl bg-[#410445]"
              onClick={() => navigate("/dashboard/course/add")}

            >
              <div className="flex items-center justify-center space-x-2">
                {/* <PlusIcon className="w-5 h-5" /> */}
                <span>Create New Course</span>
              </div>
            </button>
         
          </div>
        </div>
      </main>
    </div>
  </div>
  );
};

export default Main;










