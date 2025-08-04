import express from "express"
import { deleteUser, getALLUser, getUserProfile, updateUserProfile } from "../controllers/UserController.js"
import {  verifyUser } from "../middleware/verifyToken.js"
import multer from "multer";


const router = express.Router()

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/"); 
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});
const upload = multer({ storage });

router.get("/:id", getUserProfile)
router.get("/",getALLUser)
router.put("/:id",verifyUser,upload.single("avatar"), updateUserProfile)
router.delete("/:id",deleteUser)


export default router