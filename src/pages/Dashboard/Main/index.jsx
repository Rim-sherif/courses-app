const Main = () => {
  return (
    <div className="flex h-screen bg-purple-50 mt-4">
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Dashboard Content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-6 bg-purple-50">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="p-6 rounded-lg shadow-md bg-white flex items-center">
              <svg
                className="h-12 w-12 mr-4 mb-8"
                viewBox="0 0 24 24"
                fill="none"
              >
                <circle cx="12" cy="12" r="12" fill="#A5158C" />
                <path
                  d="M8 16h8M8 12h8M8 8h4"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
              <div>
                <h3 className="text-black text-sm font-medium">Active Courses</h3>
                <p className="mt-2 text-3xl font-semibold text-black">5</p>
              </div>
            </div>
            <div className="p-6 rounded-lg shadow-md bg-white flex items-center">
              <svg
                className="h-12 w-12 mr-4 mb-8"
                viewBox="0 0 24 24"
                fill="none"
              >
                <circle cx="12" cy="12" r="12" fill="#A5158C" />
                <path
                  d="M12 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm-2 5a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm4 0a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm-2 5a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"
                  fill="white"
                />
              </svg>
              <div>
                <h3 className="text-black text-sm font-medium">Total Students</h3>
                <p className="mt-2 text-3xl font-semibold text-black">124</p>
              </div>
            </div>
            <div className="p-6 rounded-lg shadow-md bg-white flex items-center">
              <svg
                className="h-12 w-12 mr-4 mb-8"
                viewBox="0 0 24 24"
                fill="none"
              >
                <circle cx="12" cy="12" r="12" fill="#A5158C" />
                <path
                  d="M9 12l2 2 4-4"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <div>
                <h3 className="text-black text-sm font-medium">Completion Rate</h3>
                <p className="mt-2 text-3xl font-semibold text-black">87%</p>
              </div>
            </div>
          </div>

          {/* Featured Courses */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-black mb-4">Featured Courses</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 rounded-lg shadow-md bg-white">
                <h3 className="text-lg font-medium text-black">React Basics</h3>
                <p className="text-black mt-2">45 Students • 80% Complete</p>
                <button className="mt-4 bg-[#A5158C] text-white py-1 px-3 rounded-md hover:bg-black transition-colors cursor-pointer">
                  View Course
                </button>
              </div>
              <div className="p-6 rounded-lg shadow-md bg-white">
                <h3 className="text-lg font-medium text-black">Advanced CSS</h3>
                <p className="text-black mt-2">32 Students • 65% Complete</p>
                <button className="mt-4 bg-[#A5158C] text-white py-1 px-3 rounded-md hover:bg-black transition-colors cursor-pointer">
                  View Course
                </button>
              </div>
              <div className="p-6 rounded-lg shadow-md bg-white">
                <h3 className="text-lg font-medium text-black">JavaScript Pro</h3>
                <p className="text-black mt-2">58 Students • 92% Complete</p>
                <button className="mt-4 bg-[#A5158C] text-white py-1 px-3 rounded-md hover:bg-black transition-colors cursor-pointer">
                  View Course
                </button>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="p-6 rounded-lg shadow-md bg-white">
            <h2 className="text-xl font-semibold text-black mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button className="bg-[#A5158C] text-white py-2 px-4 rounded-md hover:bg-black transition-colors cursor-pointer">
                Create New Course
              </button>
              <button className="bg-[#A5158C] text-white py-2 px-4 rounded-md hover:bg-black transition-colors cursor-pointer">
                Grade Assignments
              </button>
              <button className="bg-[#A5158C] text-white py-2 px-4 rounded-md hover:bg-black transition-colors cursor-pointer">
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