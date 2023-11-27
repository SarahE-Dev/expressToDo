const express = require('express');
const logger = require('morgan');
const app = express();
const path = require('path');
const index = require('./router/index')
const todo = require('./router/todo');
const cors = require('cors');





app.use(logger('dev'));
app.use(express.json());
app.use('/', index);
app.use('/api/todo', todo);
app.use(cors());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

  
  

app.get('/', (req, res)=>{
    res.sendFile(path.join(__dirname, '/index.html'));
})

app.listen(3000, ()=>{
    console.log('Server started on Port 3000.');
});

