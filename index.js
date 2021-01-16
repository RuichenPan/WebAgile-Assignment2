import dotenv from 'dotenv';
import express from 'express';
import moviesRouter from './api/movies';
import bodyParser from 'body-parser';
import loglevel from 'loglevel';
import './db';
import {loadUsers, loadMovies,loadupcomingMovies,loadNowplayingMovies,loadTopratedMovies,loadPopularActors} from './seedData';
import usersRouter from './api/users';
import userGenres from './api/genres';
import upcomingRouter from './api/upcomingMovies'
import watchlistRouter from './api/watchlistMovies'
import nowplayingRouter from './api/nowplayingMovies'
import topratedRouter from './api/topratedMovies'
import actorsRouter from './api/popularActors'
import favouriteactorsRouter from './api/favouriteActors'
import similarRouter from './api/similarMovies'
import recommendRouter from './api/recommendMovies'
import session from 'express-session';
import authenticate from './authenticate';
import passport from './authenticate';
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');

dotenv.config();
if (process.env.NODE_ENV === 'test') {
  loglevel.setLevel('warn')
} else {
  loglevel.setLevel('info')
}

const app = express();

const port = process.env.PORT;
const errHandler = (err, req, res, next) => {
  /* if the error in development then send stack trace to display whole error,
  if it's in production then just send error message  */
  if(process.env.NODE_ENV === 'production') {
    return res.status(500).send(`Something went wrong!`);
  }
  res.status(500).send(`Hey!! You caught the error 👍👍, ${err.stack} `);
};
if (process.env.SEED_DB) {
  loadUsers();
  loadMovies();
  loadupcomingMovies();
  loadNowplayingMovies();
  loadTopratedMovies();
  loadPopularActors();
}
app.use(session({
  secret: 'ilikecake',
  resave: true,
  saveUninitialized: true
}));

const swaggerDocument = YAML.load('./swagger.yaml');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(passport.initialize())
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use('/api/movies',moviesRouter);
//Users router
app.use('/api/users', usersRouter);
app.use('/api/genres', userGenres);
app.use('/api/upcoming',upcomingRouter)
app.use('/api/watchlist', passport.authenticate('jwt', {session: false}), watchlistRouter)
app.use('/api/nowplaying',nowplayingRouter);
app.use('/api/toprated',topratedRouter);
app.use('/api/actors', actorsRouter);
app.use('/api/favouriteactors', passport.authenticate('jwt', {session: false}), favouriteactorsRouter);
app.use('/api/similar', similarRouter)
app.use('/api/recommend',recommendRouter)
app.use(errHandler);


let server = app.listen(port, () => {
  loglevel.info(`Server running at ${port}`);
});

module.exports = server