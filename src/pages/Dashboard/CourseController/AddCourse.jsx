import axios from "axios";
import React, { useEffect, useState } from "react";

const AddCourse = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [categories, setCategories] = useState([]);

  const [courseData, setCourseData] = useState({
    title: "",
    description: "",
    price: "",
    level: "beginner",
    categoryId: "",
    subTitle: "",
    requirements: [],
    learningPoints: [],
    access_type: "paid",
    image: null,
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/v1/category/all');
        if (response.data.success) {
          setCategories(response.data.courses);
        }
      } catch (err) {
        console.error('Error fetching categories:', err);
      }
    };
    fetchCategories();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCourseData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setCourseData((prev) => ({
      ...prev,
      image: file,
    }));
  };

  const handleRequirementKeyDown = (e) => {
    if (e.key === 'Enter' && e.target.value.trim()) {
      e.preventDefault();
      const newRequirement = e.target.value.trim();
      setCourseData(prev => ({
        ...prev,
        requirements: [...prev.requirements, newRequirement]
      }));
      e.target.value = '';
    }
  };

  const handleLearningPointKeyDown = (e) => {
    if (e.key === 'Enter' && e.target.value.trim()) {
      e.preventDefault();
      const newPoint = e.target.value.trim();
      setCourseData(prev => ({
        ...prev,
        learningPoints: [...prev.learningPoints, newPoint]
      }));
      e.target.value = '';
    }
  };

  const handleRemoveRequirement = (index) => {
    setCourseData(prev => ({
      ...prev,
      requirements: prev.requirements.filter((_, i) => i !== index)
    }));
  };

  const handleRemoveLearningPoint = (index) => {
    setCourseData(prev => ({
      ...prev,
      learningPoints: prev.learningPoints.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    if (courseData.requirements.length === 0) {
      setError('Please add at least one requirement');
      setLoading(false);
      return;
    }

    if (courseData.learningPoints.length === 0) {
      setError('Please add at least one learning point');
      setLoading(false);
      return;
    }

    const formData = new FormData();
Object.keys(courseData).forEach(key => {
  if (key === 'requirements' || key === 'learningPoints') {
    
    courseData[key].forEach(item => {
      formData.append(`${key}[]`, item);
    });
  } else if (key === 'image') {
    if (courseData.image) {
      formData.append('ur', courseData.image);
    }
  } else {
    formData.append(key, courseData[key]);
  }
});

    try {
      const response = await axios.post(`http://localhost:5000/api/v1/course/add`, formData, { 
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      console.log(formData)

      if (response.data.success) {
        setSuccess(true);
        setCourseData({
          title: "",
          description: "",
          price: "",
          level: "beginner",
          categoryId: "",
          subTitle: "",
          requirements: [],
          learningPoints: [],
          access_type: "paid",
          image: null,
        });
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-2 px-3">
      <div className="mx-auto bg-white rounded-xl shadow-md overflow-hidden p-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-8">
          Create New Course
        </h3>
        {error && (
          <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg">
            {error}
          </div>
        )}
        {success && (
          <div className="mb-4 p-4 bg-green-100 text-green-700 rounded-lg">
            Course created successfully!
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Course Title
            </label>
            <input
              type="text"
              name="title"
              value={courseData.title}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              placeholder="Enter course title"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={courseData.description}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              rows="4"
              placeholder="Describe the course content"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Subtitle
            </label>
            <input
              type="text"
              name="subTitle"
              value={courseData.subTitle}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              placeholder="Enter course subtitle"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Requirements
            </label>
            <div className="space-y-2">
              <textarea
                name="requirements"
                onKeyDown={handleRequirementKeyDown}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                placeholder="Type requirement and press Enter"
                rows="2"
              />
              <ul className="list-disc pl-5">
                {courseData.requirements.map((req, index) => (
                  <li key={index} className="text-sm text-gray-600 flex justify-between items-center">
                    <span>{req}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveRequirement(index)}
                      className="text-red-500 hover:text-red-700 ml-2"
                    >
                      ×
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Learning Points
            </label>
            <div className="space-y-2">
              <textarea
                name="learningPoints"
                onKeyDown={handleLearningPointKeyDown}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                placeholder="Type learning point and press Enter"
                rows="2"
              />
              <ul className="list-disc pl-5">
                {courseData.learningPoints.map((point, index) => (
                  <li key={index} className="text-sm text-gray-600 flex justify-between items-center">
                    <span>{point}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveLearningPoint(index)}
                      className="text-red-500 hover:text-red-700 ml-2"
                    >
                      ×
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Price ($)
              </label>
              <input
                type="number"
                name="price"
                value={courseData.price}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                placeholder="0.00"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Access Type
              </label>
              <select
                name="access_type"
                value={courseData.access_type}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all appearance-none"
                required
              >
                <option value="free">Free</option>
                <option value="paid">Paid</option>
                <option value="prime">Prime</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Skill Level
              </label>
              <select
                name="level"
                value={courseData.level}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all appearance-none"
              >
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <select
                name="categoryId"
                value={courseData.categoryId}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all appearance-none"
                required
              >
                <option value="">Select a category</option>
                {categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.title}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Course Image
            </label>
            <div className="mt-1 flex justify-center items-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-xl">
              <div className="space-y-1 text-center">
                <svg
                  className="mx-auto h-12 w-12 text-gray-400"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 48 48"
                  aria-hidden="true"
                >
                  <path
                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <div className="flex text-sm text-gray-600">
                  <label
                    htmlFor="file-upload"
                    className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                  >
                    <span>Upload a file</span>
                    <input
                      id="file-upload"
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="sr-only"
                    />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-500">PNG, JPG up to 2MB</p>
                {courseData.image && (
                  <p className="text-sm text-gray-900 mt-2">
                    {courseData.image.name}
                  </p>
                )}
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-[#410445] hover:bg-[#402841] text-white py-3 px-4 rounded-lg shadow-md disabled:opacity-50"
            disabled={loading}
          >
            {loading ? 'Creating Course...' : 'Publish Course'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCourse;
