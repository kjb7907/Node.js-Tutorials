var express = require('express');
var app = express();
var bodyParser = require('body-parser'); //post방식 데이터를 사용하게해주는 bodyParser 모듈 로드

app.use(bodyParser.urlded({ extended: true })); //bodyParser모듈을 애플리케이션 객체에 붙이는코드

app.locals.pretty = true; //템플릿 엔진 코드에 들여쓰기 적용해주는 코드
app.set('view engine','jade'); //템플릿 엔진을 세팅하고 express와 연결하는 코드
app.set('views','./views');  //정적인 파일이 위치할 디렉터리를 지정하는 코드

app.get('/form',function(req,res){ //form 화면으로 보내는 라우터
  res.render('form');
});

app.post('/form_receiver',function(req,res){ //post 방식의 요청을 받는 라우터
  var title = req.body.title;
  var description = req.body.description;
  res.send(title+' '+description);
});
app.listen(3000,function(){
console.log('Connected 3000 port');
});
