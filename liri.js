require("dotenv").config();
var moment = require("moment")
var axios = require("axios");
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var fs = require("fs");

var omdbKey = process.env.OMDB_KEY;
var bandsKey = process.env.BANDS_KEY;
var spotify = new Spotify(keys.spotify);
var search = process.argv[3];

//function that searches Spotify
var musicSearch = function () {
    spotify.search({ type: 'track', query: search }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        printSong(data);
    });
}
//Spotify section. captures spotify-this-song input and searches API
if (process.argv[2] === "spotify-this-song" && process.argv[3] !== undefined) {

    musicSearch();

    //Default return if no search query is entered after spotify-this-song
} else if (process.argv[2] === "spotify-this-song" && process.argv[3] === undefined) {

    search = "the sign ace of base";
    musicSearch();

}

var printSong = function (data) {
    console.log("===========================================");
    console.log("Song: " + data.tracks.items[0].name);
    console.log("Artist: " + data.tracks.items[0].artists[0].name);
    console.log("Album: " + data.tracks.items[0].album.name);
    console.log("Link: " + data.tracks.items[0].artists[0].external_urls.spotify);
    console.log("===========================================");

}

//movie-this OMDB API call
if (process.argv[2] === "movie-this" && process.argv[3] !== undefined) {

    var search = process.argv[3];

    axios.get("http://www.omdbapi.com/?t=" + search + "&y=&plot=short&apikey=" + omdbKey).then(
        function (response) {
            printMovie(response);
        }
    );

    //Default return if no search query is entered after spotify-this-song 
} else if (process.argv[2] === "movie-this" && process.argv[3] === undefined) {
    axios.get("http://www.omdbapi.com/?t=mr+nobody&y=&plot=short&apikey=" + omdbKey).then(
        function (response) {
            printMovie(response);
        }
    );
}

var printMovie = function (response) {
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

//concert-this Bandsintown API call
if (process.argv[2] === "concert-this" && process.argv[3] !== undefined) {

    var search = process.argv[3];

    axios.get("https://rest.bandsintown.com/artists/" + search + "/events?app_id=" + bandsKey).then(
        function (response) {
            for (i = 0; i < 5; i++) {
                console.log("===========================================");
                console.log("Venue: " + response.data[i].venue.name);
                console.log("Location: " + response.data[i].venue.city + ", " + response.data[i].venue.region + ", " + response.data[i].venue.country);
                console.log("Date: " + moment(response.data[i].datetime).format("MM/DD/YYYY"));
                console.log("===========================================");
            }
        }
    );
}

//reads random.txt and searches contents on spotify
if (process.argv[2] === "do-what-it-says") {

    fs.readFile("random.txt", "utf8", function (error, data) {

        if (error) {
            return console.log(error);
        }

        var dataArr = data.split(",");
        process.argv[3] = dataArr[1].replace("'", /"/);
        process.argv[2] = ("'" + dataArr[0] + "'")
        search = process.argv[3];
        musicSearch();
    });
}