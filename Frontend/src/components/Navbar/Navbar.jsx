import { useState, useRef, useEffect } from "react";
import './Navbar.css';
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { CgProfile } from "react-icons/cg";
import { FaUserCircle } from "react-icons/fa";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <div className='navbar absolute z-50 h-100 py-3'>
      <div id='title-name' className='text-4xl font-bold ps-4'>Manora</div>
      <div className='flex'>
        <ul className='my-auto flex gap-4'>
          <li><Link className='text-black font-semibold text-lg' to='/'>Home</Link></li>
          <li><Link className='text-black font-semibold text-lg' to={'/lost-and-found'}>Lost & Found</Link></li>
          <li><Link className='text-black font-semibold text-lg' to={'/contest'}>Contest</Link></li>
          <li><Link className='text-black font-semibold text-lg' to={'/winners'}>Winners</Link></li>
          <li><Link className='text-black font-semibold text-lg' to={'/reviews'}>Reviews</Link></li>
        </ul>
      </div>

      {/* Right Side */}
      <div className="flex gap-4 items-center pr-4">
        {user ? (
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex items-center gap-2 focus:outline-none"
            >
              {user.avatar ? (
                <img
                  src={user.avatar}
                  alt="Profile"
                  className="w-10 h-10 rounded-full border border-gray-300 object-cover"
                />
              ) : (
                <CgProfile className="w-8 h-8 text-gray-700" />
              )}
            </button>

            {showDropdown && (
              <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg py-4 z-50">
                <div className="px-4 pb-2 border-b border-gray-100 flex flex-col items-center">
                  {user.avatar ? (
                    <img
                      src={user.avatar}
                      alt="Profile"
                      className="w-16 h-16 rounded-full border border-gray-300 mb-2 object-cover"
                    />
                  ) : (
                    <FaUserCircle className="w-16 h-16 text-gray-400 mb-2" />
                  )}
                  <p className="font-semibold text-gray-800">{user.name}</p>
                  <p className="text-sm text-gray-500">{user.email}</p>
                </div>

                <div className="px-2 pt-2">
                  <button
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
                    onClick={() =>
                      alert("Profile photo update is not implemented yet.")
                    }
                  >
                    Update Profile Photo
                  </button>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md transition-colors mt-1"
                  >
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <>
            <Link to="/login" className="border px-3 py-1 font-bold">
              Login
            </Link>
            <Link to="/signup" className="border px-3 py-1 font-bold">
              Signup
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
