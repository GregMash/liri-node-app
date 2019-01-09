//========================== Global Variables =============================================

//require various packages for application to run
const Dotenv = require("dotenv").config();
const Keys = require('./keys');
const Spotify = require('node-spotify-api');
const Moment = require('moment');
const axios = require('axios');
const fs = require('fs');
//format for using the current time displayed for each call
let now = Moment().format('LLLL');
//this will grab the command and its parameters from the user input
let [node, file, command, ...parameters] = process.argv;
// this will be used to write the result to the logged file every time a command is executed
let output;

//=============================== Functions =============================================

//this function will use parameters to search spotify for information on song and return it to bash/terminal line and log.txt file
function spotifyThis() {
  const spotify = new Spotify(Keys.spotify);
  if (parameters === []) {
    parameters = "The Sign Ace of Base";
  };
  spotify.search({ type: 'track', query: parameters, limit: 5 }, function (err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    };
    const songs = data.tracks.items;
    console.log(`
    ---------------Your Spotify search on ${now}------------`);
    for (let i = 0; i < songs.length; i++) {
      output = (`
Song Name: ${songs[i].name}
Artist: ${songs[i].artists[0].name}
Album: ${songs[i].album.name}
Preview Link: ${songs[i].preview_url}
            `);
      console.log(output);
    };
    console.log(`     
    ----------------------------------------------------------------------------------`);
    fs.appendFile('log.txt', output, err => {
      if (err) {
        console.log(err);
      } else {
        console.log("Added result to file: log.txt");
      }
    });
  });
};

//this function will use axios call and get data back from omdb and return it to bash/terminal line and log.txt file
function getMovie() {
  if (parameters === []) {
    parameters = "Mr. Nobody";
  };
  axios.get(`http://www.omdbapi.com/?t=${parameters}&apikey=${Keys.omdb.id}`)
    .then(
      function (response) {
        const { Title, Year, imdbRating, Ratings, Country, Language, Plot, Actors } = response.data;
        console.log(`
      ---------------Your movie search on ${now}------------`);
        output = (`
-----------------------------------------------------------------------------------
Movie Title: ${Title}
Year: ${Year}
Country: ${Country}
Language: ${Language}
Actors: ${Actors}
IMDB Rating: ${imdbRating}
Rotten Tomatoes Rating: ${Ratings[2].Value}
Plot: ${Plot}
----------------------------------------------------------------------------------`);
        console.log(output);
        fs.appendFile('log.txt', output, err => {
          if (err) {
            console.log(err);
          } else {
            console.log("Added result to file: log.txt");
          }
        });
      });
};

//this function will run all commands in the random.txt file
function doWhatItSays() {
  fs.readFile('random.txt', 'utf-8', function (err, data) {
    if (err) {
      console.log(err)
    };
    const dataArray = data.split('\n');
    for (let i = 0; i < dataArray.length; i++) {
      let separateData = dataArray[i].split(',');
      command = separateData[0];
      parameters = separateData[1];
      if (command === "spotify-this") {
        spotifyThis();
      } else if (command === "movie-this") {
        getMovie();
      };
    };
  });
};

//============================== Main Process =============================================

//the switch case for when the user enters both valid and invalid commands 
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