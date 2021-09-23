const passport = require('passport')
const LocalStorage = require('passport-local').Strategy
const Usuario = require('../models/usuario')

passport.use(new LocalStorage(
    function(email, password, done) {
        Usuario.findOne({email:email}, function(err, usuario) {
            if(err) return done(err);
            if(!usuario) return done(null, false, {message: 'Email no existente incorrecto'})
            if(!usuario.validPassword(password)) return done(null, false, {message: 'password incorrecto'})

            return done(null, usuario);
        })
    }
));

passport.serializeUser((user, cb)=>{
    cb(null, user.id);
})

passport.deserializeUser((id, cb)=>{
    Usuario.findById(id, function(err,usuario){
        cb(err,usuario)
    });
});

module.exports = passport;