var Bicicleta = require('../../models/bicicletas');
var Usuario = require('../../models/usuario');
var Reserva = require('../../models/reserva');
var request = require('request');
var server = require('../../bin/www');
var mongoose = require('mongoose');

var base_url = 'http://localhost:5000/api/usuarios'

describe("Usuario Api", ()=>{
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

    describe("GET USUARIOS /", ()=>{
        it("Status 200", (done)=>{
            request.get(base_url, (err, res, body)=>{
                var result = JSON.parse(body);
                expect(res.statusCode).toBe(200);
                expect(result.usuarios.length).toBe(0);
                done()
            })
        })
    })

    describe("POST Usuario /create", ()=>{
        it("Status 200 and create", (done)=>{
            var user = {nombre: "Fredy"}
            request.post({url:base_url+'/create', form:user}, 
                    (err,res, body) => {
                        var user = JSON.parse(body).usuario;
                        expect(res.statusCode).toBe(200)
                        expect(user.nombre).toBe(user.nombre)
                        done();
                })
        })
    })

    describe('POST usuarios /Reserva', ()=>{
        it("Status 200 and booking", (done)=>{
            var user = new Usuario({nombre:"Fredy"})
            user.save()
            var bici = new Bicicleta({code:4, color:'rojo', modelo:'urbana', ubicacion:[-34, -58]})
            bici.save()
            var body = {id:user.id, bici_id: bici.id, desde: "2018-02-15", hasta:"2018-03-15" }
            console.log(body)
            request.post({url:base_url+'/reservar', form:body}, 
                    (err,res, body) => {
                        expect(res.statusCode).toBe(200)
                        done();
                })
        })
    })
})