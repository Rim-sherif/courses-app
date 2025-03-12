import {
  faFacebookF,
  faLinkedinIn,
  faTwitter,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 border-t-8 border-[#410445] mt-8">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          <div className="lg:col-span-2">
            <div className="flex items-center mb-6">
              <svg
                className="w-8 h-8 text-[#A5158C]"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
              <span className="ml-2 text-2xl font-bold text-white">
                Mentora
              </span>
            </div>
            <p className="text-gray-400 mb-6 text-sm leading-relaxed">
              Transform your future with our world-class learning experiences.
              Join 500,000+ learners in 150+ countries.
            </p>
            <div className="flex space-x-4">
              {[faFacebookF, faTwitter, faLinkedinIn, faYoutube].map(
                (icon, index) => (
                  <a
                    key={index}
                    href="#"
                    className="p-3 bg-gray-800 rounded-full hover:bg-[#410445] transition-colors"
                  >
                    <FontAwesomeIcon
                      icon={icon}
                      className="w-5 h-5 hover:text-white"
                    />
                  </a>
                )
              )}
            </div>
          </div>
          <div>
            <h3 className="text-white text-lg font-semibold mb-6 relative before:absolute before:-left-4 before:top-1/2 before:w-1 before:h-6 before:bg-[#A5158C] before:-translate-y-1/2">
              Explore
            </h3>
            <ul className="space-y-3">
              {["About Us", "Contact", "Careers", "Blog"].map((link, index) => (
                <li key={index}>
                  <NavLink
                    to={`/${link.toLowerCase().replace(" ", "-")}`}
                    className="text-gray-400 hover:text-white transition-colors text-sm flex items-center group"
                  >
                    <span className="w-2 h-2 bg-[#410445] rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    {link}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-white text-lg font-semibold mb-6 relative before:absolute before:-left-4 before:top-1/2 before:w-1 before:h-6 before:bg-[#A5158C] before:-translate-y-1/2">
              Resources
            </h3>
            <ul className="space-y-3">
              {["Help Center", "Documentation", "Webinars", "Partners"].map(
                (link, index) => (
                  <li key={index}>
                    <NavLink
                      to={`/${link.toLowerCase().replace(" ", "-")}`}
                      className="text-gray-400 hover:text-white transition-colors text-sm flex items-center group"
                    >
                      <span className="w-2 h-2 bg-[#410445] rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                      {link}
                    </NavLink>
                  </li>
                )
              )}
            </ul>
          </div>
          <div>
            <h3 className="text-white text-lg font-semibold mb-6 relative before:absolute before:-left-4 before:top-1/2 before:w-1 before:h-6 before:bg-[#A5158C] before:-translate-y-1/2">
              Resources
            </h3>
            <ul className="space-y-3">
              {["Help Center", "Documentation", "Webinars", "Partners"].map(
                (link, index) => (
                  <li key={index}>
                    <NavLink
                      to={`/${link.toLowerCase().replace(" ", "-")}`}
                      className="text-gray-400 hover:text-white transition-colors text-sm flex items-center group"
                    >
                      <span className="w-2 h-2 bg-[#410445] rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                      {link}
                    </NavLink>
                  </li>
                )
              )}
            </ul>
          </div>
          <div className="lg:col-span-2">
            <h3 className="text-white text-lg font-semibold mb-6">
              Stay Updated
            </h3>
            <div className="bg-gray-800 rounded-lg p-6">
              <p className="text-sm text-gray-400 mb-4">
                Get monthly insights on learning strategies and career
                development
              </p>
              <div className="flex gap-4">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 bg-gray-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#A5158C]"
                />
                <button className="bg-[#410445] text-white px-6 py-3 rounded-lg hover:bg-[#A5158C] transition-colors">
                  Subscribe
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-3">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex space-x-6">
              <NavLink
                to="/privacy"
                className="text-gray-400 hover:text-white text-sm transition-colors"
              >
                Privacy Policy
              </NavLink>
              <NavLink
                to="/terms"
                className="text-gray-400 hover:text-white text-sm transition-colors"
              >
                Terms of Service
              </NavLink>
            </div>
            <p className="text-gray-400 text-sm text-center">
              © {new Date().getFullYear()} Mentora.
              <span className="hidden md:inline"> All rights reserved.</span>
              <br className="md:hidden" />
              Cairo, Egypt
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
