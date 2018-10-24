const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');

passport.serializeUser((user, done) => {
    done(null, user.id);
    
});

passport.deserializeUser(async (id, done) => { //Consulta a base de datos con ID
    const user = await User.findById(id); //me devuelve el ID del usuario y es asíncrono
    done(null, user); //Si existe entonces se devuelven los datos del usuario
});

passport.use('local-signup', new LocalStrategy({ //Autenticación {método}
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, email, password, done) => { //done funcion una vez sse termina el proceso de autentificacion se verifica con done
//Constantes usables en color más claro
    const user = await User.findOne({'email': email});
    console.log(user);
    if(user){  //Si el correo está en uso entonces mensaje que ya está ocupado
        return done(null, false, req.flash('signupMessage', 'The Email is already taken.'));
    }
    else{ //Sino está ocupaado entonces se crea un nuevo usuario con ese email
        const newUser = new User();
        newUser.email = email;
        newUser.password = newUser.encryptPassword(password);
        await newUser.save(); //metodo aspincrono, guardalo y continúa
        done(null, newUser); // Proceso terminado 
    }
}));

passport.use('local-signin', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, email, password, done) => {
    let user = await User.findOne({email: email});
    if(!user){
        return done(null, false, req.flash('signinMessage', 'No User found'));
    }
    if(!user.comparePassword(password)){
        return done(null, false, req.flash('signinMessage', 'Incorrect Password'));
    }
    return done(null, user);
}));