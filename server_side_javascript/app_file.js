var express = require('express');
var fs = require('fs');
var bodyParser = require('body-Parser');
var multer = require('multer');
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/') //경로
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})
var upload = multer({ storage: storage });

var app = express();

app.use(bodyParser.urlencoded({ extended : true}));
app.locals.pretty = true;
app.set('views','views_file');
app.set('view engine','jade');

app.get('/upload',function(req,res){
  console.log('upload GET')
  res.render('upload');
});
app.post('/upload',upload.single('userfile'),function(req,res){
  console.log('upload POST')
  console.log(req.file);
  res.send('uploaded : '+req.file.filename)
});

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
