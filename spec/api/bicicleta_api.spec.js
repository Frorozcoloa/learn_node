
var Bicicleta = require('../../models/bicicletas');
var request = require('request');
var server = require('../../bin/www');
var mongoose = require('mongoose');

var base_url = 'http://localhost:5000/api/bicicletas'

describe("Bicleta API", () => {
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

    afterEach(function(done){
        Bicicleta.deleteMany({}, function(err, success){
            if (err) console.log(err); 
            done();
        });
        
    });



    describe("GET BICICLETAS /", () => {
        it("Status 200", (done) => {
            request.get(base_url, function(err, response, body) {
                var result = JSON.parse(body);
                expect(response.statusCode).toBe(200);
                expect(result.Bicicletas.length).toBe(0);
                done()
            });
        });
    });


    describe('POST BICICLETAS /create', ()=>{
        it('Status 200', (done)=>{

            var aBici = {id:10, color:'rojo', modelo:'urbana', lat:-34, log:-58};
            request.post({url:base_url+'/create', form:aBici}, 
                (err,res, body) => {
                    var bici = JSON.parse(body).Bicicleta;
                    expect(bici.color).toBe("rojo");
                    expect(bici.ubicacion[0]).toEqual(-34);
                    expect(bici.ubicacion[1]).toEqual(-58);
                    done();
            })
        })
    })
    describe('DELETE bicicletas/delete', () => {
        it('Status 204', (done)=>{
            var a = Bicicleta.createInstance(4, 'rojo', 'urbana', [-34, -58])
            var b = Bicicleta.createInstance(1, 'rojo', 'urbana', [-34, -58])
            Bicicleta.add(a);
            Bicicleta.add(b);


            request.delete({url:base_url + '/delete', form:{'code':4}}  , (err,res,body)=>{
                expect(res.statusCode).toBe(204);
                Bicicleta.allBicis((err, bicis)=>{
                    Bicicleta.findByCode(4, (err, bici)=>{
                        expect(bici).toBe(null)
                        done();
                    })
                })
            })
        })
    })
    describe("UPDATE bicicletas/update", ()=>{
        it("status 200", (done)=>{
            var a =  Bicicleta.createInstance(10, 'rojo', 'urbana', [-34.6012424, -58.38612897])
            Bicicleta.add(a);

            var aBici = {code:10, color:'Verde', modelo:'Montaña', lat:-40, log:60};
            request.put({url:"http://localhost:5000/api/bicicletas/update", form:aBici}, 
                (err,res, body) => {
                    var bici = JSON.parse(body).Bicicleta;
                   

                    Bicicleta.findByCode(10, (err, data)=>{
                        if(err) console.log(err);
                        expect(data.color).toBe("Verde");
                        expect(data.modelo).toBe('Montaña')
                        expect(data.ubicacion[0]).toEqual(-40);
                        expect(data.ubicacion[1]).toEqual(60);
                        done();
                    })
                    
                })
        })
    })


});


/* describe('Bicicleta API', ()=>{
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

    afterEach(function(done){
        Bicicleta.deleteMany({}, function(err, success){
            if (err) console.log(err); 
            done();
        });
        
    });

    describe('GET BICILETAS', ()=>{
        it('Status 200', ()=>{
            expect(Bicicletas.allBicis.length).toBe(0);

            var a = new Bicicletas(1, 'rojo', 'urbana', [-34.6012424, -58.38612897])
            Bicicletas.add(a);

            request.get(base_url, (err, res, body)=>{
                expect(res.statusCode).toBe(200)
            } )
        })
    })

    describe('POST BICICLETAS /create', ()=>{
        it('Status 200', (done)=>{

            var aBici = {id:10, color:'rojo', modelo:'urbana', lat:-34.6012424, log:-58.38612897};
            request.post({url:'http://localhost:5000/api/bicicletas/create', form:aBici}, 
                (err,res, body) => {
                    expect(res.statusCode).toBe(200)
                    expect(Bicicletas.findById(10).color).toBe('rojo');
                    done();
            })
        })
    })

    describe('DELETE bicicletas/delete', () => {
        it('Status 200', (done)=>{
            expect(Bicicletas.allBicis.length).toBe(0);
            var a = new Bicicletas(4, 'rojo', 'urbana', [-34.6012424, -58.38612897])
            Bicicletas.add(a);

            request.delete({url:`http://localhost:5000/api/bicicletas/delete`, form:{'id':4}}  , (err,res,body)=>{
                expect(res.statusCode).toBe(204);
                expect(Bicicletas.findById(4)).toBe('Not found');
                done()
            })
        })
    })
    describe("UPDATE bicicletas/update", ()=>{
        it("status 200", (done)=>{
            var a = new Bicicletas(10, 'rojo', 'urbana', [-34.6012424, -58.38612897])
            Bicicletas.add(a);

            var aBici = {id:10, color:'Verde', modelo:'Montaña', lat:-40, log:60};
            request.put({url:"http://localhost:5000/api/bicicletas/update", form:aBici}, 
                (err,res, body) => {
                    expect(res.statusCode).toBe(200);
                    expect(Bicicletas.findById(10).color).toBe('Verde');
                    expect(Bicicletas.findById(10).modelo).toBe('Montaña')
                    expect(Bicicletas.findById(10).ubicacion).toEqual(['-40', '60'])
                    done();
                })
        })
    })
}) */