var express = require('express');
var multer = require('multer');
var path = require('path');
var usrmdl = require('../datamodules/userdata');
var router = express.Router();
var userdata = usrmdl.find({});
// var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

function checkLogin(req,res,next){
  try {
    var userToken = localStorage.getItem('userToken');
    var decoded = jwt.verify(token, 'userToken');
  } catch(err) {
    res.redirect('/login');
  }
}

if (typeof localStorage === "undefined" || localStorage === null) {
  var LocalStorage = require('node-localstorage').LocalStorage;
  localStorage = new LocalStorage('./scratch');
}

function chkEmailDup( req, res, next){
  var email=req.body.email;
  var chkexstemail = usrmdl.findOne({email:email});
 
  chkexstemail.exec((err,data)=>{
    if (err) {
      res.render('signup',{});
    }
    if (data){
     res.render('signup', {success: 'Email alreasy exists try with another email', msg:'Email already exists'});
    }
    console.log(req.email);
    return next();
  });
}
function chkNameDup( req, res, next){
  var name=req.body.name;
  var chkexstname = usrmdl.findOne({name:name});
  chkexstname.exec((err,data)=>{
    if (err) {
      res.render('signup',{success:''});
    }
    if (data){
     res.render('signup', {success: 'Name alreasy exists try with right name', msg:'Email already exists'});
    }
    console.log(req.name);
    return next();
  });
}

router.use(express.static(__dirname+"./public/"));

// var strg = multer.diskStorage({
//   destination:function (req, file, cb) {
//   cb (null, "./public/uploads/")},
//   filename: (req,file,cb)=>{
//     cb(null,file.fieldname+path.extname(file.originalname));
//   }
// });

// var upload = multer({
//   storage: strg
// })

router.get('/', function (req , res , next )
{
  userdata.exec(function(err , data){
    if(err) throw err;
    res.render('myweb',{records:data});
  });
});
router.get('/myweb', function (req , res)
{
  userdata.exec(function(err , data){
    if(err) throw err;
    res.render('myweb',{});
  });
});
router.get('/login', function (req , res)
{
    res.render('login',{success:''} );
});
router.get('/logout', function (req , res)
{
    localStorage.removeItem('userToken');
    localStorage.removeItem('loginUser');
    res.redirect('/myweb');
});
router.get('/signup', function (req , res)
{
    res.render('signup',{success:''});
});
router.get('/lrslt', checkLogin , function (req , res)
{
    var records=localStorage.getItem('loginUser');
    res.render('lrslt', {records:data});
});
router.get('/obj', function (req , res)
{
    res.render('obj',{});
});
router.get('/mot', function (req , res)
{
    res.render('mot',{});
});
router.get('/ins', function (req , res)
{
    res.render('ins',{});
});
router.get('/rol', function (req , res)
{
    res.render('rol',{});
});
router.get('/cntrb', function (req , res)
{
    res.render('cntrb',{});
});
router.get('/profile', function (req , res)
{
    res.render('profile',{});
});
router.post('/signup',chkNameDup,chkEmailDup, function(req , res , next) {
  var name=req.body.name;
  var email=req.body.email;
  var cno=req.body.cno;
  var dob=req.body.dob;
  var password=req.body.password;
  var cpassword=req.body.cpassword;
  if(password != cpassword){
    res.render('signup', {success: 'Password and confirm password does not match'});
  }
  else {
    password = bcrypt.hashSync(req.body.password,10);
    cpassword = bcrypt.hashSync(req.body.cpassword,10);
    console.log(password);
    var userdetails = new usrmdl({
    name: req.body.name,
    email: req.body.email,
    cno: req.body.cno,
    dob: req.body.dob,
    password: req.body.password,
    cpassword: req.body.cpassword,
});

userdetails.save(function(err , res1){
    if(err) throw err;
    res.render('login',{success:'SIGNED IN SUCCESSFULLY...PLEASE LOGIN TO CONTINUE'});
});
  }
});

router.post('/login', function(req,res) {
console.log(req.body);

var fltrEmail = req.body.email;
var fltrPass = req.body.password;
if(fltrEmail != '' && fltrPass != '' ){
  var fltrParam = { $and:[{ email:fltrEmail },{ password:fltrPass }]};
}
else{
  var fltrParam ={};
}
var userfilter = usrmdl.findOne( fltrParam );
    userfilter.exec((err , data )=>{
      if(err) {
          res.render('login',{success: 'Invalid usename or password'});
      }
      else {
      var getUserID = data._id;
      var name = userfilter.findOne( {name : name});
      var token = jwt.sign({ userID : getUserID }, 'Login Token');
      localStorage.setItem('userToken', token);
      localStorage.setItem('loginUser', name);
      res.render('lrslt',{ records: data });
      }
    });
});
router.post('/lrslt', function(req,res) {
  userdata.exec(function(err , data){
    if(err) throw err;
  res.render('cntrb',{records:data});
});
});
router.post('/cntrb', function(req,res) {
  res.render('myweb',{records:''});
});
router.post('/profile' ,function(req , res, next){
  console.log("uploaded");
  // var success = req.file.filename + "uploaded successfully";
  res.render('profile', { });
});
module.exports = router;
