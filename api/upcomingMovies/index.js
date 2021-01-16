import express from 'express';
import upcomingMovieModel from "./upcomingMovie"
import watchlistMovieModel from '../watchlistMovies/watchlistMovieModel'
const router = express.Router();

router.get('/', (req, res, next) => {
    upcomingMovieModel.find().then(movies => res.status(200).send(movies)).catch(next);
});
router.get('/:id', async (req, res, next) => {
    const id = req.params.id;
    const movie = await upcomingMovieModel.findByMovieDBId(id)
    if(movie){
      res.status(200).send(movie)
    }else{
      res.status(401).send("Sorry, this movie id is not exist.")
    }
  });
router.post('/:id',async (req, res, next) => {
    const id = req.params.id;
    const addmovie=await upcomingMovieModel.findByMovieDBId(id);
    if (req.query.action === 'addtowatchlist') {
      if(addmovie){
        await watchlistMovieModel.collection.insertOne(addmovie).catch(next);
        res.status(200).json({
        code:200,
        message:'success add movie into watch list'
        })
      }else{
        res.status(401).json({
        code:401,
        message:'Sorry, this movie id is not exist.'
      })
    }
  };
});
export default router;