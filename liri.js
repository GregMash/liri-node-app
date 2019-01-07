const Dotenv = require("dotenv").config();
const Keys  = require('./keys');
const Spotify = require('node-spotify-api');
const Moment = require('moment');


console.log(Keys.spotify);

let spotify = new Spotify(Keys.spotify);

spotify.search({ type: 'track', query: 'All the Small Things', limit: 1 }, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
   
  console.log(data); 
  });

let now = Moment().format('LLLL');
console.log(now);