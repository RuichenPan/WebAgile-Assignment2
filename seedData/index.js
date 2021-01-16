import userModel from '../api/users/userModel';
import movieModel from '../api/movies/movieModel';
import upcomingmovieModel from '../api/upcomingMovies/upcomingMovie'
import nowplayingMovieModel from '../api/nowplayingMovies/nowplayingMovie';
import topratedMovieModel from '../api/topratedMovies/topratedMovie';
import actorModel from '../api/popularActors/popularActor';
import similarMovieModel from '../api/similarMovies/similarMovieModel';
import recommendMoviesModel from '../api/recommendMovies/recommendMoviesModel';
import {movies} from './movies.js';
import {getUpcomingMovies} from '../api/tmdb-api'
import {getNowplayingMovies} from '../api/tmdb-api'
import {getTopratedMovies} from '../api/tmdb-api'
import {getPopularActors} from '../api/tmdb-api'
import {getSimilarMovies} from '../api/tmdb-api'
import {getRecommendMovies} from '../api/tmdb-api'
const users = [
  {
    'username': 'user1',
    'password': 'test1',
  },
  {
    'username': 'user2',
    'password': 'test2',
  },
];

// deletes all user documents in collection and inserts test data
export async function loadUsers() {
  console.log('load user Data');
    try {
      await userModel.deleteMany();
      await users.forEach(user => userModel.create(user));
      console.info(`${users.length} users were successfully stored.`);
    } catch (err) {
      console.error(`failed to Load user Data: ${err}`);
    }
  }
  // deletes all movies documents in collection and inserts test data
export async function loadMovies() {
  console.log('load seed data');
  console.log(movies.length);
  try {
    await movieModel.deleteMany();
    await movieModel.collection.insertMany(movies);
    console.info(`${movies.length} Movies were successfully stored.`);
  } catch (err) {
    console.error(`failed to Load movie Data: ${err}`);
  }
}
export async function loadupcomingMovies() {
  console.log('load seed data');
  try {
    getUpcomingMovies().then(async res =>{
    await upcomingmovieModel.deleteMany();
    await upcomingmovieModel.collection.insertMany(res);
    console.info(`${res.length} Upcoming Movies were successfully stored.`);
    })
  } catch (err) {
    console.error(`failed to Load upcoming movie Data: ${err}`);
  }
}
export async function loadNowplayingMovies() {
  console.log('load nowplaying movies');
  try {
    getNowplayingMovies().then(async res=>{
      await nowplayingMovieModel.deleteMany();
      await nowplayingMovieModel.collection.insertMany(res);
      console.info(`${res.length} Now playing Movies were successfully stored.`);
    })
  } catch (err) {
    console.error(`failed to Load movie Data: ${err}`);
  }
}
export async function loadTopratedMovies() {
  console.log('load toprated movies');
  try {
    getTopratedMovies().then(async res=>{
      await topratedMovieModel.deleteMany();
      await topratedMovieModel.collection.insertMany(res);
      console.info(`${res.length} Toprated Movies were successfully stored.`);
    })
  } catch (err) {
    console.error(`failed to Load movie Data: ${err}`);
  }
}
export async function loadPopularActors() {
  console.log('load popular actors');
  try {
    getPopularActors().then(async res=>{
      await actorModel.deleteMany();
      await actorModel.collection.insertMany(res);
      console.info(`${res.length} Popular Actors were successfully stored.`);
    })
  } catch (err) {
    console.error(`failed to Load actors Data: ${err}`);
  }
}
export async function loadSimilarMovies(id) {
  console.log('load similar movies');
  try {
    getSimilarMovies(id).then(async res=>{
      await similarMovieModel.deleteMany();
      await similarMovieModel.collection.insertMany(res);
      console.info(`${res.length}Similar Movies were successfully stored.`);
    })
  } catch (err) {
    console.error(`failed to Load movie Data: ${err}`);
  }
}
export async function loadRecommendMovies(id) {
  console.log('load recommend movies');
  try {
    getRecommendMovies(id).then(async res=>{
      await recommendMoviesModel.deleteMany();
      await recommendMoviesModel.collection.insertMany(res);
      console.info(`${res.length}Recommend Movies were successfully stored.`);
    })
  } catch (err) {
    console.error(`failed to Load movie Data: ${err}`);
  }
}