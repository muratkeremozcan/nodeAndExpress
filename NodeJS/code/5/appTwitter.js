// var request = require('request');
import request from 'request';
var url = require('url');
// import url from 'url';
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
  var twitterUrl = url.format(options);
  request(twitterUrl).pipe(response); // pipe request to response
});