var mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const uniqueValidator = require('mongoose-unique-validator');
var Reserva = require('./reserva')
var Token = require('./Token')
var crypto = require('crypto');
const mailer = require('../mailer/mailer');

const saltRounds = 10;
var Schema = mongoose.Schema

function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}
var usuarioSchema = new Schema({
    nombre: {
        type: String,
        trin: true,
        required: [true, "El nombre es obligatorio"] 
    },
    email:{
        type: String,
        trim:true,
        required: [true, "El email es obligatorio"],
        lowercase: true,
        validate:[validateEmail, "Por favor, Ingrese un email valido"],
        match:[/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/]
    },
    password:{
        type:String,
        required:[true, "El pass debe ser obligatorio"]
    },
    passwordRestToken: String,
    passwordRestTokenExpires: Date,
    verificado:{
        type: Boolean,
        default: false,
    }
})

usuarioSchema.plugin(uniqueValidator, {message: "EL {PATH} ya existe con otro  Usuario"})

usuarioSchema.pre('save', function(next){
    if (this.isModified('password')){
        this.password = bcrypt.hashSync(this.password, saltRounds);
    }
    next();
});

usuarioSchema.methods.validPassword =  function(password){
    return bcrypt.compareSync(password, this.password)
}

usuarioSchema.methods.reservar = function(biciId, desde, hasta, cb){
    var reservar = new Reserva({usuario: this._id, bicicleta: biciId, desde: desde, hasta: hasta})
    console.log(reservar)
    reservar.save(cb)
}

usuarioSchema.methods.enviar_email_bienvenida = function(cb) {
    const token = new Token({_userId: this.id, token: crypto.randomBytes(16).toString('hex')});
    const email_destination = this.email;
    token.save(function (err) {
        if (err) { return console.log(err.message); }

        const mailOptions = {
            from: 'no-reply@redesbicicletas.com',
            to: email_destination, 
            subject: 'verificacion de cuenta',
            text: 'hola,\n\n' + 'Por favor, para verificar tu cuenta haga click en este link: \n' + 'http://localhost:5000' + '\/token/confirmation\/' + token.token + '.\n'

        };
        mailer.sendMail(mailOptions, function (err) {
            if (err) { return console.log(err.message + ' error ' + token.token); }

            console.log('Se ha enviado un email de bienvenida a: ' + email_destination + ':')
        });
    });
}

module.exports = mongoose.model('Usuario', usuarioSchema)