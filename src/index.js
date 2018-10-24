let path = require('path');
let express = require('express');
let app = express();
let server = require('http').Server(app);
let mongoose = require('mongoose');
let ejs = require('ejs');
let Path = require('path');
let io = require('socket.io').listen(server);
// app.get('/',function(req,res){
//     res.end("holasmdsa");
// });

// let rutas = require('./routes');
// app.get(rutas);

// Settings
// app.set('views',(__dirname+ '/public/views'));
// app.set('view engine','ejs');
// app.use(express.urlencoded({
//     extended:false
// }));
app.use(express.static(path.join(__dirname, 'public')));

// mongodb
mongoose.connect('mongodb://localhost/Users',{useNewUrlParser:true})
.then((result) => {
    console.log(result);
    console.log('Base conectada');
}).catch((err) => {
    console.log(err);
});


// task
// const tasks = require('../EarthQ-WebPages/public/models/tasks');


//rutas
// app.use('/public',express.static('public'));


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

app.use('/', indexRouter);

//borrar
app.post('/dato', async function(req,res){
    // console.log( task.find());
    let post = req.body;
    let conect;
    let bandera_verificar;
    conect = false;
    // mongoose.connect('mongodb://localhost/Users')
    // .then((result) => {
    //     console.log('base cone');
        
    // }).catch((err) => {
    //     // console.log(err);
    //     conect = false;
    // });
    const usuario = await tasks.find();
    console.log(post.User);
    // console.log(post.Password);
    if(post.User == ""){
        
    }
    else{
        console.log("usurio valido");
        for(let i =0; i<usuario.length;i++){
            console.log("se compara "+post.User+"=="+usuario[i].User);
            console.log("se compara "+post.Password+"="+usuario[i].Password);
            if(post.User == usuario[i].User && post.Password == usuario[i].Password){
                bandera_verificar = true; 
                break;  
            }
            else{
                bandera_verificar = false;
            }
        }
    }
    // if(conect == true){
        
    //         // let post = req.body;
    //         // console.log(post);
    //         for(i=0;i<usuario.length;i++){
    //             console.log(usuario);
    //             if(post.User == usuario[i].User && post.Password == usuario[i].Password){
    //                 bandera_verificar = true;
    //                 res.sendFile(__dirname + '/public/index.html');
    //             }
    //             else{
    //                 bandera_verificar = false;
    //             }
                
    //         }
    // }
    if(bandera_verificar == false){
        // res.end('Contraseña o Usuario incorrectos');
        res.sendFile(__dirname + '/public/login.html');
        bandera_verificar = true;
    }
    else{
        res.sendFile(__dirname + '/public/index.html');
    }
    // const tas = new tasks(req.body);
    // await tas.save();
    // console.log(tas);
    // res.sendFile(__dirname + '/public/index.html');
});

app.get('/test',async function(req,res){
    const taks = await tasks.find();
    console.log(taks);
    res.sendFile(__dirname + '/public/test.html');
});


// app.get('/',async function(req,res){
//     // mongoose.connect('mongodb://localhost/Users')
//     // .then((result) => {
//     //     console.log(result);
//     //     console.log('Base conectada login');
//     // }).catch((err) => {
//     //     console.log(err);
//     // });
//     // // mongoose.disconnect();
//     res.sendFile(__dirname + '/public/login.html');
// });
app.post('/index.html',function(req,res){
    res.sendfile(__dirname + '/public/index.html');
});
app.get('/index.html',function(req,res){
    res.sendFile(__dirname + '/public/index.html');
});

app.get('/secondary.html',function(req,res){
    res.sendfile(__dirname + '/public/secondary.html');
});
app.get('/graphics.html',function(req,res){
    res.sendfile(__dirname + '/public/graphics.html');
});

app.get('/realtime.html',function(req,res){
    res.sendFile(__dirname + '/public/realtime.html');
});

app.get('/Registro', function(req,res){
    // const usuario = new tasks(req.body);
    // await usuario.save();
    // console.log('regristro'+usuario);
    res.sendFile(__dirname + '/public/Registro.html');
});

app.post('/Registrar', async function(req,res){
    const usuario = new tasks(req.body);
    await usuario.save();
    console.log('nuevo registro' + usuario);
    res.sendFile(__dirname + '/public/login.html');
});

app.post('/Iniciar', function(req,res){
    mongoose.connect('mongodb://localhost/Users')
    .then((result) => {
        console.log(result);
        console.log('Base conectada iniciar');
    }).catch((err) => {
        console.log(err);
    });
    mongoose.disconnect();
});

// app.get('*',function(req,res){
//     // res.end("No existe directorio");
//     res.sendFile(__dirname + '/public/Norepo.html');
// });

app.get('/R', function(req,res){
    // const usuario = new tasks(req.body);
    // await usuario.save();
    // console.log('regristro'+usuario);
    res.render('borrame');
});




server.listen(3000,function(){
    console.log('Server conectado');
});

// // Establecimiento de sockets activos y serialport
// io.on('connection',function(socket){
//     console.log("nueva conexion");
//     io.sockets.emit('lectura',5);
//     io.sockets.emit('ta',128);
// });


// var serialport = require('serialport');
// var Serialport = serialport.SerialPort;

// console.log('Inicio de puerto serial');

// const Readline = require('@serialport/parser-readline');
// // COM4
// var myport = new serialport("COM4",{
//     // baudRate:9600,
//     baudRate:115200,
// });


// const parser = myport.pipe(new Readline({delimiter:'\r\n'}));
// parser.on('data',onData);

// function onData(dato){
    
//     console.log(dato);
    
//     var ejex= 0,ejey= 0,ejez= 0,temp= 0,cordenadax= 0,cordenaday= 0,flag_negativo=0;
//     let contador = 0;
//     // console.log(dato[contador]);
//     if(dato[contador]=='-'){
//         flag_negativo = 1;
//         contador++;
//     }
//     while(dato[contador]!=','){
//         ejex = ejex + (dato[contador]);
//         contador++;
//     }
//     if(flag_negativo){
//         ejex=ejex*-1;
//         flag_negativo=0;
//     }

//     contador++;
//     console.log("asda "+dato[contador]);
//     // if(dato[contador]=='-'){
//     //     flag_negativo = 1;
//     //     contador++;
//     // }
//     // while(dato[contador]!=','){
//     //     ejey = ejey + (dato[contador]);
//     //     contador++;
//     // }
//     // if(flag_negativo){
//     //     ejey=ejey*-1;
//     //     flag_negativo=0;
//     // }
//     // contador++;
//     // if(dato[contador]=='-'){
//     //     flag_negativo = 1;
//     //     contador++;
//     // }
//     // while(dato[contador]!=','){
//     //     ejez = ejez + (dato[contador]);
//     //     contador++;
//     // }
//     // if(flag_negativo){
//     //     ejez=ejez*-1;
//     //     flag_negativo=0;
//     // }
    
//     // if(dato[contador]=='-'){
//     //     flag_negativo = 1;
//     //     contador++;
//     // }
//     // while(dato[contador]!=','){
//     //     ejex = ejex + (dato[contador]);
//     //     contador++;
//     // }
//     // if(flag_negativo){
//     //     ejex=ejex*-1;
//     //     flag_negativo=0;
//     // }
//     io.sockets.emit('ejex',ejex);
//     io.sockets.emit('ejey',ejey);
//     io.sockets.emit('ejez',ejez);
//     io.sockets.emit('temp',temp);
//     io.sockets.emit('cordenadax',cordenadax);
//     io.sockets.emit('cordenaday',cordenaday);
// }

// myport.on('open',onOpen);

// function onOpen(){
//     console.log("arduino conctado");
// }

// myport.on('error',function(err){
//     console.log(err);
// });
module.exports = app;