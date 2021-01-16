import express from 'express';
import actorModel from './popularActor'
import favouriteActorModel from '../favouriteActors/favouriteActorModel'
const router = express.Router();

router.get('/', (req, res, next) => {
  actorModel.find().then(actors => res.status(200).send(actors)).catch(next);
});

router.get('/:id', async (req, res, next) => {
  const id = req.params.id;
  const actor = await actorModel.findByActorDBId(id)
  if(actor){
    res.status(200).send(actor)
  }else{
    res.status(401).send("Sorry, this actor id is not exist.")
  }
});

router.post('/:id',async (req, res, next) => {
  const id = req.params.id;
  const addactor=await actorModel.findByActorDBId(id);
  if (req.query.action === 'addtofavouriteactor') {
    if(addactor){
      await favouriteActorModel.collection.insertOne(addactor).catch(next);
      res.status(200).json({
      code:200,
      message:'success add actor into favourite'
      })
    }else{
      res.status(401).json({
      code:401,
      message:'Sorry, this actor id is not exist.'
    })
  }
};
});
export default router;