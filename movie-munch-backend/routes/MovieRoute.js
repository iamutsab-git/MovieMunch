import express from 'express'
import {  deleteMovie, getAllMovies, getMovie, postMovie, updateMovie} from '../controllers/MovieController.js'
import { verifyToken } from '../middleware/verifyToken.js'

const router= express.Router()

router.get('/',verifyToken, getAllMovies)
router.get('/:id', getMovie)
router.post('/', postMovie)
router.delete('/:id', deleteMovie)
router.put('/:id', updateMovie)




export default router;
