  import React, { useContext, useState } from "react";
  import { AuthContext } from "../Context/AuthContext";
  import { FaUpload } from "react-icons/fa";
  import { apiRequest } from "../../Services/api";
import { useNavigate } from "react-router-dom";

  const Update = () => {
    const { currentUser,setCurrentUser, updateUser } = useContext(AuthContext);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
      e.preventDefault();
      setError("");
      setLoading(true);

      const formData = new FormData(e.target);

      try {
        const res = await apiRequest.put(`/user/${currentUser._id}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            // Authorization: `Bearer ${currentUser.token}`,
          },
          withCredentials: true,
        });
        updateUser({
  ...currentUser,
  ...res.data.user,  // overwrite updated fields, preserve token
      });
       
        navigate("/profile");
      } catch (error) {
        setError(error.res?.data?.msg || "Something went wrong");
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    return (
      <div className="min-h-screen bg-gray-800 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto bg-black rounded-xl shadow-lg overflow-hidden md:max-w-2xl">
          <div className="p-8">
            <form onSubmit={handleSubmit} encType="multipart/form-data">
              <div className="flex flex-col items-start space-y-6">
                <div className="flex justify-between items-center w-full">
                  <h1 className="font-serif text-2xl font-bold text-red-600 hover:text-red-400">
                    Edit Profile
                  </h1>
                </div>

                <div className="w-full flex flex-col items-center">
                  <div className="mb-6 relative">
                    <img 
                    type="image/png"
                      src={currentUser.avatar}
                      alt="User Avatar"
                      className="w-32 h-32 rounded-full object-cover border-4 border-red-500 shadow-lg hover:border-red-600 transition duration-200"
                    />

                    <div className="flex items-center gap-2 mt-2">
                      <label
                        htmlFor="avatar-upload"
                        className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-md border border-gray-600 hover:bg-red-800 hover:border-red-500 transition-colors cursor-pointer"
                      >
                        <span>Upload Avatar</span>
                        <FaUpload className="ml-1" />
                      </label>
                      <input
                        type="file"
                        id="avatar-upload"
                        name="avatar"
                        accept="image/png/jpeg/*"
                        className="hidden"
                      />
                    </div>
                  </div>
                </div>

                <div className="w-full space-y-6">
                  <div className="border-b border-gray-200 pb-4">
                    <label className="block text-sm font-medium text-white uppercase tracking-wider mb-2">
                      Username
                    </label>
                    <input
                      type="text"
                      name="username"
                      defaultValue={currentUser.username}
                      className="w-80 px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-lg font-semibold text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition duration-200"
                      placeholder="Enter your username"
                    />
                  </div>

                  <div className="border-b border-gray-200 pb-4">
                    <label className="block text-sm font-medium text-white uppercase tracking-wider mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      defaultValue={currentUser.email}
                      className="w-80 px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-lg font-semibold text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition duration-200"
                      placeholder="Enter your email"
                    />
                  </div>
                  <div className="border-b border-gray-200 pb-4">
                    <label className="block text-sm font-medium text-white uppercase tracking-wider mb-2">
                      Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      className="w-80 px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-lg font-semibold text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition duration-200"
                      placeholder="Enter new password"
                    />
                  </div>

                  {error && <p className="text-red-500">{error}</p>}

                  <button
                    type="submit"
                    disabled={loading}
                    className={`px-6 py-2 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition duration-200 shadow-md hover:shadow-lg ${
                      loading ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                  >
                    {loading ? "Updating..." : "Update Profile"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  };

  export default Update;
