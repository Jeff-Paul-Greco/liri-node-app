require("dotenv").config();
require("moment")
var axios = require("axios");
var inquirer = require("inquirer");
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');

var omdbKey = process.env.OMDB_KEY;


var spotify = new Spotify(keys.spotify);

//Spotify section. captures spotify-this-song input and searches API
if (process.argv[2] === "spotify-this-song" && process.argv[3] !== undefined) {

    var search = process.argv[3];

    spotify.search({ type: 'track', query: search }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }

        console.log("===========================================");
        console.log("Song: " + data.tracks.items[0].name);
        console.log("Artist: " + data.tracks.items[0].artists[0].name);
        console.log("Album: " + data.tracks.items[0].album.name);
        console.log("Link: " + data.tracks.items[0].artists[0].external_urls.spotify);
        console.log("===========================================");
    });

    //Default return if no search query is entered after spotify-this-song
} else if (process.argv[2] === "spotify-this-song" && process.argv[3] === undefined) {
    spotify.search({ type: 'track', query: "the sign ace of base" }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }

        console.log("===========================================");
        console.log("Song: " + data.tracks.items[0].name);
        console.log("Artist: " + data.tracks.items[0].artists[0].name);
        console.log("Album: " + data.tracks.items[0].album.name);
        console.log("Link: " + data.tracks.items[0].artists[0].external_urls.spotify);
        console.log("===========================================");

    });
}

//movie-this OMDB API call
if (process.argv[2] === "movie-this" && process.argv[3] !== undefined) {

    var search = process.argv[3];

    axios.get("http://www.omdbapi.com/?t=" + search + "&y=&plot=short&apikey=" + omdbKey).then(
        function (response) {

            console.log("===========================================");
            console.log("Title: " + response.data.Title);
            console.log("Released: " + response.data.Year);
            console.log("IMDB Rating: " + response.data.Ratings[0].Value);
            console.log("Rotten Tomatoes: " + response.data.Ratings[1].Value);
            console.log("Country: " + response.data.Country);
            console.log("Language: " + response.data.Language);
            console.log("Plot: " + response.data.Plot);
            console.log("Actors: " + response.data.Actors);
            console.log("===========================================");
        }
    );

} else if (process.argv[2] === "movie-this" && process.argv[3] === undefined) {
    axios.get("http://www.omdbapi.com/?t=mr+nobody&y=&plot=short&apikey=" + omdbKey).then(
        function (response) {

            console.log("===========================================");
            console.log("Title: " + response.data.Title);
            console.log("Released: " + response.data.Year);
            console.log("IMDB Rating: " + response.data.Ratings[0].Value);
            console.log("Rotten Tomatoes: " + response.data.Ratings[1].Value);
            console.log("Country: " + response.data.Country);
            console.log("Language: " + response.data.Language);
            console.log("Plot: " + response.data.Plot);
            console.log("Actors: " + response.data.Actors);
            console.log("===========================================");
        }
    );
}