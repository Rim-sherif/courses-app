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
    { name: "React Basics", image: img1 },
    { name: "Node.js Mastery", image: img2 },
    { name: "Full Stack Guide", image: img3 },
  ],
  "UI Design": [
    { name: "Figma Essentials", image: img4 },
    { name: "Adobe XD Advanced", image: img5 },
    { name: "UI/UX Best Practices", image: img6 },
  ],
  "Photography": [
    { name: "DSLR Fundamentals", image: img7 },
    { name: "Portrait Photography", image: img8 },
    { name: "Video Editing", image: img9 },
  ],
};

export default function CoursesPage() {
  const [selectedCategory, setSelectedCategory] = useState("Web Development");

  return (
    <div className="flex min-h-screen text-white">
      <div className="w-1/5 p-6 border-r bg-purple-900 border-gray-700">
        <h2 className="text-xl font-bold mb-4">Categories</h2>
        <ul>
          {Object.keys(coursesData).map((category) => (
            <li
              key={category}
              className={`p-2 mb-1 cursor-pointer rounded-lg transition-all ${
                selectedCategory === category
                  ? "bg-yellow-500 text-purple-900 opacity-90"
                  : "hover:bg-yellow-400 hover:text-purple-900 hover:opacity-80"
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </li>
          ))}
        </ul>
      </div>

      <div className="w-3/4 p-6">
        <h2 className="text-2xl font-bold mb-4 text-purple-900">{selectedCategory} Courses</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {coursesData[selectedCategory].map((course) => (
            <div
              key={course.name}
              className="bg-white text-purple-900 p-4 rounded-lg shadow-lg flex flex-col items-center cursor-pointer duration-300 hover:transform hover:scale-105"
            >
              <img src={course.image} alt={course.name} className="w-full h-40 object-cover rounded-lg mb-2" />
              <p className="text-lg font-semibold">{course.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
