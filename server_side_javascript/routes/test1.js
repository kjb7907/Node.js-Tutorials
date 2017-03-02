module.exports = function(app){
  var express = require('express');
  var route = express.Router();
  route.get('/r1', function(req, res){
    res.send('Hello /test1/r1');
  });
  route.get('/r2', function(req, res){
    res.send('Hello /test1/r2');
  });
  app.get('/test3/r1', function(req, res){
    res.send('Hello /test3/r1');
  });
  return route;
};
