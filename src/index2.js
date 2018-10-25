const express = require('express');
const engine = require('ejs-mate');
const path = require('path');
const morgan = require('morgan');
const passport = require('passport');
const session = require('express-session');
const flash = require('connect-flash');

//Initializations
const app = express();
require('./database');
require('./passport/local-auth'); 

// config
app.set('port',process.env.PORT || 3000);
app.set('views',path.join(__dirname,'views'));
app.engine('ejs',engine);
app.set('view engine','ejs');
app.use('/public',express.static('public'));

// middlewares  
app.use(morgan('dev')); //Proceso de validacion del usuario
app.use(express.urlencoded({extended: false})); //integración con json
app.use(session({
    secret: 'topSecret',
    resave: false,
    saveUninitialized: false
}));
app.use(flash()); //despues de sesiones y antes de passport 
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
    app.locals.signupMessage = req.flash('signupMessage');
    app.locals.signinMessage = req.flash('signinMessage');
    app.locals.user = req.user;
    console.log(app.locals);
    next();
});

// routes
app.use('/', require('./routes/index'));

//inicio
app.listen(app.get('port'), function(){
    console.log('Servidor iniciado',app.get('port'));
});