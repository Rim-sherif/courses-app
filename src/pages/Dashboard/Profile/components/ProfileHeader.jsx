import { faPencilAlt, faSave, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ImageUpload from './ImageUpload';

const ProfileHeader = ({ values, errors, touched, isEditing, handleChange, handleBlur, setIsEditing, isSubmitting }) => {
return (
    <div className="bg-white rounded-xl shadow-lg p-8 flex flex-col md:flex-row gap-8 relative transition-all duration-200 hover:shadow-xl">
    <div className="flex-shrink-0">
        <ImageUpload 
            image={values.avatar} 
            className="w-32 h-32 border-4 border-[#f8f9fa] hover:border-[#e9ecef] rounded-full transition-all"
            onImageUpdate={(newImage) => handleChange({ 
                target: { name: 'avatar', value: newImage }
            })}
        />
    </div>

    <div className="flex-1 space-y-6">
        {isEditing ? (
            <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">First Name</label>
                        <input
                            name="firstName"
                            value={values.firstName}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={`form-input w-full rounded-md px-2 py-1 border-gray-300 focus:ring-1 focus:ring-[#410445] focus:border-[#410445] ${
                                errors.firstName && touched.firstName ? 'border-red-500 ring-red-100' : ''
                            }`}
                            placeholder="John"
                        />
                        {errors.firstName && touched.firstName && (
                            <div className="text-red-600 text-sm mt-1">{errors.firstName}</div>
                        )}
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Last Name</label>
                        <input
                            name="lastName"
                            value={values.lastName}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={`form-input w-full rounded-md px-2 py-1 border-gray-300 focus:ring-1 focus:ring-[#410445] focus:border-[#410445] ${
                                errors.lastName && touched.lastName ? 'border-red-500 ring-red-100' : ''
                            }`}
                            placeholder="Doe"
                        />
                        {errors.lastName && touched.lastName && (
                            <div className="text-red-600 text-sm mt-1">{errors.lastName}</div>
                        )}
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Job Title</label>
                    <input
                        name="jobTitle"
                        value={values?.jobTitle}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`form-input w-full rounded-md px-2 py-1 border-gray-300 focus:ring-1 focus:ring-[#410445] focus:border-[#410445] ${
                            errors.jobTitle && touched.jobTitle ? 'border-red-500 ring-red-100' : ''
                        }`}
                        placeholder="Senior Instructor"
                    />
                    {errors.jobTitle && touched.jobTitle && (
                        <div className="text-red-600 text-sm mt-1">{errors.jobTitle}</div>
                    )}
                </div>
            </div>
        ) : (
            <div className="space-y-2">
                <h2 className="text-2xl font-bold text-gray-900">{`${values.firstName} ${values.lastName}`}</h2>
                <p className="text-lg text-gray-600 font-medium">{values.jobTitle || ""}</p>
            </div>
        )}
    </div>

    <div className="absolute top-6 right-6">
        {!isEditing ? (
            <button
                type="button"
                onClick={() => setIsEditing(true)}
                className="bg-[#410445] text-white text-sm px-5 py-2.5 rounded-lg hover:bg-[#623964] flex items-center gap-2 transition-colors"
            >
                <FontAwesomeIcon icon={faPencilAlt} className="w-4 h-4" />
                Edit Profile
            </button>
        ) : (
            <div className="flex gap-3">
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className=" text-[#410445]  flex items-center gap-2 transition-colors disabled:opacity-70"
                >
                    <FontAwesomeIcon icon={faSave} className="w-4 h-4" />
                 
                </button>
                <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className=" text-gray-700  flex items-center gap-2 transition-colors "
                >
                    <FontAwesomeIcon icon={faTimes} className="w-4 h-4" />
              
                </button>
            </div>
        )}
    </div>
</div>
);
};

export default ProfileHeader;
