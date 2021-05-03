import { Router } from 'express';
import { 
    getMovie,
    getMovies,
    editMovie,
    createMovie,
    deleteMovie,
    searchMovie
 } from '../controllers/movie.controllers';

const router = Router();

router.get('/', getMovies);
router.get('/search', searchMovie);
router.get('/:id', getMovie);
router.put('/:id', editMovie);
router.post('/', createMovie);
router.delete('/:id', deleteMovie);

export default router;