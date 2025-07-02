import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { apiRequest } from "../../Services/api";

const SignUp = () => {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    //basic way
    const formData = new FormData(e.target);
    const username = formData.get("username");
    const email = formData.get("email");
    const password = formData.get("password");
    // const avatar = formData.get("avatar");

    //shortcut
    // const formData = new FormData(e.traget);
    // const inputs = Object.fromEntries(formData);

    try {
      const res = await apiRequest.post("/auth/register", {
        username,
        email,
        password,
        // avatar,
      });
      console.log(res);
      navigate("/login");
    } catch (error) {
      setError(error.res?.data?.msg || "Something went wrong");
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-b from-black/80 to-gray-900 flex items-center justify-center">
      <div className="bg-black/70 p-8 rounded-lg max-w-md w-full">
        <h2 className="text-red-600 text-3xl font-bold mb-6">
          Sign Up for Movie Munch
        </h2>
        <form onSubmit={handleSubmit}   className="space-y-4" >
          <div>
            <label className="text-white text-sm">Full Name</label>
            <input
              type="text"
              name="username"
              className="w-full mt-1 p-2 rounded-md bg-gray-800 text-white border border-gray-600 focus:outline-none focus:border-red-600"
              placeholder="Enter your full name"
              required
            />
          </div>
          <div>
            <label className="text-white text-sm">Email</label>
            <input
              type="email"
              name="email"
              className="w-full mt-1 p-2 rounded-md bg-gray-800 text-white border border-gray-600 focus:outline-none focus:border-red-600"
              placeholder="Enter your email"
              required
            />
          </div>
          <div>
            <label className="text-white text-sm">Password</label>
            <input
              type="password"
              name="password"
              className="w-full mt-1 p-2 rounded-md bg-gray-800 text-white border border-gray-600 focus:outline-none focus:border-red-600"
              placeholder="Create a password"
              required
            />
          </div>
          {/* <div>
            <label className="text-white text-sm">Avatar</label>
            <input
              type="file"
              name="avatar"
              className="w-full mt-1 p-2 rounded-md bg-gray-800 text-white border border-gray-600 focus:outline-none focus:border-red-600"
            />
          </div>  */}
          <button
            type="submit"
            className="w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700 transition-colors duration-300"
          >
            Sign Up
          </button>
          {error && <span className="text-red-500 text-sm">{error}</span>}
        </form>
        <p className="text-gray-400 text-sm mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-red-600 hover:text-red-400">
            Sign in now
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
