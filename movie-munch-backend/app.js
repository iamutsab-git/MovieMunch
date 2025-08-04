import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import userRoutes from "./routes/UserRoutes.js"
import movieRoutes from "./routes/MovieRoute.js"
import authRoutes from "./routes/authRoutes.js"
import cookieParser from 'cookie-parser' ;
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import favoritesRoutes from "./routes/favoritesRoutes.js"
dotenv.config()


const app = express();

app.use(cookieParser());


app.use(express.json());


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true,
}));


app.use("/api/user",userRoutes)
app.use("/api/favorites",favoritesRoutes)
app.use("/api/auth",authRoutes)

app.use("/api/movie",movieRoutes)



mongoose.connect(process.env.MONGO_URL).then(()=>{
    app.listen( process.env.PORT, 
    console.log("Connected to DB & Server running on",process.env.PORT))
}).catch(err => 
    console.error(err)
)