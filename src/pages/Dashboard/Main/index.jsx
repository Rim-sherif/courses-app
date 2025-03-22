import React from 'react';

const Main = () => {
  return (
    <div className="bg-purple-800 rounded-2xl p-8 shadow-lg max-w-4xl mx-auto mt-10">
      {/* Heading /}
      <h1 className="text-4xl text-yellow-400 font-bold font-poppins mb-6">
        Welcome to Your Dashboard
      </h1>
      <p className="text-lg text-gray-400 font-poppins mb-8">
        Track your learning progress, explore new courses, and achieve your goals with Mentora.
      </p>

      {/ Stats Cards /}
      <div className="bg-purple-700 rounded-xl p-6 flex items-center gap-5 mb-6">
        <span className="text-3xl text-yellow-400">⚡</span>
        <div>
          <div className="text-white font-poppins text-lg">Courses Enrolled</div>
          <div className="text-2xl text-yellow-400 font-semibold font-poppins">5</div>
        </div>
      </div>

      <div className="bg-purple-700 rounded-xl p-6 flex items-center gap-5 mb-8">
        <span className="text-3xl text-yellow-400">🏆</span>
        <div>
          <div className="text-white font-poppins text-lg">Certificates Earned</div>
          <div className="text-2xl text-yellow-400 font-semibold font-poppins">2</div>
        </div>
      </div>

      {/ Call to Action Button */}
      <button className="bg-gradient-to-r from-yellow-400 to-orange-400 text-purple-700 font-poppins font-semibold text-lg py-3 px-8 rounded-full hover:scale-105 transition-transform duration-300">
        Explore New Courses
      </button>
    </div>
  );
};

export default Main;