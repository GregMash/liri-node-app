# liri-node-app

## Overview

This project is a NodeJS command line Language Interpretation and Recognition Interface.
It will take in a command and parameters and return to the user results to both your bash/terminal and to the log.txt file.
Currently it can take 3 different commdands: spotify-this, movie-this, and do-what-it-says
Spotify will find you 5 different hits for songs you type in
OMDB will return movie information to you when you search for a movie title
do-what-it-says will take the text from each line of the random.txt file and perform an appropriate action based on the command entered for each line.
*If you simply enter commands without parameters, the program will default to certain songs and movies.
*If you enter an invalid command the program will let you know correct ways of entering valid commands.

## Screenshot(s)
<img width="1440" alt="Screen Shot 2019-01-09 at 3 25 27 AM" src="https://user-images.githubusercontent.com/42223683/55285936-cedfc400-5349-11e9-8053-f1c7754e853d.png">
<img width="1440" alt="Screen Shot 2019-01-09 at 3 27 48 AM" src="https://user-images.githubusercontent.com/42223683/55285937-cedfc400-5349-11e9-8971-b0273034a337.png">
<img width="1440" alt="Screen Shot 2019-01-09 at 3 38 11 AM" src="https://user-images.githubusercontent.com/42223683/55285938-cedfc400-5349-11e9-8d8f-595e5218044d.png">

## Use the Application

-Clone and Navigate your bash/terminal to the directory of the program
-You will need to install packages using npm i followed by each package
-You will need to install axios, node-spotify-API, Moment, DotENV, and fs
-You will also need to obtain your own spotify api keys and your own omdb api key
-Put those keys in a .env file using the following syntax
    -# Spotify and OMDB API keys
    -SPOTIFY_ID=Your_Spotify_ID
    -SPOTIFY_SECRET=Your_Spotify_Secret
    -OMDB_KEY=Your_OMDB_Key
    
  
Then you are free to begin using the program.
*Make sure you always begin your search with: node liri.js command parameters*
    example: node liri.js spotify-this free falling

## Technologies utilized

 - Javascript
 - NodeJS
