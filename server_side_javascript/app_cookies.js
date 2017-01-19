var express = require('express');
var cookieParser = require('cookie-parser'); //cookie-parser로드
var app = express();
app.use(cookieParser());  //cookie-parser 모듈 사용


var products = {
  1:{title: 'The history of web 1'},
  2:{title: 'the next web'}
};
app.get('/products', function(req,res){
  var output='';
  for(var name in products){
    output += `
      <li>
        <a href ="/cart/${name}">${products[name].title}</a>
      </li>`

  }
  res.send(`<ul>${output}</ul><a href ="/">Cart</a>`);
});



app.get('/count',function(req,res){
  if(req.cookies.count){
    var count = parseInt(req.cookies.count);
  }else {
    var count = 0;
  }

  count = count+1;
  res.cookie('count',count);
  res.send('count : '+req.cookies.count);
});


app.listen(3000, function(){
  console.log('Connected 3000 port');
});
