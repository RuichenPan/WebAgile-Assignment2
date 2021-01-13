import express from 'express';
import topratedMovieModel from "./topratedMovie"

const router = express.Router();

router.get('/', (req, res, next) => {
  topratedMovieModel.find().then(movies => res.status(200).send(movies)).catch(next);
});
router.get('/:id', (req, res, next) => {
  const id = parseInt(req.params.id);
  topratedMovieModel.findByMovieDBId(id).then(movie => res.status(200).send(movie)).catch(next);
});



export default router;