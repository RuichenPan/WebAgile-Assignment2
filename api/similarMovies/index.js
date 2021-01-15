import express from 'express';
import similarMovieModel from "./similarMovieModel"
import {loadSimilarMovies} from '../../seedData';
import {getSimilarMovies} from '../tmdb-api'
const router = express.Router();

router.get('/:id', (req, res, next) => {
  const id = parseInt(req.params.id);
  // if (process.env.SEED_DB) {
  // loadSimilarMovies(id);
  // }
  getSimilarMovies(id).then(movies => res.status(200).send(movies)).catch(next);
});


export default router;