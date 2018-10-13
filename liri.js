// load modules and packages
const keys = require("./keys");
const Spotify = require('node-spotify-api');
const request = require("request");
const moment = require('moment');
const fs = require("fs");

// turn on dotenv to load up environments variables for .env file
//require("dotenv").config();

// define variables
const spotify = new Spotify(keys.spotify);
let omdbKey = keys.omdb.id;
let command = process.argv[2].toLowerCase();
let argument = process.argv.slice(3).join(" ").toLowerCase();

// define functions

function outputConcertInfo(eventsInfo) {
  // console.log(eventsInfo);
  for (let i = 0; i < eventsInfo.length; i++) {
    console.log(`Venue Name: ${eventsInfo[i].venue.name}
Venue Location: ${eventsInfo[i].venue.city}, ${eventsInfo[i].venue.region}
Event Date: ${moment(eventsInfo[i].datetime).format("MM/DD/YYYY")}
`);
    writeToLog(`Venue Name: ${eventsInfo[i].venue.name}
Venue Location: ${eventsInfo[i].venue.city}, ${eventsInfo[i].venue.region}
Event Date: ${moment(eventsInfo[i].datetime).format("MM/DD/YYYY")}
`);
  }
};

function outputSongInfo(songInfo) {
  // console.log(songInfo);
  console.log(`Artist: ${songInfo.artists[0].name}
Song Name: ${songInfo.name}
Song preview: ${songInfo.preview_url}
Album: ${songInfo.album.name}
`);
  writeToLog(`Artist: ${songInfo.artists[0].name}
Song Name: ${songInfo.name}
Song preview: ${songInfo.preview_url}
Album: ${songInfo.album.name}
`);
};

function outputMoveInfo(movieInfo) {
  // console.log(movieInfo);
  console.log(`Title: ${movieInfo.Title}
Release Year: ${movieInfo.Year}
IMDB Rating: ${movieInfo.Ratings[0].Value}
Rotten Tomatoes Rating: ${movieInfo.Ratings[1].Value}
County produced in: ${movieInfo.Country}
Language: ${movieInfo.Language}
Plot: ${movieInfo.Plot}
Actors: ${movieInfo.Actors}
`);
  writeToLog(`Title: ${movieInfo.Title}
Release Year: ${movieInfo.Year}
IMDB Rating: ${movieInfo.Ratings[0].Value}
Rotten Tomatoes Rating: ${movieInfo.Ratings[1].Value}
County produced in: ${movieInfo.Country}
Language: ${movieInfo.Language}
Plot: ${movieInfo.Plot}
Actors: ${movieInfo.Actors}
`);
};


function getConcertInfo(artist) {
  if (artist === null || artist === "") {
    artist = "Luke Bryan";
  }
  let queryURL = `https://rest.bandsintown.com/artists/${artist}/events?app_id=codingbootcamp`;
  request(queryURL, function (error, response, body) {
    if (error) {
      return console.log(error);
    }
    if (response.statusCode === 200) {
      if (body.includes("error")) {
        console.log('body:', body);
      } else {
        outputConcertInfo(JSON.parse(body));
      }
    } else {
      console.log('statusCode:', response.statusCode);
      console.log('body:', body);
    }
  });
};

function runSpotify(song) {
  if (song === null || song === "") {
    song = "The Sign";
  }
  spotify
    .search({ type: 'track', query: song })
    .then(function (response) {
      // console.log(response.tracks.items[0]);
      outputSongInfo(response.tracks.items[0]);
    })
    .catch(function (err) {
      console.log(err);
    });
};

function getMovieInfo(movie) {
  if (movie === null || movie === "") {
    movie = "Mr. Nobody";
  }
  let queryURL = `http://www.omdbapi.com/?apikey=${omdbKey}&t=${movie}`
  request(queryURL, function (error, response, body) {
    if (error) {
      return console.log(error);
    }
    if (response.statusCode === 200) {
      if (body.includes("Error")) {
        console.log('body:', body);
      } else {
        let movieInfo = JSON.parse(body);
        // console.log('body:', body);
        outputMoveInfo(movieInfo);
      }
    } else {
      console.log('statusCode:', response.statusCode);
      console.log('body:', body);
    }
  });
};

function runFile(fileName) {
  if (fileName === null || fileName === "") {
    fileName = "random.txt";
  }
  // console.log(fileName);

  fs.readFile(fileName, "utf8", function (error, data) {
    // If the code experiences any errors it will log the error to the console.
    if (error) {
      return console.log(error);
    }
    // console.log(data);
    let newCommand = data.split(" ");
    let nextCommand = newCommand[0].toLowerCase();
    let nextArgument = newCommand.slice(1).join(" ").toLowerCase();
    runCommand(nextCommand, nextArgument);
  });
};

function writeToLog(msg) {
  fs.appendFile("log.txt", msg, function (error) {
    if (error) {
      return console.log(error);
    }
  })
};


function runCommand(action, item) {
  writeToLog(`
${action} ${item}
`);
  switch (action) {
    case "concert-this":
      getConcertInfo(item);
      break;
    case "spotify-this-song":
      runSpotify(item);
      break;
    case "movie-this":
      getMovieInfo(item);
      break;
    case "do-what-it-says":
      runFile(item);
      break;
    default:
      console.log("Invalid command, try again");
  };
}

runCommand(command, argument);
