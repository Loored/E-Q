var express = require('express');
var router = express.Router();
const passport = require('passport');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
  // res.render('index', { title: 'Express' });
});

router.get('/signup',function(req,res,next){
  res.render('signup');
  // res.end("It's up");
});

router.post('/signup', passport.authenticate('local-signup',{
  successRedirect: '/profile',
  failureRedirect: '/signup',
  failureFlash: true
}));

router.get('/signin',function(req,res,next){
  res.render('signin');
});

router.post('/signin', passport.authenticate('local-signin', {
  successRedirect: '/profile',
  failureRedirect: '/signin',
  failureFlash: true
}));


// Depsues de aqui estan restricciones / protegidas

router.get('/profile', isAuthenticated, function (req, res, next) {
  res.render('profile');
});

router.get('/logout', (req, res, next) => {
  req.logout();
  res.redirect('/');
});

function isAuthenticated(req, res, next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect('/')
}

module.exports = router;
