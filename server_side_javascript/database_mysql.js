var mysql = require('mysql');
var conn = mysql.createConnection({
  host     : 'localhost', //db접속 주소
  user     : 'root', //db접속id
  password : 'java0000', //db접속pw
  database : 'injava' //db명
});

conn.connect(); //db접속

var sql = 'INSERT INTO board(board_title,board_user,board_pw,board_content)VALUES(?,?,?,?)';
var params = ['test title','testuser','testpw','testcontent'];
conn.query(sql,params,function(err,rows,fields) {
  if(err){
    console.log(err);
  }else{
    console.log(rows.insertId);
  }
});
conn.end();
