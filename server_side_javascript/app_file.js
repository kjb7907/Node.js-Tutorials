var express = require('express');
var app = express();
var fs = require('fs');
var bodyParser = require('body-Parser');

app.use(bodyParser.urlencoded({ extended : true}));
app.locals.pretty = true;
app.set('views','views_file');
app.set('view engine','jade');

app.get('/topic/new',function(req,res){
  res.render('new');
});
app.post('/topic',function(req,res){
  var title = req.body.title;
  var description = req.body.description;
  console.log(title+'타이틀값');
  console.log(description+'디스크립션값');
  fs.writeFile('data/'+title,description,function(err){
    if(err){
      console.log('에러발생');
      console.log(err);
      res.status(500).send('internal server error');
    }
    res.send('sucess');
  });
});
app.listen(3000,function(){
  console.log('Connected, 3000 port!');
});
