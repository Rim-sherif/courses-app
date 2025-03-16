import { faBook, faCertificate, faGraduationCap, faUsers } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import img from '/learning-concept-illustration.png';
import Featuredinstructors from '../../components/Featuredinstractors';
import img1 from '../../assets/images/html-css-collage-concept.jpg';
import img2 from '../../assets/images/uiux.jpg';
import img3 from '../../assets/images/business-people-blue-background.jpg';
import img4 from '../../assets/images/usman-yousaf-6pmG8XIKE2w-unsplash.jpg';
import img5 from '../../assets/images/3409297.jpg';
import img6 from '../../assets/images/top-view-photography-accesories-with-copy-space.jpg';
import img7 from '../../assets/images/SL.123119.26540.04.jpg';        
import img8 from '../../assets/images/man-jumping-impossible-possible-cliff-sunset-background-business-concept-idea.jpg';
import instr6 from '../../assets/images/sergio-de-paula-c_GmwfHBDzk-unsplash.jpg';
import instr7 from '../../assets/images/usman-yousaf-6pmG8XIKE2w-unsplash.jpg';
import instr8 from '../../assets/images/vicky-hladynets-C8Ta0gwPbQg-unsplash.jpg';


const Home = () => {
    return (
        <div className="space-y-20">
   
   <section className="relative bg-gradient-to-br from-[#2A0B2C] to-[#410445] text-white py-28 overflow-hidden">
    <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className="relative hidden md:block">
                <div className="absolute -top-20 w-[600px] h-[600px] bg-gradient-to-r from-[#FF2DF1]/20 to-[#F6DC43]/20 rounded-full blur-2xl animate-pulse"></div>
                <img 
                    src={img}
                    alt="Learning experience" 
                    className="relative z-10 w-full max-w-[500px] mx-auto animate-float animate-custom-bounce"
                />
                <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-[#F6DC43]/10 rounded-full blur-xl"></div>
                
                <div className="absolute -right-12 bottom-40 bg-white/5 p-6 rounded-2xl backdrop-blur-lg border border-white/10 shadow-lg">
                    <div className="flex items-center space-x-4">
                        <div className="bg-[#F6DC43] p-3 rounded-xl">
                            <svg className="w-8 h-8 text-[#410445]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                            </svg>
                        </div>
                        <div>
                            <p className="text-sm text-blue-100">Daily Active Learners</p>
                            <p className="text-2xl font-bold text-[#F6DC43]">15,000+</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="relative z-10 space-y-8 md:pl-12">
                <h1 className="text-5xl md:text-6xl font-bold leading-tight bg-gradient-to-r from-[#F6DC43] to-[#FF2DF1] bg-clip-text text-transparent">
                    Transform Your Future Through Learning
                </h1>
                <p className="text-xl text-blue-100 opacity-90 max-w-xl leading-relaxed">
                    Dive into immersive learning experiences with 10,000+ expert-led courses. Gain practical skills, earn certifications, and advance your career on your schedule.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                    <button className="relative group bg-gradient-to-r from-[#F6DC43] to-[#FF2DF1] text-[#410445] px-8 py-4 rounded-xl font-semibold hover:shadow-lg hover:shadow-[#FF2DF1]/30 transition-all duration-300 transform hover:-translate-y-1">
                        <span className="relative z-10">Start Free Trial</span>
                        <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity rounded-xl"></div>
                    </button>
                    <button className="relative group border-2 border-[#F6DC43]/50 text-[#F6DC43] px-8 py-4 rounded-xl font-semibold hover:bg-[#F6DC43]/10 hover:border-[#F6DC43] transition-all duration-300 transform hover:-translate-y-1">
                        <span className="relative z-10">Explore Programs</span>
                        <div className="absolute inset-0 bg-[#F6DC43] opacity-0 group-hover:opacity-5 transition-opacity rounded-xl"></div>
                    </button>
                </div>
                <div className="flex items-center space-x-6 pt-4">
                    <div className="flex -space-x-4">
                        <img src={instr6} alt="Student" className="w-12 h-12 object-cover rounded-full border-2 border-white"/>
                        <img src={instr7} alt="Student" className="w-12 h-12 object-cover rounded-full border-2 border-white"/>
                        <img src={instr8} alt="Student" className="w-12 h-12 object-cover rounded-full border-2 border-white"/>
                        <div className="w-12 h-12 rounded-full border-2 border-white bg-[#F6DC43] flex items-center justify-center text-[#410445] font-bold">5K+</div>
                    </div>
                    <span className="text-blue-100 opacity-80">Join our community of successful learners</span>
                </div>
            </div>
            
           
        </div>
    </div>
    
    <div className="absolute inset-0 opacity-5 bg-[url('/noise.png')]"></div>
    <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#410445] to-transparent"></div>
</section>

            {/* Stats Section */}
            <section className="py-16 bg-[#A5158C]/10">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        <div className="space-y-2">
                            <FontAwesomeIcon icon={faUsers} className="text-4xl text-[#A5158C]" />
                            <div className="text-3xl font-bold">100K+</div>
                            <div className="text-gray-600">Active Students</div>
                        </div>
                        <div className="space-y-2">
                            <FontAwesomeIcon icon={faBook} className="text-4xl text-[#A5158C]" />
                            <div className="text-3xl font-bold">500+</div>
                            <div className="text-gray-600">Online Courses</div>
                        </div>
                        <div className="space-y-2">
                            <FontAwesomeIcon icon={faGraduationCap} className="text-4xl text-[#A5158C]" />
                            <div className="text-3xl font-bold">1M+</div>
                            <div className="text-gray-600">Graduates</div>
                        </div>
                        <div className="space-y-2">
                            <FontAwesomeIcon icon={faCertificate} className="text-4xl text-[#A5158C]" />
                            <div className="text-3xl font-bold">300+</div>
                            <div className="text-gray-600">Expert Instructors</div>
                        </div>
                    </div>
                </div>
            </section>

   
        <section className="py-20  relative overflow-hidden">
            <div className="container mx-auto px-4">
                <h2 className="text-4xl font-bold text-center mb-16 text-[#A5158C] relative after:content-[''] after:absolute after:bottom-[-12px] after:left-1/2 after:-translate-x-1/2 after:w-24 after:h-1 after:bg-white">
                    Explore Popular Categories
                    <span className="block mt-2 text-[#F6DC43] text-lg font-medium">Master in-demand skills</span>
                </h2>
                
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 md:px-8 px-2">
                    {[
                        {
                            name: 'Web Development',
                            courses: '120+ Courses',
                            bgImage: img1
                        },
                        {
                            name: 'UI/UX Design',
                            courses: '85+ Courses',
                            bgImage: img2
                        },
                        {
                            name: 'Business',
                            courses: '200+ Courses',
                            bgImage: img3
                        },
                        {
                            name: 'Marketing',
                            courses: '75+ Courses',
                            bgImage: img4
                        },
                        {
                            name: 'AI & Data Science',
                            courses: '90+ Courses',
                            bgImage: img5
                        },
                        {
                            name: 'Photography',
                            courses: '45+ Courses',
                            bgImage: img6
                        },
                        {
                            name: 'Music Production',
                            courses: '30+ Courses',
                            bgImage: img7
                        },
                        {
                            name: 'Personal Growth',
                            courses: '60+ Courses',
                            bgImage: img8
                        },
                    ].map((category) => (
                        <div 
                            key={category.name}
                            className="group relative h-48 rounded-xl overflow-hidden transition-all duration-300 hover:transform hover:scale-105 cursor-pointer"
                            style={{ 
                                backgroundImage: `linear-gradient(to bottom, rgba(65, 4, 69, 0.3), rgba(10, 0, 18, 0.9)), url(${category.bgImage})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center'
                            }}
                        >
                            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-all"></div>
                            
                            <div className="relative z-10 p-6 h-full flex flex-col justify-end">
                                <h3 className="text-xl font-semibold mb-2 text-white">{category.name}</h3>
                                <p className="text-sm text-[#F6DC43]">{category.courses}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>

                    {/* Featured Instructors */}
          <Featuredinstructors/>

            {/* CTA Section */}
            <section className="bg-gradient-to-r from-[#410445] to-[#A5158C] text-white py-16">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold mb-4">Ready to Start Learning?</h2>
                    <p className="text-xl mb-8">Join thousands of students already learning on our platform</p>
                    <button className="bg-[#F6DC43] text-[#410445] px-8 py-3 rounded-full font-semibold hover:bg-[#FF2DF1] hover:text-white transition-colors">
                        Get Started Now
                    </button>
                </div>
            </section>

          {/* About Us Section */}
<section className="py-20 bg-gradient-to-b from-white to-[#410445]/5 ">
    <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-16 relative after:content-[''] after:absolute after:bottom-[-12px] after:left-1/2 after:-translate-x-1/2 after:w-24 after:h-1 after:bg-[#410445]">
            About Us
        </h2>
        <div className="grid md:grid-cols-2 gap-16 items-center px-4">
            <div className="space-y-6 relative">
                <div className="absolute -top-8 -left-8 w-24 h-24 bg-[#A5158C]/10 rounded-full z-0"></div>
                <h3 className="text-3xl font-bold text-[#410445] relative z-10">
                    Empowering Future Leaders Through Innovation
                </h3>
                <p className="text-gray-700 leading-relaxed text-lg">
                    At the heart of our mission is a commitment to democratizing education. We connect 500,000+ learners worldwide with industry experts from top-tier organizations, fostering a dynamic ecosystem of knowledge exchange.
                </p>
                <ul className="grid grid-cols-2 gap-4">
                    <li className="flex items-center space-x-2 text-[#410445]">
                        <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/>
                        </svg>
                        <span>200+ Expert Instructors</span>
                    </li>
                    <li className="flex items-center space-x-2 text-[#410445]">
                        <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/>
                        </svg>
                        <span>85% Career Advancement</span>
                    </li>
                </ul>
                <button className="mt-6 px-8 py-3 bg-[#410445] text-white rounded-full hover:bg-[#A5158C] transition-all transform hover:scale-105">
                    Meet Our Team
                </button>
            </div>
            <div className="space-y-8 relative">
                <div className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300">
                    <div className="grid grid-cols-1 gap-6">
                        <div className="p-6 bg-[#410445]/5 rounded-xl">
                            <div className="flex items-center space-x-4">
                                <div className="p-3 bg-[#410445] rounded-lg">
                                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                                    </svg>
                                </div>
                                <div>
                                    <h4 className="text-xl font-bold text-[#410445]">Our Mission</h4>
                                    <p className="text-gray-600 mt-1">Democratizing quality education through technology</p>
                                </div>
                            </div>
                        </div>
                        <div className="p-6 bg-[#A5158C]/5 rounded-xl">
                            <div className="flex items-center space-x-4">
                                <div className="p-3 bg-[#A5158C] rounded-lg">
                                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
                                    </svg>
                                </div>
                                <div>
                                    <h4 className="text-xl font-bold text-[#A5158C]">Our Vision</h4>
                                    <p className="text-gray-600 mt-1">Global learning community without boundaries</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

{/* Contact Us Section */}
<section className="py-20 bg-[#410445] relative overflow-hidden">
    <div className="absolute -top-32 -right-32 w-64 h-64 bg-[#A5158C]/20 rounded-full"></div>
    <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-[#A5158C]/20 rounded-full"></div>
    
    <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-16 text-white relative after:content-[''] after:absolute after:bottom-[-12px] after:left-1/2 after:-translate-x-1/2 after:w-24 after:h-1 after:bg-white">
            Contact Us
        </h2>
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
            <div className="space-y-8 text-white">
                <div>
                    <h3 className="text-2xl font-bold mb-4">Get in Touch</h3>
                    <p className="text-gray-200 leading-relaxed">
                        Have questions or need support? Our team is here to help you succeed. Reach out for course guidance, technical assistance, or partnership opportunities.
                    </p>
                </div>
                <div className="space-y-6">
                    <div className="flex items-center space-x-4">
                        <div className="p-3 bg-white/10 rounded-lg">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                            </svg>
                        </div>
                        <div>
                            <p className="font-semibold">+1 (555) 123-4567</p>
                            <p className="text-gray-200 text-sm">Mon-Fri, 9am-5pm EST</p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-4">
                        <div className="p-3 bg-white/10 rounded-lg">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                            </svg>
                        </div>
                        <div>
                            <p className="font-semibold">support@eduguide.com</p>
                            <p className="text-gray-200 text-sm">24/7 Support Center</p>
                        </div>
                    </div>
                </div>
                <div className="pt-8 border-t border-white/20">
                    <h4 className="text-lg font-bold mb-4">Follow Us</h4>
                    <div className="flex space-x-4">
                        <a href="#" className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors">
                            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                            </svg>
                        </a>
                        {/* Add other social icons */}
                    </div>
                </div>
            </div>
            <div className="bg-white rounded-2xl shadow-2xl p-8">
                <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="relative">
                            <input 
                                type="text" 
                                id="name"
                                className="peer pt-8 pb-2 px-4 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#410445]"
                                placeholder=" "
                            />
                            <label 
                                htmlFor="name" 
                                className="absolute left-4 top-2 text-sm text-gray-500 peer-placeholder-shown:top-4 peer-focus:top-2 peer-focus:text-sm transition-all"
                            >
                                Full Name
                            </label>
                        </div>
                        <div className="relative">
                            <input 
                                type="email" 
                                id="email"
                                className="peer pt-8 pb-2 px-4 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#410445]"
                                placeholder=" "
                            />
                            <label 
                                htmlFor="email" 
                                className="absolute left-4 top-2 text-sm text-gray-500 peer-placeholder-shown:top-4 peer-focus:top-2 peer-focus:text-sm transition-all"
                            >
                                Email Address
                            </label>
                        </div>
                    </div>
                    <div className="relative">
                        <textarea 
                            id="message"
                            rows="4"
                            className="peer pt-8 pb-2 px-4 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#410445]"
                            placeholder=" "
                        ></textarea>
                        <label 
                            htmlFor="message" 
                            className="absolute left-4 top-2 text-sm text-gray-500 peer-placeholder-shown:top-4 peer-focus:top-2 peer-focus:text-sm transition-all"
                        >
                            Your Message
                        </label>
                    </div>
                    <button 
                        type="submit"
                        className="w-full bg-[#410445] text-white px-8 py-4 rounded-lg hover:bg-[#A5158C] transition-all transform hover:scale-[1.02]"
                    >
                        Send Message
                        <svg className="w-5 h-5 inline-block ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/>
                        </svg>
                    </button>
                </form>
            </div>
        </div>
    </div>
</section>
        </div>
    )
}

export default Home;