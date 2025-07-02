import express from 'express'
import dotenv from 'dotenv'
import { connectDB } from './lib/db.js'
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



connectDB().then(() => {
  console.log('✅ MongoDB connected');
}).catch(err => {
  console.error('❌ MongoDB connection error:', err);
});
