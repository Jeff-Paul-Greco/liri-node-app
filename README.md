# liri-node-app

Welcome to Liri, the Language Interpretation and Recognition Interface. With this application you can search Spotify for songs, search Bandsintown for upcoming events and search OMDB for movie information. The app is intended to be a broad search tool for the user providing many different functions.

# Instructions:

There are three different types of searches the app can perform:

1.Spotify

By typing "node liri spotify-this-song your-song-title-here" (without quotes, example - node liri spotify-this-song despacito) into the command line, the app will trigger a call to Spotify and return the song's title, artist, album and a link to the song. This info is then passed to a function that displays it on the screen. If no search term is entered after "spotify-this-song", then the default search - "The Sign by Ace of Base" - will be returned.

Demonstration: https://share.getcloudapp.com/YEu875pO

2.OMDB

By typing "node liri movie-this your-movie-search-here" (without quotes, example - node liri movie-this titanic) into the command line, the app will trigger a call to OMDB (Online Movie Database) and return the movies's title, year of release, IMDB rating, Rotten Tomatoes rating, country, languages, plot and actors. This info is then passed to a function that displays it on the screen. If no search term is entered after "movie-this", then the default search - "Mr.Nobody" - will be returned.

Demonstration: https://share.getcloudapp.com/L1uz0LL6

3.Bandsintown

By typing "node liri concert-this your-band-search-here" (without quotes, example - node liri concert-this B-52s) into the command line, the app will trigger a call to Bandsintown and return the artist's five next concerts' venue, location, and date. This info is then displayed on the screen. 

Demonstration: https://share.getcloudapp.com/GGuLmOGr

4.Bonus Functionality

This app also has the ability to read text from a document and then use it in a search. Type "node liri do-what-it-says", without quotes, and the random.txt file in the directory will be read with its contents used as a search query for Spotify. This will return and print to screen "I Want it That Way" the song listed in random.txt.

Demonstration: https://share.getcloudapp.com/v1uAJdqD

# How it Works:

The app utilizes the dotenv, moment, axios, node-spotify-api and fs node package modules to carry out various searches. All API keys are kept out of source control by way of a .env file that is ignored via .gitignore. The Spotify search is triggered when process.argv[2] is equal to "spotify-this-song" and process.argv[3] is not undefined. If process.argv[3] was a valid search query than it will be inserted into the Spotify query URL along with the encrypted key and data will be returned. If the search term was not valid than an error message will be returned. If process.argv[2] is equal to "movie-this" and process.argv[3] IS undefined, then the default search term "The Sign" will be inserted into the URL and searched. The various data points of the returned object are then printed to the screen via console logs.
The OMDB search is triggered when process.argv[2] is equal to "movie-this" and process.argv[3] is not undefined. If process.argv[3] was a valid search query than it will be inserted into the OMDB query URL along with the encrypted key and data will be returned through an axios call. If the search term was not valid than an error message will be returned. If process.argv[2] is equal to "movie-this" and process.argv[3] IS undefined, then the default search term "Mr Nobody" will be inserted into the URL and searched. The various data points of the returned object are then printed to the screen via console logs. Bandsintown is searched when process.argv[2] is equal to "concert-this" and process.argv[3] is not undefined. If process.argv[3] was a valid search query than it will be inserted into the Bandsintown query URL along with the encrypted key and data will be returned. If the search term was not valid than an error message will be returned. If process.argv[2] is equal to "concert-this" and process.argv[3] IS undefined, then nothing will be returned. The various data points of the returned object are then printed to the screen via console logs. The time is formatted using the moment module and moment(exampledate).format("MM/DD/YYYY"). The "node liri do-what-it-says" command demonstrates the app's abilty to read and parse information from outside files. Random.txt is read by the program and then split, on the comma, into an array. This information is then sent in another Spotify query URL to return "I Want it That Way", The song listed in random.txt.

# Installation:

To begin, run "npm init -y" on the cloned directory and the "npm install". You will also need your own .env file with your own API keys to make the program work. If you have the necessary keys then create a .env file in the root directory. In the .env file, type the following lines with each new key on a new line SPOTIFY_ID="yourkeyhere", SPOTIFY_SECRET="yourkeyhere", OMDB_KEY="yourkeyhere" and BANDS_KEY="yourkeyhere". make sure all dependant npms have been installed and your keys are valid and you are good to go.