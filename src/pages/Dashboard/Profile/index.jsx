import axios from "axios";
import { Formik } from "formik";
import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";
import ContactInformation from "./components/ContactInformation";
import ProfileHeader from "./components/ProfileHeader";
import Statistics from "./components/Statistics";
import { validationSchema } from "./schemas/validationSchema";

const ProfileInstructor = () => {
  const { userData } = useOutletContext();
  const [isEditing, setIsEditing] = useState(false);

  const handleUpdateProfile = async (values, { setSubmitting, setStatus }) => {
    try {
      const response = await axios.put(
        "http://localhost:5000/api/v1/user/instructorData",
        values,
        { withCredentials: true }
      );

      if (response.data.success) {
        setStatus({ success: true });
        setIsEditing(false);
      }
    } catch (error) {
      setStatus({
        success: false,
        error: error.response?.data?.message || "Update failed",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto">
      <Formik
        initialValues={{
          firstName: userData?.firstName || "",
          lastName: userData?.lastName || "",
          jobTitle: userData?.jobTitle || "",
          email: userData?.email || "",
          phone: userData?.phone || "",
          avatar: userData?.avatar || "",
          socialLinks: {
            linkedin: userData?.socialLinks?.linkedin || "",
            github: userData?.socialLinks?.github || "",
            twitter: userData?.socialLinks?.twitter || "",
            facebook: userData?.socialLinks?.facebook || "",
            portfolio: userData?.socialLinks?.portfolio || "",
          },
        }}
        validationSchema={validationSchema}
        onSubmit={handleUpdateProfile}
        enableReinitialize
      >
        {(formikProps) => (
     <form onSubmit={formikProps.handleSubmit}>
     <div className="grid gap-4 md:gap-6  sm:px-0">
       <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6">
         {/* Right Column - First on mobile */}
         <div className="md:col-span-8 space-y-4 md:space-y-6 order-1 md:order-none">
           <ProfileHeader
             {...formikProps}
             isEditing={isEditing}
             setIsEditing={setIsEditing}
           />
           <Statistics
             coursesCount={userData?.coursesCount}
             studentsCount={userData?.studentsCount}
             rating={userData?.rating}
           />
         </div>
   
         {/* Contact Information - Second on mobile */}
         <div className="md:col-span-4 order-2 md:order-none">
           <ContactInformation {...formikProps} isEditing={isEditing} />
         </div>
       </div>
     </div>
   </form>
        )}
      </Formik>
    </div>
  );
};

export default ProfileInstructor;
