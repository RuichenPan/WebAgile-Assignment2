import express from 'express';
import nowplayingMovieModel from "./nowplayingMovie"
const router = express.Router();

router.get('/', (req, res, next) => {
    nowplayingMovieModel.find().then(movies => res.status(200).send(movies)).catch(next);
});
router.get('/:id', (req, res, next) => {
    const id = parseInt(req.params.id);
    nowplayingMovieModel.findByMovieDBId(id).then(movie => res.status(200).send(movie)).catch(next);
  });
export default router;