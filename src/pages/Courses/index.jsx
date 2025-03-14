import { useState } from "react";
import img1 from '../../assets/images/react-basics.webp'
import img2 from '../../assets/images/nodejs-mastery.webp'
import img3 from '../../assets/images/fullstack.webp'
import img4 from '../../assets/images/figma.webp'
import img5 from '../../assets/images/xd.png'
import img6 from '../../assets/images/ui-ux.webp'
import img7 from '../../assets/images/camera-basics.webp'
import img8 from '../../assets/images/portrait.png'
import img9 from '../../assets/images/video-editing.png'

const coursesData = {
  "Web Development": [
    { 
      name: "React Basics", 
      image: img1,
      description: "Master the fundamentals of React development",
      duration: "6 hours",
      level: "Beginner"
    },
    { 
      name: "Node.js Mastery", 
      image: img2,
      description: "Become a Node.js backend expert",
      duration: "8 hours",
      level: "Intermediate"
    },
    { 
      name: "Full Stack Guide", 
      image: img3,
      description: "Complete full stack development course",
      duration: "10 hours",
      level: "Advanced"
    },
  ],
  "UI Design": [
    { 
      name: "Figma Essentials", 
      image: img4,
      description: "Learn professional UI design with Figma",
      duration: "5 hours",
      level: "Beginner"
    },
    { 
      name: "Adobe XD Advanced", 
      image: img5,
      description: "Advanced prototyping techniques in XD",
      duration: "7 hours",
      level: "Intermediate"
    },
    { 
      name: "UI/UX Best Practices", 
      image: img6,
      description: "Industry-standard UI/UX principles",
      duration: "6 hours",
      level: "Intermediate"
    },
  ],
  "Photography": [
    { 
      name: "DSLR Fundamentals", 
      image: img7,
      description: "Master your DSLR camera settings",
      duration: "4 hours",
      level: "Beginner"
    },
    { 
      name: "Portrait Photography", 
      image: img8,
      description: "Professional portrait techniques",
      duration: "5 hours",
      level: "Intermediate"
    },
    { 
      name: "Video Editing", 
      image: img9,
      description: "From shooting to final edits",
      duration: "9 hours",
      level: "Beginner"
    },
  ],
};

const CourseCard = ({ course }) => (
  <article className="bg-white text-purple-900 p-4 rounded-lg shadow-lg flex flex-col items-center transition-transform duration-300 hover:scale-105 focus-within:scale-105">
    <img 
      src={course.image} 
      alt={course.name} 
      className="w-full h-40 object-cover rounded-lg mb-2"
      loading="lazy"
      decoding="async"
    />
    <h3 className="text-lg font-semibold mb-2">{course.name}</h3>
    {course.description && (
      <p className="text-sm text-gray-600 text-center mb-2">{course.description}</p>
    )}
    <div className="flex gap-2 text-sm text-gray-500">
      {course.duration && <span>⏳ {course.duration}</span>}
      {course.level && <span>📈 {course.level}</span>}
    </div>
  </article>
);

const CategoriesSidebar = ({ categories, selectedCategory, onSelectCategory }) => (
  <nav aria-label="Course categories" className="w-full md:w-1/5 p-6 border-r bg-[#2A0B2C] border-gray-700">
    <h2 className="text-xl font-bold mb-4">Categories</h2>
    <ul className="space-y-2">
      {categories.map((category) => (
        <li key={category}>
          <button
            onClick={() => onSelectCategory(category)}
            className={`w-full text-left p-2 rounded-lg transition-colors duration-200 ${
              selectedCategory === category
                ? "bg-yellow-500 text-purple-900 opacity-90"
                : "text-white hover:bg-yellow-400 hover:text-purple-900"
            } focus:outline-none focus:ring-2 focus:ring-yellow-500`}
            aria-current={selectedCategory === category ? "page" : undefined}
          >
            {category}
          </button>
        </li>
      ))}
    </ul>
  </nav>
);

export default function CoursesPage() {
  const [selectedCategory, setSelectedCategory] = useState("Web Development");
  const categories = Object.keys(coursesData);

  return (
    <div className="min-h-screen text-white flex flex-col md:flex-row">
      <CategoriesSidebar
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      <main className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-6 text-purple-900">
          {selectedCategory} Courses
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {coursesData[selectedCategory].map((course) => (
            <CourseCard key={course.name} course={course} />
          ))}
        </div>
      </main>
    </div>
  );
}