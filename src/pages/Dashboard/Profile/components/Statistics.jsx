import { faBook, faStar, faUsers } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Statistics = ({ coursesCount = 0, studentsCount = 0, rating = '0.0' }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
    <div className="border-b border-gray-100 pb-6 mb-8">
      <h2 className="text-2xl font-bold text-gray-900">Performance Metrics</h2>
    </div>
    
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
      <div className="bg-[#f5f3ff] p-6 rounded-xl text-center transition-transform duration-200 hover:scale-[1.02]">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-[#410445] rounded-full mb-4">
          <FontAwesomeIcon 
            icon={faBook} 
            className="text-white text-2xl" 
          />
        </div>
        <div className="text-2xl font-bold text-gray-900 mb-2">
          {coursesCount}
        </div>
        <span className="text-[#410445] font-semibold uppercase tracking-wide text-sm">
          Courses Published
        </span>
      </div>
  
      <div className="bg-[#f5f3ff] p-6 rounded-xl text-center transition-transform duration-200 hover:scale-[1.02]">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-[#410445] rounded-full mb-4">
          <FontAwesomeIcon 
            icon={faUsers} 
            className="text-white text-2xl" 
          />
        </div>
        <div className="text-2xl font-bold text-gray-900 mb-2">
          {new Intl.NumberFormat().format(studentsCount)}
        </div>
        <span className="text-[#410445] font-semibold uppercase tracking-wide text-sm">
          Active Learners
        </span>
      </div>
  
      <div className="bg-[#f5f3ff] p-6 rounded-xl text-center transition-transform duration-200 hover:scale-[1.02]">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-[#410445] rounded-full mb-4">
          <FontAwesomeIcon 
            icon={faStar} 
            className="text-white text-2xl" 
          />
        </div>
        <div className="text-2xl font-bold text-gray-900 mb-2">
          {rating}/5
        </div>
        <span className="text-[#410445] font-semibold uppercase tracking-wide text-sm">
          Average Rating
        </span>
      </div>
    </div>
  </div>
  );
};

export default Statistics;
