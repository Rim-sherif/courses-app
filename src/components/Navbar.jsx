import {
  faBagShopping,
  faBars,
  faBook,
  faChartLine,
  faChevronDown,
  faChevronRight,
  faCode,
  faGear,
  faGlobe,
  faPalette,
  faSearch,
  faSignOutAlt,
  faTimes,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";
import profile from "/profile.png";
import { faHeart as farHeart } from "@fortawesome/free-regular-svg-icons"; // Correct import
import axios from "axios";
import { setCount } from "../redux/reducers/wishlistCount";
import { setCountCart } from "../redux/reducers/cartCount";

const fetchCategories = async () => {
  const response = await fetch(
    `${import.meta.env.VITE_BASE_URL}/api/v1/category/all`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch categories");
  }
  const data = await response.json();
  return data.courses; // Fetch all, slice in component
};

const Navbar = () => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchSelect, setSearchSelect] = useState("courses");
  const [searchValue, setSearchValue] = useState("");
  const { loggedIn } = useSelector((store) => store.token);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const categoriesRef = useRef(null);
  const wishlistCount = useSelector(store => store.wishlistCount);
  const cartCount = useSelector(store => store.cartCount);
  
  // Fetch categories using useQuery
  const {
    data: categories = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });


  const getwishlistCourses = async () => {
    try {
    // setIsLoading(true);
      const { data } = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/v1/course/wishlist/allCourses`
      , {withCredentials: true});
      dispatch(setCount(data.data.length))
    } catch (error) {
        toast.error(error.message);
    }
  };
  const getCartCourses = async () => {
    try {
    // setIsLoading(true);
      const { data } = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/v1/course/cart/allCourses`
      , {withCredentials: true});
      dispatch(setCountCart(data.data.length))
    } catch (error) {
        toast.error(error.message);
    }
  };

  useEffect(()=>{
    getCartCourses();
    getwishlistCourses()
  },[])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        categoriesRef.current &&
        !categoriesRef.current.contains(event.target)
      ) {
        setIsCategoriesOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const searchBasedSelect = (e) => {
    setSearchSelect(e.target.value);
  };

  const handleSearchValue = (e) => {
    setSearchValue(e.target.value);
  };

  const sendData = async () => {
    if (searchValue.length > 0) {
      navigate(`/search?key=${searchSelect}&q=${searchValue}`);
      setSearchValue("");
    } else {
      toast.error("Please enter a valid search value", { autoClose: 600 });
    }
  };

  const handleEnterKey = (e) => {
    if (e.key === "Enter") {
      if (searchValue.length > 0) {
        navigate(`/search?key=${searchSelect}&q=${searchValue}`);
        setSearchValue("");
      } else {
        toast.error("Please enter a valid search value", { autoClose: 600 });
      }
    }
  };

  return (
    <nav
      style={{ zIndex: 1111 }}
      className="bg-white py-3 shadow-md sticky top-0 z-50"
    >
      <div className="mx-auto w-[95%]">
        <div className="flex justify-between items-center h-16">
          <div className="flex gap-1">
            <svg
              className="w-8 h-8 text-[#A5158C]"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
            <NavLink to="/" className="text-2xl font-bold text-[#410445]">
              Mentora
            </NavLink>
          </div>
          <div className="hidden md:flex flex-1 max-w-2xl mx-6">
            <div className="relative w-full">
              <input
                type="search"
                className="w-full px-4 ps-33 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                placeholder="Search for courses..."
                value={searchValue}
                onKeyUp={handleEnterKey}
                onChange={handleSearchValue}
              />
              <button
                onClick={sendData}
                className="absolute right-0 p-2 px-4 text-white rounded-br-lg rounded-tr-lg top-[1px] cursor-pointer bg-[#410445] top-0 text-gray-400 hover:bg-[#A5158C]"
              >
                <FontAwesomeIcon icon={faSearch} />
              </button>
              <div className="absolute left-4 top-[9px]">
                <select
                  name="searched"
                  onChange={searchBasedSelect}
                  className="outline-0 text-gray-600"
                >
                  <option value="courses">Courses</option>
                  <option value="instructors">Instructors</option>
                </select>
              </div>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-6">
            <div className="relative" ref={categoriesRef}>
              <button
                onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
                className="text-gray-700 cursor-pointer hover:text-[#A5158C] flex items-center"
              >
                Categories
                <FontAwesomeIcon
                  icon={faChevronDown}
                  className="ml-2 text-xs"
                />
              </button>
              {isCategoriesOpen && (
                <div
                  className="absolute top-full right-0 w-56 bg-white shadow-xl rounded-xl py-3 mt-2 z-30 border border-gray-100 animate-fade-in-up"
                  role="menu"
                >
                  {isLoading ? (
                    <div className="px-5 py-3 text-gray-500">Loading...</div>
                  ) : error ? (
                    <div className="px-5 py-3 text-red-500">
                      Error loading categories
                    </div>
                  ) : (
                    categories.slice(0, 3).map(
                      (
                        category // Slice here
                      ) => (
                        <NavLink
                          key={category._id}
                          to={`/category/${category._id}`}
                          className="flex items-center px-5 py-3 hover:bg-[#410445]/5 group transition-colors"
                          role="menuitem"
                          onClick={() => setIsCategoriesOpen(false)} // Close on click
                        >
                          <FontAwesomeIcon
                            icon={faCode}
                            className="w-5 h-5 mr-3 text-[#410445] group-hover:text-[#A5158C] transition-colors"
                          />
                          <span className="text-gray-700 group-hover:text-[#410445] font-medium transition-colors">
                            {category.title}
                          </span>
                        </NavLink>
                      )
                    )
                  )}
                  <div className="border-t border-gray-100 mt-2 pt-2">
                    <NavLink
                      to="/categories"
                      className="flex items-center px-5 py-3 text-[#410445] hover:bg-[#410445]/5 font-semibold transition-colors"
                      role="menuitem"
                      onClick={() => setIsCategoriesOpen(false)} // Close on click
                    >
                      <FontAwesomeIcon
                        icon={faChevronRight}
                        className="w-4 h-4 mr-3 animate-bounce-horizontal"
                      />
                      View All Categories
                    </NavLink>
                  </div>
                </div>
              )}
            </div>
            <NavLink
              to="/courses"
              className="text-gray-700 hover:text-[#A5158C]"
            >
              Courses
            </NavLink>

            <NavLink
              to="/instructors"
              className="text-gray-700 hover:text-[#A5158C]">
              Instructors
            </NavLink>

            <NavLink
              to="/wishlist"
              className="text-gray-700 text-[20px] relative hover:text-[#A5158C]"
            >
              <FontAwesomeIcon icon={farHeart} />
              <span className="absolute top-[-10px] right-[-10px] bg-[#A5158C] text-[12px] text-white w-[22px] h-[22px] font-bold mx-auto text-center rounded-full">
                {wishlistCount}
              </span>
            </NavLink>

            <NavLink
              to="/cart"
              className="text-gray-700 text-[20px] relative hover:text-[#A5158C]"
            >
              <FontAwesomeIcon icon={faBagShopping} />
              <span className="absolute top-[-10px] right-[-10px] bg-[#A5158C] text-[12px] text-white w-[22px] h-[22px] font-bold mx-auto text-center rounded-full">
                {cartCount}
              </span>
            </NavLink>

            <div className="relative">
              <button
                onClick={() => setIsLangOpen(!isLangOpen)}
                className="text-gray-700 hover:text-[#A5158C] flex items-center">
                <FontAwesomeIcon icon={faGlobe} className="text-xl" />
              </button>
              {isLangOpen && (
                <div className="absolute top-full right-0 w-24 bg-white shadow-lg rounded-lg py-2 mt-2 z-20">
                  <button className="block w-full px-4 py-2 text-left hover:bg-gray-100">
                    English
                  </button>
                  <button className="block w-full px-4 py-2 text-left hover:bg-gray-100">
                    عربي
                  </button>
                </div>
              )}
            </div>

            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-2 text-gray-700 hover:text-[#A5158C]"
                >
                  <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                    <FontAwesomeIcon icon={faUser} />
                  </div>
                  <span className="hidden md:inline">My Account</span>
                </button>
                {isUserMenuOpen && (
                  <div className="absolute top-full right-0 w-48 bg-white shadow-lg rounded-lg py-2 mt-2 z-30">
                    <NavLink
                      to="/profile"
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      <FontAwesomeIcon icon={faUser} className="mr-2" />
                      Profile
                    </NavLink>
                    <NavLink
                      to="/my-courses"
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      <FontAwesomeIcon icon={faBook} className="mr-2" />
                      My Courses
                    </NavLink>
                    <NavLink
                      to="/settings"
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      <FontAwesomeIcon icon={faGear} className="mr-2" />
                      Settings
                    </NavLink>
                    <hr className="my-2" />
                    <button className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100">
                      <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-3 text-sm">
                {!loggedIn ? (
                  <>
                    <NavLink
                      to="/login"
                      className="text-white border-2 bg-[#410445] rounded-xl py-2 px-5 hover:bg-[#A5158C] transition-colors flex items-center"
                    >
                      <span className="hidden md:inline">Log In</span>
                    </NavLink>
                    <NavLink
                      to="/signup"
                      className="text-[#410445] border-2 border-[#410445] rounded-xl py-1.5 px-4 hover:bg-[#410445] hover:text-white transition-colors flex items-center"
                    >
                      <span className="hidden md:inline">Sign Up</span>
                    </NavLink>
                  </>
                ) : (
                  <Link to="/profile">
                    <img
                      src={profile}
                      className="w-[25px] cursor-pointer"
                      alt="profile image"
                    />
                  </Link>
                )}
              </div>
            )}
          </div>
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-700 hover:text-[#A5158C]"
            >
              <FontAwesomeIcon icon={isMobileMenuOpen ? faTimes : faBars} />
            </button>
          </div>
        </div>
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="flex flex-col space-y-2 mt-4 pb-2">
              <NavLink
                to="/"
                className="text-gray-700 hover:text-[#A5158C] px-4 py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </NavLink>
              <NavLink
                to="/courses"
                className="text-gray-700 hover:text-[#A5158C] px-4 py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Courses
              </NavLink>
              <button
                onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
                className="text-gray-700 hover:text-[#A5158C] px-4 py-2 flex items-center justify-between"
              >
                Categories
                <FontAwesomeIcon
                  icon={faChevronDown}
                  className="ml-2 text-xs"
                />
              </button>
              {isCategoriesOpen && (
                <div className="flex flex-col space-y-2 pl-4">
                  {isLoading ? (
                    <div className="px-4 py-2 text-gray-500">Loading...</div>
                  ) : error ? (
                    <div className="px-4 py-2 text-red-500">
                      Error loading categories
                    </div>
                  ) : (
                    categories.slice(0, 3).map((category) => (
                      <NavLink
                        key={category._id}
                        to={`/category/${category._id}`}
                        className="text-gray-700 hover:text-[#A5158C] px-4 py-2"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {category.title}
                      </NavLink>
                    ))
                  )}
                  <NavLink
                    to="/categories"
                    className="text-gray-700 hover:text-[#A5158C] px-4 py-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    View All Categories
                  </NavLink>
                </div>
              )}
              <button
                onClick={() => setIsLangOpen(!isLangOpen)}
                className="text-gray-700 hover:text-[#A5158C] px-4 py-2 flex items-center justify-between"
              >
                Language
                <FontAwesomeIcon
                  icon={faChevronDown}
                  className="ml-2 text-xs"
                />
              </button>
              {isLangOpen && (
                <div className="flex flex-col space-y-2 pl-4">
                  <button className="text-gray-700 hover:text-[#A5158C] px-4 py-2">
                    English
                  </button>
                  <button className="text-gray-700 hover:text-[#A5158C] px-4 py-2">
                    عربي
                  </button>
                </div>
              )}
              {isAuthenticated ? (
                <div className="flex flex-col space-y-2 mt-4">
                  <NavLink
                    to="/profile"
                    className="text-gray-700 hover:text-[#A5158C] px-4 py-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Profile
                  </NavLink>
                  <NavLink
                    to="/my-courses"
                    className="text-gray-700 hover:text-[#A5158C] px-4 py-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    My Courses
                  </NavLink>
                  <NavLink
                    to="/settings"
                    className="text-gray-700 hover:text-[#A5158C] px-4 py-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Settings
                  </NavLink>
                  <button
                    className="text-red-600 hover:text-[#A5158C] px-4 py-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="flex flex-col space-y-2 mt-4">
                  {!loggedIn ? (
                    <>
                      <NavLink
                        to="/login"
                        className="text-white bg-[#410445] rounded-xl py-1.5 px-4 hover:bg-[#A5158C] transition-colors flex items-center"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Log In
                      </NavLink>
                      <NavLink
                        to="/signup"
                        className="text-[#410445] border-2 border-[#410445] rounded-xl py-1.5 px-4 hover:bg-[#410445] hover:text-white transition-colors flex items-center"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Sign Up
                      </NavLink>
                    </>
                  ) : (
                    <Link
                      to="/profile"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex ml-3 gap-2"
                    >
                      <img
                        src={profile}
                        className="w-[25px] cursor-pointer"
                        alt="profile image"
                      />
                      <span>My Profile</span>
                    </Link>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
