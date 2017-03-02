var express = require('express');
var session = require('express-session'); //세션 모듈 가져오기

var app = express();

app.use(session({ //세션 모듈을 사용할수 있도록 호출
  secret:'123asd2312asd3',
  resave: false,
  saveUnunutualized:true //세션 ID를 실제로 세션을 사용하기전까지 발급하지 않게함
}));

app.get('/count',function(req,res){

  //count1 에 값 저장
  if(req.session.count1){
    req.session.count1++;  //세션 값 증가
  }else{
    req.session.count1=1;  //세션 값 세팅
  }
  //count2 에 값 저장
  if(req.session.count2){
    req.session.count2++;  //세션 값 증가
  }else{
    req.session.count2=1;  //세션 값 세팅
  }

  res.send('count1 : '+req.session.count1+'count2 : '+req.session.count2);
});

//count 1 세션 제거
app.get('/count1Close',function(req,res){
  delete req.session.count1;
  res.redirect('/count');
});

//count 2 세션 제거
app.get('/count2Close',function(req,res){
  delete req.session.count2;
  res.redirect('/count');
});

//세션 종료
app.get('/sessionClose',function(req,res){
  req.session.destroy(function(){});
  res.redirect('/count');
});

app.listen(3000, function(){
  console.log('Connected 3000 port');
});
