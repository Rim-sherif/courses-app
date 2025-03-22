import React from 'react';

export default function Certificates() {
  // Sample data (replace with real data from an API or state later)
  const certificates = [
    { id: 1, name: "React Basics", date: "March 2025" },
    { id: 2, name: "Advanced JavaScript", date: "Feb 2025" },
  ];

  return (
    <div className="bg-purple-800 rounded-2xl p-8 shadow-lg max-w-4xl mx-auto mt-10">
      {/* Heading /}
      <h1 className="text-4xl text-yellow-400 font-bold font-poppins mb-6">
        Your Certificates
      </h1>
      <p className="text-lg text-gray-400 font-poppins mb-8">
        View and manage all the certificates you’ve earned with Mentora.
      </p>

      {/ Certificates List /}
      {certificates.length > 0 ? (
        certificates.map((cert) => (
          <div
            key={cert.id}
            className="bg-purple-700 rounded-xl p-6 flex items-center gap-5 mb-6"
          >
            <span className="text-3xl text-yellow-400">🏆</span>
            <div>
              <div className="text-white font-poppins text-lg">{cert.name}</div>
              <div className="text-gray-400 font-poppins">Earned: {cert.date}</div>
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-400 font-poppins">No certificates earned yet.</p>
      )}

      {/ Call to Action Button */}
      <button className="bg-gradient-to-r from-yellow-400 to-orange-400 text-purple-700 font-poppins font-semibold text-lg py-3 px-8 rounded-full hover:scale-105 transition-transform duration-300">
        Explore More Courses
      </button>
    </div>
  );
}