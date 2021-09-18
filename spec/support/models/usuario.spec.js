var mongoose = require('mongoose');

var Usuario = require('../../../models/usuario');
var Reserva = require('../../../models/reserva');
var Bicicleta = require('../../../models/bicicletas');

describe('Testing Usuario',()=>{
    beforeAll(function(done) {
        mongoose.connection.close().then(() => {
            var mongoDB = 'mongodb://localhost/testdb';
            mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
            //mongoose.set('useCreateIndex', true);
            var db = mongoose.connection;
            db.on('error', console.error.bind(console, 'MongoDB connection error: '));
            db.once('open', function () {
                console.log('We are connected to test database!');
                done();
            });
        });
    });

    afterEach((done)=>{
        Reserva.deleteMany({}, (err, success)=>{
            if(err) console.log(err);
            Usuario.deleteMany({}, (err, success)=>{
                if(err) console.log(err);
                Bicicleta.deleteMany({}, (err, success)=>{
                    if(err) console.log(err);
                    done();
                })
            })
        })
    })

    describe('Cuando un Usuario reservar una bici', ()=>{
        it('Desde exisistir la reserva', (done)=>{
            const usuario = new Usuario({nombre: 'Fredy'});
            usuario.save();
            const bicicleta = new Bicicleta({code:1, color: 'Verde', modelo:'Urbana'});
            bicicleta.save();

            var hoy = new Date();
            var mañana = new Date();

            mañana.setDate(hoy.getDate()+1);
            usuario.reservar(bicicleta.id, hoy, mañana, (err, reserva)=>{
                Reserva.find({}).populate('bicicleta').populate('usuario').exec((err, reservas)=>{
                    console.log(reservas[0]);
                    expect(reservas.length).toBe(1);
                    expect(reservas[0].diasDeReserva()).toBe(2);
                    expect(reservas[0].bicicleta.code).toBe(1);
                    expect(reservas[0].usuario.nombre).toBe(usuario.nombre);
                    done();
                });
            });
        })
    })

})