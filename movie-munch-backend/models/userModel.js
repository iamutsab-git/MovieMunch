import mongoose from "mongoose";
 
const UserSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            match: [/^\S+@\S+.\S+$/, "Please enter a valid email address"],
        },
        username: {
            type: String,
            required: true,
            trim: true,
            minlength: [3, "Username must be at least 3 characters long"],
        },
        password: {
            type: String,
            required: true,
            minlength: [8, "Password must be at least 8 character long"],
        },
        avatar: {
            type: String,
        },
        favorites :[{
            movieId:{
                type: Number,
                requried: true,
            },
            movieData:{
                type: Object,
                required: true,
            }
        }]
    },
    {timestamps: true}
);

export default mongoose.model("User",UserSchema);