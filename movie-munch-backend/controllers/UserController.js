import User from '../models/userModel.js';
import bcrypt from "bcrypt";


const getALLUser = async(req, res) => {
    try{
        const users = await User.find();
        res.status(200).json({
            success: true,
            count: users.length,
            data: users
        });
    }catch(error){
        res.status(500).json({
            success: false,
            message: "Error while fetching",
            error: error.message,
        });

    }
};

// Get user profile
const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Update user profile


const updateUserProfile = async (req, res) => {
  try {
    const { email, username, password } = req.body;
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (email) user.email = email;
    if (username) user.username = username;

    if (req.file) {
      const avatarUrl = `${process.env.SERVER_URL}/uploads/${req.file.filename}`;
      user.avatar = avatarUrl;
    }

    if (password && password.trim() !== "") {
      user.password = await bcrypt.hash(password, 10);
    }

    await user.save();

    res.json({
      message: 'Profile updated successfully',
      user: {
        _id: user._id,
        email: user.email,
        username: user.username,
        avatar: user.avatar,
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export default updateUserProfile;


// Delete user
const deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

export {
    
    getALLUser,
    getUserProfile,
    updateUserProfile,
    deleteUser
};