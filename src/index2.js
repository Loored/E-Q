const express = require('express');
const engine = require('ejs-mate');
const path = require('path');
const morgan = require('morgan');
const passport = require('passport');
const session = require('express-session');
const flash = require('connect-flash');



//Initializations
const app = express();
const server = require('http').Server(app).listen(3000);
const io = require('socket.io').listen(server);
require('./database');
require('./passport/local-auth'); 

// config
// app.set('port',process.env.PORT || 3001);
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



// IO
// Establecimiento de sockets activos y serialport
io.on('connection',function(socket){
    console.log("nueva conexion");
    io.sockets.emit('lectura',5);
    io.sockets.emit('ta',128);
});




var serialport = require('serialport');
var Serialport = serialport.SerialPort;

console.log('Inicio de puerto serial');

const Readline = require('@serialport/parser-readline');
// COM4
var myport = new serialport("COM4",{
    // baudRate:9600,
    baudRate:115200,
});


const parser = myport.pipe(new Readline({delimiter:'\r\n'}));
parser.on('data',onData);

function onData(dato){
    
    console.log(dato);
    
    var ejex= 0,ejey= 0,ejez= 0,temp= 0,cordenadax= 0,cordenaday= 0,flag_negativo=0;
    let contador = 0;
    // console.log(dato[contador]);
    if(dato[contador]=='-'){
        flag_negativo = 1;
        contador++;
    }
    while(dato[contador]!=','){
        ejex = ejex + (dato[contador]);
        contador++;
    }
    if(flag_negativo){
        ejex=ejex*-1;
        flag_negativo=0;
    }

    contador++;
    console.log("asda "+dato[contador]);
    // if(dato[contador]=='-'){
    //     flag_negativo = 1;
    //     contador++;
    // }
    // while(dato[contador]!=','){
    //     ejey = ejey + (dato[contador]);
    //     contador++;
    // }
    // if(flag_negativo){
    //     ejey=ejey*-1;
    //     flag_negativo=0;
    // }
    // contador++;
    // if(dato[contador]=='-'){
    //     flag_negativo = 1;
    //     contador++;
    // }
    // while(dato[contador]!=','){
    //     ejez = ejez + (dato[contador]);
    //     contador++;
    // }
    // if(flag_negativo){
    //     ejez=ejez*-1;
    //     flag_negativo=0;
    // }
    
    // if(dato[contador]=='-'){
    //     flag_negativo = 1;
    //     contador++;
    // }
    // while(dato[contador]!=','){
    //     ejex = ejex + (dato[contador]);
    //     contador++;
    // }
    // if(flag_negativo){
    //     ejex=ejex*-1;
    //     flag_negativo=0;
    // }
    io.sockets.emit('ejex',ejex);
    io.sockets.emit('ejey',ejey);
    io.sockets.emit('ejez',ejez);
    io.sockets.emit('temp',temp);
    io.sockets.emit('cordenadax',cordenadax);
    io.sockets.emit('cordenaday',cordenaday);
}

myport.on('open',onOpen);

function onOpen(){
    console.log("arduino conctado");
}

myport.on('error',function(err){
    console.log(err);
});