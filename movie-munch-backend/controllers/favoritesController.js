import User from "../models/userModel.js";

const addFavoritesmovie = async (req, res) => {
  try {
    const { movieId, movieData } = req.body;
    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ msg: "User not found" });

    const alreadyExist = user.favorites.some(fav => fav.movieId === movieId);
    if (alreadyExist) {
      return res.status(400).json({ msg: "Movie is already in favorites" });
    }

    user.favorites.push({ movieId, movieData });
    await user.save();

    res.status(201).json(user.favorites);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

const getFavoritesmovie = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ msg: "User not found" });

    res.status(200).json(user.favorites);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

const removeFavorites = async (req, res) => {
  try {
    const movieId = String(req.params.movieId); // normalize to string
    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ msg: "User not found" });

    const initialLength = user.favorites.length;

    user.favorites = user.favorites.filter(fav =>
      String(fav.movieId) !== movieId
    );

    if (user.favorites.length === initialLength) {
      return res.status(404).json({ msg: "Movie not found in favorites" });
    }

    await user.save();
    res.status(200).json(user.favorites);
  } catch (error) {
    console.error("Error removing favorite:", error);
    res.status(500).json({ msg: error.message });
  }
};

export {
  addFavoritesmovie,
  getFavoritesmovie,
  removeFavorites,
};
