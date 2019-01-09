//========================== Global Variables =============================================
const Dotenv = require("dotenv").config();
const Keys = require('./keys');
const Spotify = require('node-spotify-api');
const Moment = require('moment');
const axios = require('axios');
//format for using the current time displayed for each call
let now = Moment().format('LLLL');
//this will grab the command and its parameters from the user input
const [node, file, command, ...parameters] = process.argv;


//========================== Functions =============================================
function spotifyThis() {
  const spotify = new Spotify(Keys.spotify);
  spotify.search({ type: 'track', query: parameters, limit: 7 }, function (err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    };
    const songs = data.tracks.items;
    console.log(`
    
    ---------------Your Spotify search on ${now}------------`);
    for (let i = 0; i < songs.length; i++) {
      console.log(`
Song Name: ${songs[i].name}
Artist: ${songs[i].artists[0].name}
Album: ${songs[i].album.name}
Preview Link: ${songs[i].preview_url}
      `);
    };
    console.log('     ----------------------------------------------------------------------------------');
  });
};


function getMovie() {
  axios.get(`http://www.omdbapi.com/?t=${parameters}&apikey=${Keys.omdb.id}`)
    .then(
      function (response) {
        //console.log(response.data);
        const {Title, Year, imdbRating, Country, Language, Plot, Actors}  = response.data
        console.log(`
    
      ---------------Your movie search on ${now}------------`);
        console.log(`
Movie Title: ${Title}
Year: ${Year}
Country: ${Country}
Language: ${Language}
Actors: ${Actors}
IMDB Rating: ${imdbRating}
Rotten Tomatoes Rating: ${imdbRating}
Plot: ${Plot}
      ----------------------------------------------------------------------------------`);
      }
    );
};


function doWhatItSays() {

};

//========================== Main Process =============================================

switch (command) {
  case 'spotify-this':
    spotifyThis();
    break;
  case 'movie-this':
    getMovie();
    break;
  case 'do-what-it-says':
    doWhatItSays();
    break;
  default: console.log(`
            ****Invalid Command****. 
  
  Valid_Commands:   node liri.js spotify-this
                    node liri.js movie-this
                    node liri.js do-what-it-says
  `);
    break;
};