import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


export const register = async(req, res)=>{
    const {username, email, password, avatar} = req.body ;

    try{
        const existingUSer = await User.findOne({$or: [{email}, {username}]});
        if(existingUSer){
            return res.status(400).json({message: `$(User.username) already exist`});
        }
//Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

// create new User
const newUser = await User.create({
    email,
    password: hashedPassword,
    username,
    avatar,
});
res.status(200).json({message: "User successfully registerd", data: newUser});
    }
    catch(error){
        res.status(500).json({message: "Internal server Error"});
        console.error(error);
    }
};

export const login = async (req, res) => {
  const { username, password,  } = req.body;

  try {
    // Check the user if it's already logged in
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ msg: "Invalid credentials" });
    }

    // Check if the user's password is correct
    const isPasswordValid = await bcrypt.compare(password, user.password); 
    if (!isPasswordValid) {
      return res.status(401).json({ msg: "Invalid credentials" });
    }

    // Generate cookie token and send it to the user

    // res.setHeader("Set-Cookie", "test=" + "myValue");

    // Generate JWT token
    const age = 1000 * 60 * 60 * 24 * 7; // 1week 

    const token = jwt.sign( 
      { 
        id: user.id, 
        username: user.username,
        avatar:user.avatar,
        isAdmin: false
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: age }
    );

    const {password:userPassword, ...userInfo} = user.toObject();

  
    res
      .cookie("token", token, {  // cookie-parser
        httpOnly: true,
        // secure: true
        maxAge: age
      })
      .status(200)
      .json(userInfo); 
      

    
  } catch (error) {
    res.status(500).json({ msg: "Internal server error" });
    console.error(error);
  }
};


export const logout = (req, res) => {
 res.clearCookie("token").status(200).json({ message: "User logged out" }); 
};