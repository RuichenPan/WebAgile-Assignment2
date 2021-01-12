import express from 'express';
import User from './userModel';
import jwt from 'jsonwebtoken';
import movieModel from '../movies/movieModel';
const router = express.Router(); // eslint-disable-line

// Get all users
router.get('/', (req, res) => {
    User.find().then(users =>  res.status(200).json(users));
});
router.get('/:userName/favourites', (req, res, next) => {
  const userName = req.params.userName;
  User.findByUserName(userName).populate('favourites').then(
    user => res.status(201).json(user.favourites)
  ).catch(next);
});

router.post('/', async (req, res, next) => {
    if (!req.body.username || !req.body.password) {
      res.status(401).json({
        success: false,
        msg: 'Please pass username and password.',
      });
    }
    if (req.query.action === 'register') {
      await User.create(req.body).catch(next);
      res.status(201).json({
        code: 201,
        msg: 'Successful created new user.',
      });
    } else {
      const user = await User.findByUserName(req.body.username).catch(next);
        if (!user) return res.status(401).json({ code: 401, msg: 'Authentication failed. User not found.' });
        user.comparePassword(req.body.password, (err, isMatch) => {
          if (isMatch && !err) {
            // if user is found and password is right create a token
            const token = jwt.sign(user.username, process.env.SECRET);
            // return the information including token as JSON
            res.status(200).json({
              success: true,
              token: 'BEARER ' + token,
            });
          } else {
            res.status(401).json({
              code: 401,
              msg: 'Authentication failed. Wrong password.'
            });
          }
        });
      }
});

// Update a user
router.put('/:id',  (req, res) => {
    if (req.body._id) delete req.body._id;
     User.update({
      _id: req.params.id,
    }, req.body, {
      upsert: false,
    })
    .then(user => res.json(200, user));
});
//Add a favourite. No Error Handling Yet. Can add duplicates too!
router.post('/:userName/favourites', async (req, res, next) => {
  try{
    const newFavourite = req.body.id;
    const userName = req.params.userName;
    const movie = await movieModel.findByMovieDBId(newFavourite);
    const user = await User.findByUserName(userName);
    if(user.favourites.indexOf(movie._id)=== -1){
      await user.favourites.push(movie._id);
    }else{
      res.status(401).send("This movies is in the favourites")
    }
    await user.save();
    res.status(201).json(user); 
  }catch(err){
    next(err)
  }
});

router.delete('/',async (req, res, next) => {
  const username = req.body.username;
  const deleteuser=await User.findByUserName(username);
  if (req.query.action === 'deleteuser') {
    if(deleteuser){
      await User.collection.deleteOne(deleteuser).catch(next);
      res.status(200).json({
      code:200,
      message:'success delete from user list'
      })
    }else{
      res.status(401).json({
      code:401,
      message:'Sorry, this user account is not exist.'
    })
  }

  }
});
export default router;