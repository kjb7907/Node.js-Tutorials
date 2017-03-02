var express = require('express');
var app = express();

var router1 = require('./routes/test1')(app);
app.use('/test1',router1);

var router2 = require('./routes/test2')(app);
app.use('/test2',router2);

app.listen(3000, function(){
  console.log('Connected 3000 port');
});
