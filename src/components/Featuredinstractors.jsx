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
};











