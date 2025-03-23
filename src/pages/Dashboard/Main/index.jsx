const Main = () => {
  // Add these arrays before your JSX
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
  }
];

const courses = [
  {
    title: "React Basics",
    students: "45",
    completion: "80%"
  },
  {
    title: "Advanced CSS",
    students: "32",
    completion: "65%"
  },
  {
    title: "JavaScript Pro",
    students: "58",
    completion: "92%"
  }
];


  return (
    <div className="min-h-screen  py-6">
  {/* Main Content */}
  <div className="flex flex-col flex-1 overflow-hidden">
    {/* Dashboard Content */}
    <main className="flex-1 px-6 py-8 overflow-x-hidden overflow-y-auto">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-3">
        {statsCards.map((card) => (
          <div key={card.title} className="p-6 bg-white rounded-xl shadow-sm border border-opacity-10 border-[#410445] hover:shadow-md transition-shadow">
            <div className="flex items-center">
              <div className="flex items-center justify-center w-16 h-16 mr-4  rounded-full bg-[#410445] bg-opacity-10">
                {card.icon}
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-600">{card.title}</h3>
                <p className="mt-1 text-3xl font-bold text-[#410445]">{card.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Featured Courses */}
      <div className="mb-8">
        <h2 className="mb-6 text-2xl font-bold text-[#410445]">Featured Courses</h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {courses.map((course) => (
            <div key={course.title} className="overflow-hidden bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="p-6 bg-[#410445] bg-opacity-5">
                <h3 className="text-lg font-semibold text-[#410445]">{course.title}</h3>
                <p className="mt-2 text-sm text-gray-600">{course.students} Students • {course.completion} Complete</p>
              </div>
              <div className="p-4 bg-white">
                <button className="w-full px-4 py-2 text-sm font-medium text-white transition-all transform bg-[#410445] rounded-lg hover:bg-opacity-90 hover:-translate-y-0.5">
                  View Course
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="p-6 bg-white rounded-xl shadow-sm border border-opacity-10 border-[#410445]">
        <h2 className="mb-6 text-2xl font-bold text-[#410445]">Quick Actions</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <button className="px-6 py-3 text-sm font-medium text-white transition-colors bg-[#410445] rounded-xl hover:bg-opacity-90">
            Create New Course
          </button>
          <button className="px-6 py-3 text-sm font-medium text-white transition-colors bg-[#410445] rounded-xl hover:bg-opacity-90">
            Grade Assignments
          </button>
          <button className="px-6 py-3 text-sm font-medium text-white transition-colors bg-[#410445] rounded-xl hover:bg-opacity-90">
            View Messages
          </button>
        </div>
      </div>
    </main>
  </div>
</div>
  );
};

export default Main;