import express from "express"
import { addFavoritesmovie, getFavoritesmovie, removeFavorites } from "../controllers/favoritesController.js"


const router = express.Router()

router.post("/add", addFavoritesmovie)
router.get("/", getFavoritesmovie)
router.delete("/remove/:movieId", removeFavorites)

export default router