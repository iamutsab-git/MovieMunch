// import express from "express";
// import {
//   addPost,
//   getPost,
//   getPosts,
//   deletePost,
//   updatePost,
// } from "../controllers/post.controller.js";
// const router = express.Router();

// router.get("/", getPosts);

// router.get("/:id", getPost);

// router.post("/", addPost);

// router.put("/:id", updatePost);

// router.delete("/:id", deletePost);

// export default router;


import express from 'express'
import { deleteMovie, getAllMovies, getMovie, postMovie, updateMovie } from '../controllers/post.controller.js'

const router = express.Router()


router.get('/', getAllMovies)
router.get('/:id', getMovie)
router.post('/', postMovie)
router.put('/:id', updateMovie)
router.delete('/:id', deleteMovie)
// router.put('/:id', recoverMovie)

export default router