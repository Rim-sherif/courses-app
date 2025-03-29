import { faFacebookF, faGithub, faLinkedin, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faGlobe, faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ContactInformation = ({ values, errors, touched, isEditing, handleChange, handleBlur }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-200">
    <div className="border-b border-gray-100 pb-6 mb-6">
      <h2 className="text-2xl font-bold text-gray-900">Contact Information</h2>
      <ul className="mt-6 space-y-6">
        <li className="flex items-start gap-4">
          <div className="p-3 bg-[#f5f3ff] rounded-lg">
            <FontAwesomeIcon 
              icon={faEnvelope} 
              className="text-[#410445] w-5 h-5" 
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
            {isEditing ? (
              <div>
                <input
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`form-input w-full rounded-lg py-2.5 px-4 border-gray-300 focus:ring-2 focus:ring-[#410445] ${
                    errors.email && touched.email ? 'border-red-500 ring-1 ring-red-100' : ''
                  }`}
                  type="email"
                  placeholder="john.doe@example.com"
                />
                {errors.email && touched.email && (
                  <div className="text-red-600 text-sm mt-2">{errors.email}</div>
                )}
              </div>
            ) : (
              <p className="text-gray-900 font-medium">
                {values.email || <span className="text-gray-400 italic">Not provided</span>}
              </p>
            )}
          </div>
        </li>
  
        <li className="flex items-start gap-4">
          <div className="p-3 bg-[#f5f3ff] rounded-lg">
            <FontAwesomeIcon 
              icon={faPhone} 
              className="text-[#410445] w-5 h-5" 
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
            {isEditing ? (
              <div>
                <input
                  name="phone"
                  value={values.phone}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`form-input w-full rounded-lg py-2.5 px-4 border-gray-300 focus:ring-2 focus:ring-[#410445] ${
                    errors.phone && touched.phone ? 'border-red-500 ring-1 ring-red-100' : ''
                  }`}
                  type="tel"
                  placeholder="+1 (555) 000-0000"
                />
                {errors.phone && touched.phone && (
                  <div className="text-red-600 text-sm mt-2">{errors.phone}</div>
                )}
              </div>
            ) : (
              <p className="text-gray-900 font-medium">
                {values.phone || <span className="text-gray-400 italic">Not provided</span>}
              </p>
            )}
          </div>
        </li>
      </ul>
    </div>
  
    <div className="pt-4">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Social Profiles</h2>
      <ul className="space-y-6">
        {[
          { icon: faLinkedin, name: 'LinkedIn', key: 'linkedin' },
          { icon: faGithub, name: 'GitHub', key: 'github' },
          { icon: faTwitter, name: 'Twitter', key: 'twitter' },
          { icon: faFacebookF, name: 'Facebook', key: 'facebook' },
          { icon: faGlobe, name: 'Portfolio', key: 'portfolio' },
        ].map(({ icon, name, key }) => (
          <li key={key} className="flex items-start gap-4">
            <div className="p-3 bg-[#f5f3ff] rounded-lg">
              <FontAwesomeIcon 
                icon={icon} 
                className="text-[#410445] w-5 h-5" 
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">{name}</label>
              {isEditing ? (
                <div>
                  <input
                    name={`socialLinks.${key}`}
                    value={values.socialLinks[key]}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`form-input w-full rounded-lg py-2.5 px-4 border-gray-300 focus:ring-2 focus:ring-[#410445] ${
                      errors.socialLinks?.[key] && touched.socialLinks?.[key] 
                        ? 'border-red-500 ring-1 ring-red-100' : ''
                    }`}
                    type="url"
                    placeholder={`https://${key}.com/username`}
                  />
                  {errors.socialLinks?.[key] && touched.socialLinks?.[key] && (
                    <div className="text-red-600 text-sm mt-2">
                      {errors.socialLinks[key]}
                    </div>
                  )}
                </div>
              ) : (
                <p className="text-gray-900 font-medium break-all">
                  {values.socialLinks[key] || 
                    <span className="text-gray-400 italic">Not provided</span>}
                </p>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  </div>
  );
};

export default ContactInformation;
