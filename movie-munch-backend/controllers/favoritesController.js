import { send } from "vite";
import User from "../models/userModel.js";

const addFavoritesmovie = async(req, res)=>{
try{
const {movieId, movieData}= req.body;
const user =await User.findById(req.userId);

const alreadyExist = user.favorites.some(fav=>fav.movieId === movieId)
if(alreadyExist)
    return res.status(400).send({error:'Movie is already in favorites'});

user.favorites.push({movieId, movieData});
await user.save();

res.status(201).json(user.favorites);
}catch(error){
    res.status(500).json(error);
}};

const getFavoritesmovie = async(req,res)=>{

    try{
        const user = await User.findById(req.userId);
        res.json(user.favorites);
    }catch(error){
        res.status(400).json(error);
    }};

const removeFavorites = async (req, res) => {
    try {
        // Convert to number since TMDB IDs are numbers
        const movieId = Number(req.params.movieId);
        
        // // Validate ID
        // if (isNaN(movieId)) {
        //     return res.status(400).json({ msg: 'Invalid movie ID' });
        // }

        const user = await User.findById(req.userId);
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        // Get initial count for comparison
        // const initialCount = user.favorites.length;
        
        // Filter favorites - ensure proper type comparison
        user.favorites = user.favorites.filter(fav => 
            Number(fav.movieId) !== movieId
        );

        // // Check if anything was actually removed
        // if (user.favorites.length === initialCount) {
        //     return res.status(404).json({ msg: 'Movie not found in favorites' });
        // }

        // Save changes
        const savedUser = await user.save();
        
        // Return updated favorites
        res.json(savedUser.favorites);
        
    } catch (error) {
        console.error('Error removing favorite:', error);
        res.status(500).json({ msg: error.message });
    }
}
export {
    addFavoritesmovie,
    getFavoritesmovie,
    removeFavorites
};