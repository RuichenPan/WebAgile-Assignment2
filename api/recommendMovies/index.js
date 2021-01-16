import express from 'express';
import {getRecommendMovies} from '../tmdb-api'
const router = express.Router();

router.get('/:id', (req, res, next) => {
  const id = parseInt(req.params.id);
  getRecommendMovies(id).then(movies => res.status(200).send(movies)).catch(next);
});


export default router;