var title = '';

var Twitter = require('twitter'); //requiring npm Twitter package
var keys = require("./keys.js");  //importing key info from keys file

//set variables from the keys
var consumer_key = keys.twitterKeys.consumer_key;
var consumer_secret = keys.twitterKeys.consumer_secret;
var access_token_key = keys.twitterKeys.access_token_key;
var access_token_secret = keys.twitterKeys.access_token_secret;
// console.log(consumer_key)


var client = new Twitter({
	consumer_key: consumer_key,
	consumer_secret: consumer_secret,
	access_token_key: access_token_key,
	access_token_secret: access_token_secret
})

// constructor to call twitter data
function tweets() {
	var params = {screen_name: 'julie_burk', count: 2};
	client.get('statuses/user_timeline', params, function(error, tweets, response) {
	  if (!error) {
	    for (i=0; i<tweets.length; i++){
	      console.log("");
	      console.log(tweets[i].created_at);
	      console.log(tweets[i].text);
	      console.log("--------------------------");
		}
	  }
	});
};




// Constructor (object in a function) to call spotify data
function spotify() {
  var spotify = require('spotify');
	spotify.search({type: 'track', query: title}, function(err, data) {
	    if ( err ) {
	        console.log('Error occurred: ' + err);
	        return;
	    }
	    else {
		      // Artist(s)
		      // The song's name
		      // A preview link of the song from Spotify
		      // The album that the song is from
		    for (i=0; i<data.tracks.items.length; i++){
		    console.log('');
		    console.log("Artist Name: " + data.tracks.items[i].artists[0].name);
		    console.log("Track Name: " + data.tracks.items[i].name);
		    console.log("Album Name: " + data.tracks.items[i].album.name);
		    console.log("Preview Link: " + data.tracks.items[i].preview_url);
		    }
	    }

	});

};

function movie() {
// NMP request package
var request = require("request");
// Store all of the arguments in an array
var nodeArgs = process.argv;
// Create an empty variable for holding the movie name
var movieName = "";
// Loop through all the words in the node argument
// And do a little for-loop magic to handle the inclusion of "+"s
for (var i = 3; i < nodeArgs.length; i++) {
  if (i > 3 && i < nodeArgs.length) {
    movieName = movieName + "+" + nodeArgs[i];
  }
  else {
    movieName += nodeArgs[i];
  }
}
// Then run a request to the OMDB API with the movie specified
var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&tomatoes=true&y=&plot=short&r=json";
// This line is just to help us debug against the actual URL.
// console.log(queryUrl);
request(queryUrl, function(error, response, body) {
	// console.log(error, response)
  // If the request is successful
  if (!error && response.statusCode === 200) {
// put json.parse into a var, make code more readable
var movieData = JSON.parse(body)

    console.log("Movie Name: " + movieData.Title);
    console.log("Released: " + movieData.Year);
    console.log("IMDB Rating: " + movieData.imdbRating);
    console.log("Language: " + movieData.Language);
    console.log("Origin: " + movieData.Country);
    console.log("Plot: " + movieData.Plot);
    console.log("Actors: " + movieData.Actors);
    console.log("Tomato Meter: " + movieData.tomatoRating);
    console.log("Tomato URL: " + movieData.tomatoURL);
  }
});
}




function random() {
  // fs is an NPM package for reading and writing files
var fs = require("fs");


// It's important to include the "utf8" parameter or the code will provide stream data (garbage)
// The code will store the contents of the reading inside the variable "data"
fs.readFile("random.txt", "utf8", function(error, data) {

  // Then split it by commas (to make it more readable)
  var output = data.split(",");

  //set variables accordingly
  action = output[0];
  title = output[1];
    if (action === 'spotify-this-song'){
      spotify();
    }
    if (action === 'my-tweet'){
      tweet();
    }
    if (action === 'movie-this'){
      movie();
    }

});

}

var action = process.argv[2];



for (var i = 3; i < process.argv.length; i++) {
  if (i > 3 && i < process.argv.length) {
    title = title + "+" + process.argv[i];
  }
  else {
    title += process.argv[3];
  }
}
//If no movie, return Mr Nobody
if (action === title && process.argv[3] === undefined){
 	title = 'Mr Nobody';
}
// //If there is no song, return the sign
if (action === 'spotify-this-song' && process.argv[3] === undefined){
  title = 'the Sign';
}


if (action === 'my-tweets') {
	tweets();
}



if (action === 'spotify-this-song') {
	spotify();
}



if (action === 'movie-this') {
	movie();
}


if (action === 'do-what-it-says') { 
	random();
}





