import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const SingleCourse = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isEditing, setIsEditing] = useState(false);
  const [course, setCourse] = useState(null);
  const [editedCourse, setEditedCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [newVideo, setNewVideo] = useState({ title: '', file: null });
  const [sections, setSections] = useState([]);
  const [newSection, setNewSection] = useState({ title: '', videos: [] });
  const [selectedSection, setSelectedSection] = useState(null);

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/v1/course/${id}`
        );
        if (!response.ok) throw new Error("Failed to fetch course");
        const data = await response.json();
        setCourse(data.course);
        setEditedCourse(data.course);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching course:", error);
        setLoading(false);
      }
    };

    fetchCourseDetails();
  }, [id]);

  const handleUpdate = () => {
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      navigate(-1);
    }
  };

  const handleVideoUpload = (e) => {
    setNewVideo({ ...newVideo, file: e.target.files[0] });
  };

  const handleAddSection = () => {
    if (newSection.title.trim()) {
      setSections([...sections, { ...newSection, id: Date.now() }]);
      setNewSection({ title: '', videos: [] });
    }
  };

  const handleVideoSubmit = async () => {
    if (!selectedSection || !newVideo.title || !newVideo.file) {
      alert('Please select a section and provide video details');
      return;
    }

    // Here you would typically upload the video file to your server
    const updatedSections = sections.map(section => {
      if (section.id === selectedSection) {
        return {
          ...section,
          videos: [...section.videos, { ...newVideo, id: Date.now() }]
        };
      }
      return section;
    });

    setSections(updatedSections);
    setNewVideo({ title: '', file: null });
  };

  const handleDeleteVideo = (sectionId, videoId) => {
    const updatedSections = sections.map(section => {
      if (section.id === sectionId) {
        return {
          ...section,
          videos: section.videos.filter(video => video.id !== videoId)
        };
      }
      return section;
    });
    setSections(updatedSections);
  };

  if (loading)
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        Loading...
      </div>
    );
  if (!course)
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        Course not found
      </div>
    );

  return (
    <div className="bg-gray-50 px-2">
      <div className="min-h-screen mx-auto bg-white rounded-xl shadow-md overflow-hidden p-4">
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={() => navigate(-1)}
            className="text-[#410445] hover:text-[#402841]"
          >
            ← Back
          </button>
          <div className="space-x-4">
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="text-[#410445] border border-[#410445]  px-3 py-2 text-sm rounded-lg "
            >
              {isEditing ? (
                <i className="fa-solid fa-xmark"></i>
              ) : (
                <i className="fa-solid fa-edit"></i>
              )}
            </button>
            <button
              onClick={handleDelete}
              className="border-red-800 border  text-red-800 px-3 py-2 text-sm rounded-lg "
            >
              <i className="fa-solid fa-trash"></i>
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <img
              src={course.thumbnail}
              alt={course.title}
              className="w-full h-64 object-cover rounded-lg mb-6"
            />

            {!isEditing && (
              <div className="space-y-4">
                <h3 className="text-3xl font-bold text-gray-800">{course.title}</h3>
                <p className="text-gray-600">{course.subTitle}</p>
                <p className="text-2xl text-[#410445] font-bold">${course.price}</p>
                
                <div className="grid grid-cols-2 gap-4 text-gray-600">
                  <div><i className="fas fa-signal mr-2"></i>Level: {course?.level || 'N/A'}</div>
                  <div><i className="fas fa-users mr-2"></i>Students: {course?.purchaseCount || 0}</div>
                  <div><i className="fas fa-video mr-2"></i>Videos: {course?.totalVideos || 0}</div>
                  <div><i className="fas fa-clock mr-2"></i>Duration: {course?.totalDuration || 0}</div>
                </div>

                {course?.learningPoints?.length > 0 && (
                  <div className="mt-6">
                    <h3 className="font-bold text-lg">Learning Points:</h3>
                    <ul className="list-disc pl-5">
                      {course.learningPoints.map((point, index) => (
                        <li key={index} className="text-gray-600">{point}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {course?.requirements?.length > 0 && (
                  <div className="mt-6">
                    <h3 className="font-bold text-lg">Requirements:</h3>
                    <ul className="list-disc pl-5">
                      {course.requirements.map((req, index) => (
                        <li key={index} className="text-gray-600">{req}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {course?.description && (
                  <div className="mt-6">
                    <h3 className="font-bold text-lg">Description:</h3>
                    <p className="text-gray-600 whitespace-pre-line">{course.description}</p>
                  </div>
                )}
              </div>
            )}

            {isEditing && (
              <div className="space-y-4">
                <input
                  type="text"
                  value={editedCourse.title}
                  onChange={(e) =>
                    setEditedCourse({ ...editedCourse, title: e.target.value })
                  }
                  className="w-full p-2 border rounded-lg"
                />
                {course.type === "paid" && (
                  <input
                    type="number"
                    value={editedCourse.price}
                    onChange={(e) =>
                      setEditedCourse({ ...editedCourse, price: e.target.value })
                    }
                    className="w-full p-2 border rounded-lg"
                  />
                )}
                <div className="flex gap-4">
                  <input
                    type="text"
                    value={editedCourse.duration}
                    onChange={(e) =>
                      setEditedCourse({
                        ...editedCourse,
                        duration: e.target.value,
                      })
                    }
                    className="flex-1 p-2 border rounded-lg"
                  />
                  <select
                    value={editedCourse.level}
                    onChange={(e) =>
                      setEditedCourse({ ...editedCourse, level: e.target.value })
                    }
                    className="flex-1 p-2 border rounded-lg"
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </div>
                <button
                  onClick={handleUpdate}
                  className="w-full bg-[#410445] text-white py-2 rounded-lg hover:bg-[#402841]"
                >
                  Save Changes
                </button>
              </div>
            )}
          </div>

          <div className="px-4">
            <h2 className="text-2xl font-bold mb-4">Course Sections</h2>
            <div className="space-y-4">
              {/* Add New Section */}
              <div className="border p-4 rounded-lg bg-white">
                <h3 className="font-bold mb-2">Add New Section</h3>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Section Title"
                    value={newSection.title}
                    onChange={(e) => setNewSection({ ...newSection, title: e.target.value })}
                    className="flex-1 p-2 border rounded-lg"
                  />
                  <button
                    onClick={handleAddSection}
                    className="bg-[#410445] text-white px-4 py-2 rounded-lg hover:bg-[#402841]"
                  >
                    Add Section
                  </button>
                </div>
              </div>

              {/* Add New Video */}
              <div className="border p-4 rounded-lg bg-white">
                <h3 className="font-bold mb-2">Add New Video</h3>
                <select
                  value={selectedSection || ''}
                  onChange={(e) => setSelectedSection(e.target.value)}
                  className="w-full p-2 border rounded-lg mb-2"
                >
                  <option value="">Select Section</option>
                  {sections.map(section => (
                    <option key={section.id} value={section.id}>
                      {section.title}
                    </option>
                  ))}
                </select>
                <input
                  type="text"
                  placeholder="Video Title"
                  value={newVideo.title}
                  onChange={(e) => setNewVideo({ ...newVideo, title: e.target.value })}
                  className="w-full p-2 border rounded-lg mb-2"
                />
                <input
                  type="file"
                  accept="video/*"
                  onChange={handleVideoUpload}
                  className="w-full p-2 border rounded-lg mb-2"
                />
                <button
                  onClick={handleVideoSubmit}
                  className="w-full bg-[#410445] text-white py-2 rounded-lg hover:bg-[#402841]"
                >
                  Upload Video
                </button>
              </div>

              {/* Display Sections and Videos */}
              <div className="space-y-4">
                {sections.map((section) => (
                  <div key={section.id} className="border p-4 rounded-lg bg-white">
                    <h3 className="font-bold mb-2">{section.title}</h3>
                    <div className="space-y-2 pl-4">
                      {section.videos.map((video) => (
                        <div key={video.id} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                          <span>{video.title}</span>
                          <button
                            onClick={() => handleDeleteVideo(section.id, video.id)}
                            className="text-red-600"
                          >
                            <i className="fa-solid fa-trash"></i>
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleCourse;
