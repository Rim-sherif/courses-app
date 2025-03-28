import React, { useState, useEffect } from 'react';
import instr1 from '../assets/images/darshan-patel-QJEVpydulGs-unsplash.jpg';
import instr2 from '../assets/images/jonas-kakaroto-KIPqvvTOC1s-unsplash.jpg';
import instr3 from '../assets/images/linkedin-sales-solutions-pAtA8xe_iVM-unsplash.jpg';
import instr4 from '../assets/images/christina-wocintechchat-com-0Zx1bDv5BNY-unsplash.jpg';
import instr5 from '../assets/images/reza-biazar-eSjmZW97cH8-unsplash.jpg';
import instr6 from '../assets/images/sergio-de-paula-c_GmwfHBDzk-unsplash.jpg';
import instr7 from '../assets/images/usman-yousaf-6pmG8XIKE2w-unsplash.jpg';
import instr8 from '../assets/images/vicky-hladynets-C8Ta0gwPbQg-unsplash.jpg';

// Fallback images array
const fallbackImages = [instr1, instr2, instr3, instr4, instr5, instr6, instr7, instr8];

export default function Featuredinstructors() {
    const [instructors, setInstructors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchInstructors = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/v1/user/instructors`);
                if (!response.ok) {
                    throw new Error('Failed to fetch instructors');
                }
                const data = await response.json();
                // Take first 8 instructors who have courses and are approved
                const filteredInstructors = data.data
                    .filter(instr => instr.isApproved && instr.courses.length > 0)
                    .slice(0, 8)
                    .map((instr, index) => ({
                        name: `${instr.firstName} ${instr.lastName}`,
                        role: instr.jobTitle || 'Instructor',
                        img: instr.avatar || fallbackImages[index % fallbackImages.length],
                        rating: 4.8 + Math.random() * 0.2, // Random rating between 4.8-5.0 since API doesn't provide this
                        reviews: Math.floor(Math.random() * 1000) + 300 // Random reviews between 300-1300
                    }));
                setInstructors(filteredInstructors);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchInstructors();
    }, []);

    const RatingStars = ({ rating }) => {
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 >= 0.3;

        return (
            <div className="flex justify-center" role="img" aria-label={`Rating: ${rating} out of 5 stars`}>
                {[...Array(5)].map((_, i) => (
                    <svg
                        key={i}
                        className={`w-5 h-5 ${i < fullStars ? 'text-yellow-400' : 'text-gray-300'}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                    >
                        {i === fullStars && hasHalfStar ? (
                            <path d="M10 1.618l1.176 3.57h3.804l-3.08 2.224 1.176 3.57L10 8.768 6.924 11.98l1.176-3.57-3.08-2.224h3.804L10 1.618z"/>
                        ) : (
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                        )}
                    </svg>
                ))}
            </div>
        );
    };

    if (loading) {
        return (
            <section className="py-16 bg-gradient-to-b from-white to-[#410445]/5">
                <div className="container mx-auto px-4">
                    <h2 className="text-2xl md:text-4xl font-bold text-center py-4">Featured Instructors</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-6">
                        {[...Array(8)].map((_, i) => (
                            <div key={i} className="bg-white rounded-lg shadow-md p-6 animate-pulse">
                                <div className="w-32 h-32 rounded-full mx-auto mb-4 bg-gray-200"></div>
                                <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto mb-2"></div>
                                <div className="h-3 bg-gray-200 rounded w-1/2 mx-auto mb-3"></div>
                                <div className="flex justify-center space-x-1">
                                    {[...Array(5)].map((_, j) => (
                                        <div key={j} className="w-5 h-5 bg-gray-200 rounded-full"></div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        );
    }

    if (error) {
        return (
            <section className="py-16 bg-gradient-to-b from-white to-[#410445]/5">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-2xl md:text-4xl font-bold py-4">Featured Instructors</h2>
                    <p className="text-red-600">Error: {error}</p>
                </div>
            </section>
        );
    }

    return (
        <section className="py-16 bg-gradient-to-b from-white to-[#410445]/5 relative overflow-hidden">
            <div className="container mx-auto px-4 ">
                <h2 className="text-2xl md:text-4xl font-bold text-center py-4 ">
                    Featured Instructors
                    <span className="absolute bottom-[-12px] left-1/2 -translate-x-1/2 w-24 h-1 bg-[#410445] after:content-[''] after:absolute after:w-4 after:h-4 after:border-2 after:border-[#410445] after:rotate-45 after:-top-1.5 after:left-[calc(50%-8px)]"></span>
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-6">
                    {instructors.map((instructor, index) => (
                        <article 
                            key={`${instructor.name}-${index}`}
                            className="group bg-white rounded-lg shadow-md p-6 text-center relative overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-2"
                        >
                            <div className="relative">
                                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full w-32 h-32 mx-auto"></div>
                                <img 
                                    src={instructor.img} 
                                    alt={instructor.name} 
                                    loading="lazy"
                                    className="w-32 h-32 rounded-full mx-auto mb-4 object-cover border-4 border-white shadow-lg transition-transform duration-300 group-hover:scale-110"
                                    style={{ viewTransitionName: `instructor-${index}` }}
                                    onError={(e) => { e.target.src = fallbackImages[index % fallbackImages.length]; }}
                                />
                            </div>
                            
                            <h3 className="font-semibold text-lg mb-1">{instructor.name}</h3>
                            <p className="text-gray-600 text-sm mb-3">{instructor.role}</p>
                            
                            <RatingStars rating={instructor.rating} />
                            
                            <div className="mt-2 flex justify-center items-center space-x-2">
                                <span className="text-sm font-medium text-gray-700">
                                    {instructor.rating.toFixed(1)}
                                </span>
                                <span className="text-gray-500 text-sm">({instructor.reviews.toLocaleString()} reviews)</span>
                            </div>

                            <div className="absolute inset-0 border-2 border-transparent group-hover:border-[#410445] transition-all duration-300 rounded-lg pointer-events-none"></div>
                        </article>
                    ))}
                </div>
            </div>

            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute -top-20 -right-20 w-60 h-60 bg-purple-100 rounded-full opacity-10 animate-blob"></div>
                <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-pink-100 rounded-full opacity-10 animate-blob animation-delay-2000"></div>
            </div>
        </section>
    );
}