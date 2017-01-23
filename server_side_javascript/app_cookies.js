var express = require('express');
var cookieParser = require('cookie-parser'); //cookie-parser로드
var app = express();
app.use(cookieParser('3231ddas'));  //cookie-parser 모듈 사용
//암호와 인자 키값 전달
var products = { //products 배열객체생성
  1:{title: 'The history of web 1'},
  2:{title: 'the next web'}
};

//product list
app.get('/products', function(req,res){
  console.log('/products');
  var output='';

  for(var name in products){ //products 배열객체의 값들을 반복하는 for in 문
    output += `
      <li>
        <a href ="/cart/${name}">${products[name].title}</a>
      </li>`

  }
  res.send(`<h1>Products list</h1><ul>${output}</ul><a href ="/cart">Cart</a>`);
});

//cart 에 product 쿠키로 product 저장
app.get('/cart/:id', function(req,res){
  var id = req.params.id; //시맨틱url로넘어온 id 저장
  if(req.signedCookies.cart){ //쿠키에 저장된 cart 가 존재할경우
    var cart = req.signedCookies.cart; //cart변수에 cart 쿠키 저장
  } else { //쿠키에 cart가 존재하지 않는경우
    var cart={}; //cart 변수 초기화
  }

  if(!cart[id]){ //cart[id] 배열에 값이 없으면
    cart[id] = 0; //0으로 초기화
  }

  cart[id] = parseInt(cart[id])+1; //id값에 해당하는 배열 +1 증가
  res.cookie('cart',cart,{signed:true}) //쿠키에 cart 전달
  res.redirect('/cart'); //cart list 로 이동
});

//cart list cart에 저장된 쿠키 값 view
app.get('/cart', function(req, res){
  var cart = req.signedCookies.cart; //쿠키 값 받아옴
  if(!cart) { //쿠키에 cart 값이 없다면
    res.send('Empty!');
  } else { //쿠키에 cart 값이 있다면
    var output = '';
    for(var id in cart){
      output += `<li>${products[id].title} (${cart[id]})</li>`;
    }
  }
  res.send(`
    <h1>Cart</h1>
    <ul>${output}</ul>
    <a href="/products">Products List</a>
  `);
});

app.get('/count',function(req,res){
  if(req.signedCookies.count){ // signedCookies 는 암호화된 쿠키를 해독한 값을 가져올 수 있다.
    var count = parseInt(req.signedCookies.count);
  }else {
    var count = 0;
  }

  count = count+1;
  res.cookie('count',count,{signed:true}); //인자로 true 값 전달
  res.send('count : '+req.signedCookies.count);
});


app.listen(3003, function(){
  console.log('Connected 3003 port');
});
