import express from 'express';
import favouriteActorModel from '../favouriteActors/favouriteActorModel'
const router = express.Router();

router.get('/', (req, res, next) => {
  favouriteActorModel.find().then(actors => res.status(200).send(actors)).catch(next);
});

router.get('/:id', async (req, res, next) => {
  const id = req.params.id;
  const actor = await favouriteActorModel.findByActorDBId(id)
  if(actor){
    res.status(200).send(actor)
  }else{
    res.status(401).send("Sorry, this actor id is not exist.")
  }
});

router.delete('/:id',async (req, res, next) => {
  const id = parseInt(req.params.id);
  const deleteactor=await favouriteActorModel.findByActorDBId(id);
  if (req.query.action === 'deletefromfavouriteactor') {
    await favouriteActorModel.collection.deleteOne(deleteactor).catch(next);
    res.status(200).json({
      code:200,
      message:'success delete from favourite actor'
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
