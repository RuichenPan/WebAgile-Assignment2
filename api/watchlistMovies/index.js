import express from 'express';

import watchlistMovieModel from '../watchlistMovies/watchlistMovieModel'
const router = express.Router();

router.get('/', (req, res, next) => {
  watchlistMovieModel.find().then(movies => res.status(200).send(movies)).catch(next);
});

router.get('/:id', async (req, res, next) => {
  const id = req.params.id;
  const movie = await watchlistMovieModel.findByMovieDBId(id)
  if(movie){
    res.status(200).send(movie)
  }else{
    res.status(401).send("Sorry, this movie id is not exist.")
  }
});

router.delete('/:id',async (req, res, next) => {
  const id = parseInt(req.params.id);
  const deletemovie=await watchlistMovieModel.findByMovieDBId(id);
  if (req.query.action === 'deletefromwatchlist') {
    await watchlistMovieModel.collection.deleteOne(deletemovie).catch(next);
    res.status(200).json({
      code:200,
      message:'success delete from watch list'
    })
  }
});

// router.put('/:id',  (req, res) => {
//   if (req.body._id) delete req.body._id;
//   watchlistMovieModel.update({
//     _id: req.params.id,
//   }, req.body, {
//     upsert: false,
//   })
//   .then(movie => res.json(200, movies));
// });




export default router;
