var express = require('express');
var router = express.Router();
var fs = require('fs');

var db = 'mongodb+srv://thucVan:thucVan025@thucvan.l9iio.mongodb.net/myData?retryWrites=true&w=majority'
const mongoose = require('mongoose');
mongoose.connect(db).catch(err => {
  console.log("err");
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/add', async function (reg, res){
  res.render('add', {title:'add', message : ''});

  var name = reg.body.ten;
  var deltai = reg.body.noidung;
  var link = reg.body.duongDan;

  //them vao collection : students - database : myData

  //b1 : dinh nghia Schama - tuong duong voi model ben Java
  const studentChema = new mongoose.Schema({
    name : 'string',
    deltai : 'string',
    link : 'string',
  });

  //students la ten cua collection ben database
  const  Student = mongoose.model('students', studentChema);
  //b2 : goi cau lenh them vao database

  const data = new Student({
    name : name,
    deltai : deltai,
    link : link,
  });

  data.save(function (err){
    if(err) return handleError(err);
    res.render('add', {
      title: 'add', message : 'Chúng tôi đã nhận thông tin'
    })
  });
});

router.get('/edit', function (reg, res){
  res.render('edit', {title:'edit'});
});

module.exports = router;
