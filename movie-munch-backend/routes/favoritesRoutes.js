import express from "express"
import { addFavoritesmovie, getFavoritesmovie, removeFavorites } from "../controllers/favoritesController.js"
import { verifyToken } from "../middleware/verifyToken.js"


const router = express.Router()

router.post("/add",verifyToken, addFavoritesmovie)
router.get("/", verifyToken, getFavoritesmovie)
router.delete("/remove/:movieId", verifyToken, removeFavorites)

export default router