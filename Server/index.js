var express = require('express')
var cors = require('cors')
const mysql = require('mysql2');

const join = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'moscii'
});

var app = express()
app.use(cors())
app.use(express.json())

app.get('/showdata', function (req, res, next) {
  join.query(
    'SELECT * FROM `data`',
    function(err, results, fields) {
      res.json(results);
    }
  );
})

app.get('/showdata/:id', function (req, res, next) {
  const id = req.params.id;
  join.query(
    'SELECT * FROM `data` WHERE `id` = ?',
    [id],
    function(err, results) {
      res.json(results);
    }
  );
})

app.post('/createdata', function (req, res, next) {
  join.query(
    'INSERT INTO `data`( `name`, `type`, `code`) VALUES (?, ?, ?)',
    [req.body.name, req.body.type, req.body.code],
    function(err, results) {
      res.json(results);
      console.log("Create Data Success")
    }
  );
})

app.put('/updatedata/:id', function (req, res, next) {
  join.query(
    'UPDATE `data` SET `name`= ?, `type`= ?, `code`= ? WHERE id = ?',
    [req.body.name, req.body.type, req.body.code, req.params.id],
    function(err, results) {
      res.json(results);
      console.log("Update Data Success")
    }
  );
})

app.delete('/deletedata/:id', function (req, res, next) {
  join.query(
    'DELETE FROM `data` WHERE id = ?',
    [req.params.id],
    function(err, results) {
      res.json(results);
    }
  );
})

app.listen(5000, function () {
  console.log('Now Server Work on Port 5000')
})