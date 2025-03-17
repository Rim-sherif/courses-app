import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const InstructorDetails = () => {
  const { id } = useParams();
  const [instructor, setInstructor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchInstructor = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/v1/user/${id}`
        );

        if (data.success) {
          setInstructor(data.instructor);
          setError("");
        } else {
          setError("Failed to fetch instructor details.");
        }
      } catch (err) {
        setError("Error fetching instructor data.");
      } finally {
        setLoading(false);
      }
    };

    fetchInstructor();
  }, [id]);

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (error) return <div className="text-center text-red-500 mt-10">{error}</div>;
  if (!instructor) return <div className="text-center mt-10">Instructor not found.</div>;

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="flex items-center space-x-6 bg-white shadow-lg p-6 rounded-lg">
        <img
          src={instructor.avatar}
          alt={instructor.firstName}
          className="w-24 h-24 rounded-full object-cover"
        />
        <div>
          <h1 className="text-2xl font-bold">{`${instructor.firstName} ${instructor.lastName}`}</h1>
          <p className="text-gray-600">{instructor.role}</p>
          <p className="text-gray-500 text-sm mt-1">
            Joined: {new Date(instructor.createdAt).toDateString()}
          </p>
        </div>
      </div>

      <h2 className="text-xl font-semibold mt-6">
        Courses by {instructor.firstName}
      </h2>
      <div className="grid md:grid-cols-2 gap-6 mt-4">
        {instructor.courses.length > 0 ? (
          instructor.courses.map((course) => (
            <div key={course._id} className="bg-white shadow-md rounded-lg overflow-hidden cursor-pointer">
              <img src={course.thumbnail} alt={course.title} className="w-full h-40 object-cover" />
              <div className="p-4">
                <h3 className="text-lg font-semibold">{course.title}</h3>
                <p className="text-gray-600 text-sm mt-1">{course.description}</p>
                <p className="text-blue-600 font-bold mt-2">${course.price}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 mt-4">No courses available.</p>
        )}
      </div>
    </div>
  );
};

export default InstructorDetails;
