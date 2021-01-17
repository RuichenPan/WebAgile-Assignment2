# Assignment 2 - Web API.

Name: Ruichen Pan

## Features.

 
 + Feature 1 - new API routes, including a parameterised URL.
 + Feature 2 - Mongo integration.
 + Feature 3 - React integration(GET POST and Delete Pust data to API)
 + Feature 4 - Coherent API design and modelling supporting full manipulation of resources.
 + Feature 5 - Nested Document and/or object referencing in Mongo/Mongoose.
 + Feature 6 - Custom validation using Mongoose.
 + Feature 7 - Basic Authentication and protected routes.
 + Feature 8 - Good use of express middleware (e.g. Error handling).
 + Feature 9 - Substantial React App integration.
 + Feature 10 - Authentication/verification to accomplish richer functionality.
 + Feature 11 - Swagger API documentation (I have added the swagger in my project, but I don't have enough time to write the whole document)
 + Feature 12 - Logging

## Installation Requirements

Describe what needs to be on the machine to run the API (Node v?, NPM, MongoDB instance). 

Describe getting/installing the software, perhaps:

```bat
git clone http:\myrepo.git
```

followed by installation

```bat
git install
```

## API Configuration

```bat
NODE_ENV=development
PORT=8080
HOST=localhost
SEED_DB=true
mongoDB=mongodb+srv://RuichenPan:123321@rcpan-cluster.5fl25.mongodb.net/RuichenPan?retryWrites=true&w=majority
SECRET=ilikecake
```


## API Design
Give an overview of your web API design, perhaps similar to the following: 

|  |  GET | POST | PUT | DELETE
| -- | -- | -- | -- | -- 
| /api/movies |Gets a list of movies | N/A | N/A |
| /api/movies/:id | Get a Movie |  Add movies to watchlist | N/A | N/A
| /api/movies/:id/reviews | Get all reviews for movie | N/A | N/A | N/A  
| /api/genres | Get a list of genres | N/A | N/A | N/A
| /api/users | Get a list of users | N/A | N/A | N/A
| /api/users/:userName/favourites | N/A | Add movies into uses' favourite | N/A | N/A
| /api/users?action=register | N/A | Create an account | N/A | N/A
| /api/users/:id | N/A | N/A | Modify the users account | N/A
| /api/users?action=deleteuser | N/A | N/A | N/A | delete a user from database
| /api/upcoming | Get a list of upcoming Movies | N/A | N/A | N/A
| /api/upcoming/:id | Get an upcoming Movie | Add an upcoming movie to watchlist | N/A | N/A
| /api/watchlist | Get a list of watchlist Movie | N/A | N/A | N/A
| /api/watchlist/:id | Get a watchlist Movie | N/A | N/A | delete a movie from watchlist database
| /api/nowplaying | Get a list of nowplaying Movie | N/A | N/A | N/A
| /api/nowplaying/:id | Get a nowplaying Movie | N/A | N/A | N/A
| /api/toprated | Get a list of toprated Movie | N/A | N/A | N/A
| /api/toprated/:id | Get a toprated Movie | N/A | N/A | N/A
| /api/actors | Get a list of popular actors  | N/A | N/A | N/A
| /api/actors/:id | Get an actor  | Add an actor to favourite actor database | N/A | N/A
| /api/favouriteactors | Get a list of favourite actors  | N/A | N/A | N/A
| /api/favouriteactors/:id | Get an favourite actor  | N/A | N/A | Delete an actor from favourite actor database
| /api/similar/:id | Get a list of similar Movies according to this id | N/A | N/A | N/A
| /api/recommend/:id | Get a list of recommend Movies according to this id | N/A | N/A | N/A


I have added the swagger in my project, but I don't have enough time to write the whole document


## Security and Authentication
favouriteactors API and watchlist API need authentication.
After login then user can request for the api successfully

/api/favouriteactors
/api/watchlist


## Integrating with React App


~~~Javascript
export const getMovies = () => {
  return fetch(
     '/api/movies',{headers: {
       'Authorization': window.localStorage.getItem('token')
    }
  }
  ).then(res => res.json());
};

~~~
~~~Javascript
export const MovieLogin = (username, password) => {
  return fetch('/api/users', {
      headers: {
          'Content-Type': 'application/json'
      },
      method: 'post',
      body: JSON.stringify({ username: username, password: password })
  }).then(res => res.json())
};
~~~
~~~Javascript
export const getUpcomingMovies = () => {
  return fetch(
    '/api/upcoming',{headers: {
      'Authorization': window.localStorage.getItem('token')
   }
 }
 ).then(res => res.json());
};
~~~
~~~Javascript
export const getTopRatedMovies = () => {
  return fetch(
    '/api/toprated',{headers: {
      'Authorization': window.localStorage.getItem('token')
   }
 }
 ).then(res => res.json());
};
~~~
~~~Javascript
export const getSimilarMovies = (movie_id) => {
  return fetch(
    `/api/similar/${movie_id}`,{headers: {
      'Authorization': window.localStorage.getItem('token')
   }
 }
 ).then(res => res.json());
};
~~~
~~~Javascript
export const getRecommendMovies = (movie_id) => {
  return fetch(
    `/api/recommend/${movie_id}`,{headers: {
      'Authorization': window.localStorage.getItem('token')
   }
 }
 ).then(res => res.json());
};
~~~
~~~Javascript
export const getNowPlayingMovies = () => {
  return fetch(
    '/api/nowplaying',{headers: {
      'Authorization': window.localStorage.getItem('token')
   }
 }
 ).then(res => res.json());
};
~~~
~~~Javascript
export const getPopularActors = () => {
  return fetch(
    '/api/actors',{headers: {
      'Authorization': window.localStorage.getItem('token')
   }
 }
 ).then(res => res.json());
};
~~~
~~~Javascript
export const getActor = id => {
  return fetch(
    `/api/actors/${id}`,{headers: {
      'Authorization': window.localStorage.getItem('token')
   }
 }
 ).then(res => res.json());
};
~~~



## Independent learning.

Swagger


# Assignment 2 - Agile Software Practice.

Name: RuichenPan

## Target Web API.



+ Get /api/movies - returns an array of movie objects.
+ Get /api/movies/:id - returns detailed information on a specific movie.
+ Post /api/movies/:id - adds a new movie to the watchlist movies database.
+ Get /api/nowplaying - returns an array of nowplaying movie objects
+ Get /api/nowplaying/:id - returns  detailed information on a specific nowplaying movie.
+ Get /api/recommend/:id - returns an array of the recommend movie objects with this ID
+ Get /api/similar/:id - returns an array of the similar movie objects with this ID
+ Get /api/toprated - returns an array of toprated movie objects.
+ Get /api/toprated/:id - returns detailed information on a specific toprated movie.
+ Get /api/upcoming - returns an array of upcoming movie objects.
+ Get /api/upcoming/:id - returns detailed information on a specific upcoming movie.
+ Post /api/upcoming/:id?action=addtowatchlist - adds a new upcoming movie to the watchlist movies database.
+ Get /api/watchlist - returns an array of watchlist movie objects.
+ Get /api/watchlist/:id - returns detailed information on a specific watchlist movie.
+ Delete /api/watchlist/:id?action=deletefromwatchlist - delete a watchlist  movie from the watchlist movies database.
+ Get /api/actors - returns an array of popular actors objects.
+ Get /api/actors/:id - returns detailed information on a specific popular actor.
+ Post /api/actors/:id - adds a new actor to the favourite actors database.
+ Get /api/favouriteactors - returns an array of favourite actors objects.
+ Get /api/favouriteactors/:id - returns detailed information on a specific favourite actor.
+ Delete /api/favouriteactors/:id - deletes an actor from the favourite actors database.
+ Put /api/users/:id - modify the information of an user
+ Post /api/users/:username/favourites - add movies into users' favourite
+ Delete /api/users - deletes users from user database
## Error/Exception Testing.


+ Get /api/favouriteactors - Test when the user without prior authentication. See tests/functional/api/favouriteactors/index.js 
+ Get /api/favouriteactors/:id - Test when the actor id is invalid. See tests/functional/api/favouriteactors/index.js 
+ Get /api/movies/:id - Test when the movie id is invalid. See tests/functional/api/movies/index.js
+ Get /api/nowplaying/:id - Test when the movie id is invalid. See tests/functional/api/nowplayingmovies/index.js
+ Get /api/actors/:id - Test when the actor id is invalid. See tests/functional/api/popularactors/index.js
+ Get /api/toprated/:id - Test when the movie id is invalid. See tests/functional/api/topratedmovies/index.js
+ Get /api/upcoming/:id - Test when the movie id is invalid. See tests/functional/api/upcomingmovies/index.js
+ Delete /api/users?action=deleteuser - Test when username is not exist in database. See tests/functional/api/users/index.js
+ Get /api/watchlist - Test when the user without authentication. See tests/functional/api/watchlistmovies/index.js
+ Get /api/watchlist/:id - Test when the movie id is invalid. See tests/functional/api/watchlistmovies/index.js

## Continuous Delivery/Deployment.

..... Specify the URLs for the staging and production deployments of your web API, e.g.

+ https://movies-api-staging-assignment.herokuapp.com/ - Staging deployment
+ https://movies-api-deploy-assignment.herokuapp.com/ - Production

.... Show a screenshots from the overview page for the two Heroku apps e,g,

+ Staging app overview 

![][stagingapp]

+ Production app overview 

![][deployapp]




[stagingapp]: ./public/stagingassignment.png
[deployapp]: ./public/deployassignment.png