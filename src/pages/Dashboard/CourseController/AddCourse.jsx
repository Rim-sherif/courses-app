import axios from "axios";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { courseSchema } from "../../../schemas/courseSchema";

const AddCourse = () => {
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [categories, setCategories] = useState([]);

  const initialValues = {
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
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/v1/category/all"
        );
        if (response.data.success) {
          setCategories(response.data.courses);
        }
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };
    fetchCategories();
  }, []);

  const handleSubmit = async (values, { resetForm, setSubmitting }) => {
    setError(null);
    setSuccess(false);

    const formData = new FormData();
    Object.keys(values).forEach((key) => {
      if (key === "requirements" || key === "learningPoints") {
        values[key].forEach((item) => {
          formData.append(`${key}[]`, item);
        });
      } else if (key === "image") {
        if (values.image) {
          formData.append("thumbnail", values.image);
        }
      } else {
        formData.append(key, values[key]);
      }
    });

    try {
      const response = await axios.post(
        `http://localhost:5000/api/v1/course/add`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.success) {
        setSuccess(true);
        resetForm();
      }
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  const handleRequirementKeyDown = (e, form) => {
    if (e.key === "Enter" && e.target.value.trim()) {
      e.preventDefault();
      const newRequirement = e.target.value.trim();
      form.setFieldValue("requirements", [
        ...form.values.requirements,
        newRequirement,
      ]);
      e.target.value = "";
    }
  };

  const handleLearningPointKeyDown = (e, form) => {
    if (e.key === "Enter" && e.target.value.trim()) {
      e.preventDefault();
      const newPoint = e.target.value.trim();
      form.setFieldValue("learningPoints", [
        ...form.values.learningPoints,
        newPoint,
      ]);
      e.target.value = "";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-2">
      <div className="mx-auto bg-white rounded-xl shadow-md overflow-hidden p-5">
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

        <Formik
          initialValues={initialValues}
          validationSchema={courseSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, setFieldValue, values }) => (
            <Form className="space-y-6">
              <div className="flex gap-4">
                <div className="w-full space-y-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Course Title
                    </label>
                    <Field
                      type="text"
                      name="title"
                      className="w-full px-4 py-2 border border-[#410445] rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      placeholder="Enter course title"
                    />
                    <ErrorMessage
                      name="title"
                      component="p"
                      className="text-red-500 text-xs mt-1"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Subtitle
                    </label>
                    <Field
                      type="text"
                      name="subTitle"
                      className="w-full px-4 py-2 border border-[#410445] rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      placeholder="Enter course subtitle"
                    />
                    <ErrorMessage
                      name="subTitle"
                      component="p"
                      className="text-red-500 text-xs mt-1"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description
                    </label>
                    <Field
                      as="textarea"
                      name="description"
                      className="w-full px-4 py-2 border border-[#410445] rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      rows="4"
                      placeholder="Describe the course content"
                    />
                    <ErrorMessage
                      name="description"
                      component="p"
                      className="text-red-500 text-xs mt-1"
                    />
                  </div>
                </div>
                <div className="w-full h-fit space-y-2 ">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Course Image
                    </label>
                    <div className="mt-1 flex justify-center items-center px-6 pt-5 pb-6 border-2 border-[#410445] border-dashed rounded-xl">
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
                              onChange={(e) =>
                                setFieldValue("image", e.target.files[0])
                              }
                              className="sr-only"
                            />
                          </label>
                          <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs text-gray-500">
                          PNG, JPG up to 2MB
                        </p>
                        {values.image && (
                          <p className="text-sm text-gray-900 mt-2">
                            {values.image.name}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Price ($)
                      </label>
                      <Field
                        type="number"
                        name="price"
                        min={0}
                        className="w-full px-4 py-2 border border-[#410445] rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                        placeholder="0.00"
                      />
                      <ErrorMessage
                        name="price"
                        component="p"
                        className="text-red-500 text-xs mt-1"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Access Type
                      </label>
                      <Field
                        as="select"
                        name="access_type"
                        className="w-full px-4 py-2 border border-[#410445] rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all appearance-none"
                      >
                        <option value="free">Free</option>
                        <option value="paid">Paid</option>
                        {/* <option value="prime">Prime</option> */}
                      </Field>
                      <ErrorMessage
                        name="access_type"
                        component="p"
                        className="text-red-500 text-xs mt-1"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Skill Level
                  </label>
                  <Field
                    as="select"
                    name="level"
                    className="w-full px-4 py-2 border border-[#410445] rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all appearance-none"
                  >
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                  </Field>
                  <ErrorMessage
                    name="level"
                    component="p"
                    className="text-red-500 text-xs mt-1"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category
                  </label>
                  <Field
                    as="select"
                    name="categoryId"
                    className="w-full px-4 py-2 border border-[#410445] rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all appearance-none"
                  >
                    <option value="">Select a category</option>
                    {categories.map((category) => (
                      <option key={category._id} value={category._id}>
                        {category.title}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage
                    name="categoryId"
                    component="p"
                    className="text-red-500 text-xs mt-1"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Requirements
                </label>
                <textarea
                  onKeyDown={(e) =>
                    handleRequirementKeyDown(e, { setFieldValue, values })
                  }
                  className="w-full px-4 py-2 border border-[#410445] rounded-lg"
                  placeholder="Type requirement and press Enter"
                />
                <ErrorMessage
                  name="requirements"
                  component="p"
                  className="text-red-500 text-xs mt-1"
                />
                <ul className="list-disc pl-5 mt-2">
                  {values.requirements.map((req, index) => (
                    <li
                      key={index}
                      className="text-sm text-gray-600 flex justify-between items-center"
                    >
                      <span>{req}</span>
                      <button
                        type="button"
                        onClick={() => {
                          const newReqs = values.requirements.filter(
                            (_, i) => i !== index
                          );
                          setFieldValue("requirements", newReqs);
                        }}
                        className="text-red-500 hover:text-red-700 ml-2"
                      >
                        ×
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Learning Points
                </label>
                <textarea
                  onKeyDown={(e) =>
                    handleLearningPointKeyDown(e, { setFieldValue, values })
                  }
                  className="w-full px-4 py-2 border border-[#410445] rounded-lg"
                  placeholder="Type learning point and press Enter"
                />
                <ErrorMessage
                  name="learningPoints"
                  component="p"
                  className="text-red-500 text-xs mt-1"
                />
                <ul className="list-disc pl-5 mt-2">
                  {values.learningPoints.map((point, index) => (
                    <li
                      key={index}
                      className="text-sm text-gray-600 flex justify-between items-center"
                    >
                      <i className="fa-solid fa-dot"></i>
                      <span>{point}</span>
                      <button
                        type="button"
                        onClick={() => {
                          const newPoints = values.learningPoints.filter(
                            (_, i) => i !== index
                          );
                          setFieldValue("learningPoints", newPoints);
                        }}
                        className="text-red-500 hover:text-red-700 ml-2"
                      >
                        ×
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#410445] hover:bg-[#402841] text-white py-3 px-4 rounded-lg shadow-md disabled:opacity-50"
              >
                {isSubmitting ? "Creating Course..." : "Publish Course"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AddCourse;
