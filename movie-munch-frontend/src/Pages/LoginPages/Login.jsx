import React, { useContext, useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { AuthContext } from '../../components/Context/AuthContext';
import { apiRequest } from "../../Services/api";

const Login = () => {
  const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const {updateUser} = useContext(AuthContext);
    const navigate = useNavigate();
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      setIsLoading(true);
      setError("");
      //basic way
      const formData = new FormData(e.target);
      const username = formData.get("username");
      const password = formData.get("password");
      // const avatar = formData.get("avatar");
  
      //shortcut
      // const formData = new FormData(e.traget);
      // const inputs = Object.fromEntries(formData);
  
      try {
        const res = await apiRequest.post("/auth/login", {
          username,
          password,
        });
        updateUser(res.data)
        
        navigate("/");
      } catch (error) {
        if (error.response && error.response.data) {
        setError(error.response.data.msg); // display server error message
      } else {
        setError("Something went wrong. Please try again.");
      }
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    
  return (
    <div className="min-h-screen bg-gradient-to-b from-black/80 to-gray-900 flex items-center justify-center">
      <div className="bg-black/70 p-8 rounded-lg max-w-md w-full">
        <h2 className="text-red-600 text-3xl font-bold mb-6">Sign In to Movie Munch</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-white text-sm">Username</label>
            <input
              type="text"
              name="username"
              className="w-full mt-1 p-2 rounded-md bg-gray-800 text-white border border-gray-600 focus:outline-none focus:border-red-600"
              placeholder="Enter your username"
            />
          </div>
          <div>
            <label className="text-white text-sm">Password</label>
            <input
              type="password"
              name="password"
              className="w-full mt-1 p-2 rounded-md bg-gray-800 text-white border border-gray-600 focus:outline-none focus:border-red-600"
              placeholder="Enter your password"
            />
          </div>
           {error && <p className="text-red-500">{error}</p>} 
          <button
            type="submit"
            className="w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700 transition-colors duration-300"
          >
            Sign In
          </button>
        </form>
        <p className="text-gray-400 text-sm mt-4">
          New to Movie Munch?{' '}
          <Link to ='/signup' className="text-red-600 hover:text-red-400">
            Sign up now
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Login