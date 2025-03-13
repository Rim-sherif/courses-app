import React from 'react';
import instr1 from '../assets/images/darshan-patel-QJEVpydulGs-unsplash.jpg';
import instr2 from '../assets/images/jonas-kakaroto-KIPqvvTOC1s-unsplash.jpg';
import instr3 from '../assets/images/linkedin-sales-solutions-pAtA8xe_iVM-unsplash.jpg';
import instr4 from '../assets/images/christina-wocintechchat-com-0Zx1bDv5BNY-unsplash.jpg';
import instr5 from '../assets/images/reza-biazar-eSjmZW97cH8-unsplash.jpg';
import instr6 from '../assets/images/sergio-de-paula-c_GmwfHBDzk-unsplash.jpg';
import instr7 from '../assets/images/usman-yousaf-6pmG8XIKE2w-unsplash.jpg';
import instr8 from '../assets/images/vicky-hladynets-C8Ta0gwPbQg-unsplash.jpg';


export default function Featuredinstructors(){
    const instructors = [
        { img: instr1, name: 'Amanda Chen', role: 'UX Research & Design Lead', rating: 4.9, reviews: 856 },
        { img: instr2, name: 'Marcus Rodriguez', role: 'Senior Web Developer', rating: 4.8, reviews: 734 },
        { img: instr3, name: 'Dr. James Wilson', role: 'AI & Machine Learning Expert', rating: 5.0, reviews: 623 },
        { img: instr4, name: 'Sarah Mitchell', role: 'Product Design Director', rating: 4.9, reviews: 512 },
        { img: instr5, name: 'Dr. Alex Kumar', role: 'Data Science Specialist', rating: 4.8, reviews: 445 },
        { img: instr6, name: 'Laura Thompson', role: 'Mobile Development Lead', rating: 4.7, reviews: 389 },
        { img: instr7, name: 'Dr. Michael Foster', role: 'Cloud Architecture Expert', rating: 4.9, reviews: 467 },
        { img: instr8, name: 'Emma Davis', role: 'Digital Marketing Strategist', rating: 4.8, reviews: 378 }
    ];

    return (
        <section className="py-16 bg-gradient-to-b from-white to-[#410445]/5">
            <div className="container mx-auto px-4">
                <h2 className="text-4xl font-bold text-center mb-16 relative after:content-[''] after:absolute after:bottom-[-12px] after:left-1/2 after:-translate-x-1/2 after:w-24 after:h-1 after:bg-[#410445]">Featured Instructors</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-6">
                    {instructors.map((instructor, index) => (
                        <div key={index} className="bg-white rounded-lg shadow-md p-6 text-center hover:transform hover:scale-105 transition-transform">
                            <img 
                                src={instructor.img} 
                                alt={instructor.name} 
                                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover border-4 border-white shadow-lg"
                            />
                            <h3 className="font-semibold text-lg mb-1">{instructor.name}</h3>
                            <p className="text-gray-600 text-sm mb-3">{instructor.role}</p>
                            <div className="flex justify-center items-center space-x-1 mb-2">
                                {[...Array(Math.floor(instructor.rating))].map((_, i) => (
                                    <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                                    </svg>
                                ))}
                                {instructor.rating % 1 !== 0 && (
                                    <svg className="w-5 h-5 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                                    </svg>
                                )}
                            </div>
                            <p className="text-sm text-gray-600">{instructor.rating} ({instructor.reviews} reviews)</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};











