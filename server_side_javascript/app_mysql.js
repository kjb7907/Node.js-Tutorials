var express = require('express'); //익스프레스 로드
var bodyParser = require('body-Parser'); //body-Parser 미들웨어 로드(post방식데이터 받기)
var multer = require('multer'); //multer 로드(파일업로드)
var _storage = multer.diskStorage({ //파일업로드 옵션
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); //파일업로드 경로
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); //파일업로드명
  }
});
var upload = multer({ storage: _storage });
var fs = require('fs');//fs 모듈 로드(파일 읽기쓰기)

var mysql = require('mysql'); //mysql 로드(db접근)
var mysql = require('mysql'); //db접속정보
var conn = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'java0000',
  database : 'injava'
});
conn.connect(); //db연결

var app = express();
app.use(bodyParser.urlencoded({ extended: false })); //body-Parser모듈 애플리케이션에 붙이는코드
app.locals.pretty = true; //템플릿 엔진 코드 들여쓰기 적용
app.use('/user', express.static('uploads')); //uploads 폴더 매핑(정적파일위치지정)
app.set('views', './views_mysql'); //템플릿엔진이 있는 디렉터리 명시
app.set('view engine', 'jade'); //템플릿엔진 세팅 express 연결

//파일업로드 폼
app.get('/upload', function(req, res){
  res.render('upload');
});
//파일업로드 요청
app.post('/upload', upload.single('userfile'), function(req, res){
  res.send('Uploaded : '+req.file.filename);
});

//글목록
app.get(['/board/list', '/board/list/:boardNo'], function(req, res){ //글목록&글상세페이지 시멘틱 url
  var sql = 'SELECT board_no,board_title FROM board';
  conn.query(sql, function(err, boards, fields){ //쿼리문실행&쿼리문실행후 실행되는 콜백함수
    var boardNo = req.params.boardNo; //시멘틱 url로 넘어온 boardNo 변수에 저장
    if(boardNo){ //요청에서 boardNo가 넘어온경우
      var sql = 'SELECT * FROM board WHERE board_no=?';
      conn.query(sql, [boardNo], function(err, board, fields){ //넘어온 번호에 해당하는 글 가져오는 쿼리문 실행
        if(err){//에러 발생시
          console.log(err);
          res.status(500).send('Internal Server Error');
        } else {//에러 발생하지 않을시 전체글 + boardNo 해당하는글 view에 전달하며 렌더링
          res.render('view', {boards:boards, board:board[0]});
        }
      });
    } else { //요청에서 boardNo가 넘어오지 않은경우
      res.render('view', {boards:boards}); //전체글만 전달하며 view페이지 렌더링
    }
  });
});

//글 상세보기
app.get(['/board/view', '/board/view/:boardNo'], function(req, res){
  var sql = 'SELECT board_no,board_title FROM board';
   conn.query(sql, function(err, boards, fields){
    var boardNo = req.params.boardNo;
    if(boardNo){
      var sql = 'SELECT * FROM board WHERE board_no=?';
      conn.query(sql, [boardNo], function(err, board, fields){
        if(err){
          console.log(err);
          res.status(500).send('Internal Server Error');
        } else {
          res.render('view', {boards:boards,board:board[0]});
        }
      });
    } else {
      res.render('view', {boards:boards});
    }
  });
});

//글입력 폼
app.get('/board/add', function(req, res){
    res.render('add');
});

//글입력 처리
app.post('/board/add', function(req, res){
  var boardTitle = req.body.boardTitle;
  var boardContent = req.body.boardContent;
  var boardUser = req.body.boardUser;
  var boardPw = req.body.boardPw;
  var sql = 'INSERT INTO board (board_title, board_content,board_User, board_pw,board_date) VALUES(?, ?, ?, ?, now())';
  conn.query(sql, [boardTitle, boardContent,boardUser, boardPw], function(err, result, fields){
    if(err){
      console.log(err);
      res.status(500).send('Internal Server Error');
    } else {
      res.redirect('board/list'+result.insertId);
    }
  });
});

//업데이트 폼
app.get(['/board/:boardNo/edit'], function(req, res){
    var boardNo = req.params.boardNo;
    if(boardNo){
      var sql = 'SELECT * FROM board WHERE board_no=?';
      conn.query(sql, [boardNo], function(err, board, fields){
        if(err){
          console.log(err);
          res.status(500).send('Internal Server Error');
        } else {
          res.render('edit', {board:board[0]});
        }
      });
    } else {
      console.log('There is no id.');
      res.status(500).send('Internal Server Error');
    }

});

//업데이트 처리
app.post(['/board/:boardNo/edit'], function(req, res){
  var boardTitle = req.body.boardTitle;
  var boardContent = req.body.boardContent;
  var boardUser = req.body.boardUser;
  var boardNo = req.params.boardNo;
  var sql = 'UPDATE board SET board_title=?, board_content=?, board_User=? WHERE board_no=?';
  conn.query(sql, [boardTitle, boardContent, boardUser, boardNo], function(err, result, fields){
    if(err){
      console.log(err);
      res.status(500).send('Internal Server Error');
    } else {
      res.redirect('/board/view/'+boardNo);
    }
  });
});



//포트 리스닝
app.listen(3000, function(){
  console.log('Connected, 3000 port!');
});
