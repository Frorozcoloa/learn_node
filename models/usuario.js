var mongoose = require('mongoose');

var Schema = mongoose.Schema
var Reserva = require('./reserva')

var usuarioSchema = new Schema({
    nombre: String,
})

usuarioSchema.methods.reservar = function(biciId, desde, hasta, cb){
    var reservar = new Reserva({usuario: this._id, bicicleta: biciId, desde: desde, hasta: hasta})
    console.log(reservar)
    reservar.save(cb)
}

module.exports = mongoose.model('Usuario', usuarioSchema)