var mongoose = require('mongoose');

var Schema = mongoose.Schema

var usuarioSchema = new Schema({
    nombre: String,
})

userSchema.methods.reservar = function(biciId, desde, hasta, cb){
    var reservar = new Reserva({usuario: this._id, bicicleta: biciId, desde: desde, hasta: hasta})
    console.log(reservar)
    reserva.save(cb)
}