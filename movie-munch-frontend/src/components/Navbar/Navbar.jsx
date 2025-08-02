import React, { useContext } from "react";
import { Link, useNavigate} from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import { FiLogOut } from "react-icons/fi";


const Navbar = () => {
  const { currentUser} = useContext(AuthContext);
  // const navigate= useNavigate();
  
  // const handleLogout = () => {
  //   // Clear user session (mocked)
  //   setCurrentUser(null);
  //   navigate('/login');
  // };

  return (
    <nav className="bg-gradient-to-b from-black/40 to-transparent fixed w-full z-10">
      <ul className="flex items-center justify-between p-4 max-w-7xl mx-auto">
        <li>
          <Link
            to="/"
            className="font-serif text-red-600 text-2xl font-bold hover:text-red-400 transition-colors duration-300"
          >
            Movie Munch🍿
          </Link>
        </li>
        <div className="flex items-center space-x-4">
          <Link
            to="/my-list"
            className="bg-grey- text-red-600 border border-red-600 rounded-md px-4 py-2  hover:bg-red-600 hover:text-white transition-colors duration-300"
          >
            My List
          </Link>

          {!currentUser ? (
            <>
              <Link
                to="/signup"
                className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-800 transition-colors duration-300"
              >
                Sign Up
              </Link>
              <Link
                to="/login"
                className="bg-transparent border border-red-600 text-red-600 px-4 py-2 rounded-md hover:bg-red-600 hover:text-white transition-colors duration-300"
              >
                Sign In
              </Link>
            </>
          ) : (
            <>
              <div className="flex items-center space-x-3">
                <Link
                  to="/profile"
                  className="flex items-center space-x-2 bg-red-600 border border-red-600 text-white px-4 py-1.5 rounded-full hover:bg-red-700 hover:border-red-700 transition-colors duration-300"
                >
                  <img
                    src={
                      currentUser.avatar ||
                      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQADjfoADAlJPrsl_hiiOMeE-FBor-i6hEAVg&s"
                    }
                    alt="User Avatar"
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <span className="text-sm font-medium">
                    {currentUser.username}
                  </span>
                </Link>
                {/* <button
                  onClick={handleLogout}
                  className=" text-gray-100 hover:text-black transition-colors duration-300"
                >
                  <FiLogOut className="w-6 h-6" />
                </button> */}
              </div>
            </>
          )}
        </div>
      </ul>
    </nav>
  );
};

export default Navbar;
