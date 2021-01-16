import express from 'express';
import topratedMovieModel from "./topratedMovie"

const router = express.Router();

router.get('/', (req, res, next) => {
  topratedMovieModel.find().then(movies => res.status(200).send(movies)).catch(next);
});
router.get('/:id', async (req, res, next) => {
  const id = req.params.id;
  const movie = await topratedMovieModel.findByMovieDBId(id)
  if(movie){
    res.status(200).send(movie)
  }else{
    res.status(401).send("Sorry, this movie id is not exist.")
  }
});



export default router;