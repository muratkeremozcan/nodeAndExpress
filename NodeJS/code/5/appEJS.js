var request = require('request');
// import request from 'request';
// import url from 'url';
var url = require('url');
var express = require('express');
var app = express();

app.get('/tweets/:username', function(req, res) { // /tweets/:username is the app definition
  var username = req.params.username;

  var options = {
    protocol: "http",
    host: 'api.twitter.com',
    pathname: '/1/statuses/user_timeline.json',
    query: {
      screen_name: username,
      count: 10 // get the last 10 tweets for screen_name
    }
  };
  request(url, function(err, res, body) { // call request, with a callback with error response and body
    var tweets = JSON.parse(body);  // parse the JSON, set to tweets variable
    response.locals = {  // what data is going to the template, so we can render the tweets
      tweet: tweets,
      name: username
    };
    response.render('tweets.ejs'); // which template to render out, this embeddedJS
  });
});