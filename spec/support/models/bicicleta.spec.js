var mongoose = require('mongoose');
var jasmine = require('jasmine');

var Bicicleta = require('../../../models/bicicletas');
const bicicletas = require('../../../models/bicicletas');

describe('Testing Bicicletas', function(){
    
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

    describe('Bicicleta.createIstance', ()=>{
        it('Crea una instancia de Bicicleta', (done)=>{
            var bici = Bicicleta.createInstance(1, "verde", "urbana", [-34.5, -54.1]);

            expect(bici.code).toBe(1);
            expect(bici.color).toBe("verde");
            expect(bici.modelo).toBe("urbana");
            expect(bici.ubicacion[0]).toEqual(-34.5);
            expect(bici.ubicacion[1]).toEqual(-54.1);
            done();
        })
    }); 

    describe('Bicicletas allBicis', ()=>{

        it('Comienza vacida', (done)=>{
            Bicicleta.allBicis((err, bicis)=>{
                expect(bicis.length).toBe(0);
                done();
            })
        })
    })
    describe('Bicicleta.add', ()=>{
        it('agrega solo una bici', (done)=>{
            var aBici = new Bicicleta({code:1, color: "verde", modelo:"urbana"});
            Bicicleta.add(aBici, (err, bicis)=>{
                if(err) console.log(err);
                Bicicleta.allBicis((err, bicis)=>{
                    expect(bicis.length).toEqual(1);
                    expect(bicis[0].code).toEqual(aBici.code);
                    done();
                })
            });
        })
    })
    describe('Bicicleta.findByCode', ()=>{
        it('debe devolver la bici con code 1',(done)=>{
            Bicicleta.allBicis((err, bicis)=>{
                expect(bicis.length).toBe(0);
                done();

                var aBici = new Bicicleta({code:1, color: "verde", modelo:"urbana"});
                Bicicleta.add(aBici, (err, newBici)=>{
                    if(err) console.log(err);

                    var aBici2 = new Bicicleta({code:2, color: "blanco", modelo:"montaña"});
                    Bicicleta.add(aBici2, (err, newBici2)=>{
                        if(err) console.log(err);
                        Bicicleta.findByCode(1, (err, targetBici)=>{
                            expect(targetBici.code).toBe(aBici.code);
                            expect(targetBici.color).toBe(aBici.color);
                            expect(targetBici.modelo).toBe(aBici.modelo);
                            done();
                        })
                    })
                })
            })
        })
    })
    
    describe('Bicicleta.remoceByCode', ()=>{
        it('debe eliminar la bicicleta 1',(done)=>{
            var aBici = new Bicicleta({code:1, color: "verde", modelo:"urbana"});
            Bicicleta.add(aBici, (err, newBici)=>{
                if(err) console.log(err);

                var aBici2 = new Bicicleta({code:2, color: "blanco", modelo:"montaña"});
                Bicicleta.add(aBici2, (err, newBici2)=>{
                    if(err) console.log(err);
                    Bicicleta.remoceByCode(1, (err, targetBici)=>{
                        expect(targetBici.color).toBe(undefined);
                        expect(targetBici.modelo).toBe(undefined);
                        done();
                    })
                })
            })
        })
    })
    
    describe('Bicicleta.updateByCode', ()=>{
        it('debe update la bicicleta 1',(done)=>{
            var aBici = new Bicicleta({code:1, color: "verde", modelo:"urbana"});
            Bicicleta.add(aBici, (err, newBici)=>{
                if(err) console.log(err);

                var update = {color: 'rojo', modelo:'montaña'}
                Bicicleta.updateByCode(1, update,(err, targetBici)=>{
                    Bicicleta.findByCode(1, (err, targetBici)=>{
                        expect(targetBici.code).toBe(aBici.code);
                        expect(targetBici.color).toBe(update.color);
                        expect(targetBici.modelo).toBe(update.modelo);
                        done();
                    })
                })
            })
        })
    })


})



/* 
beforeEach(()=>{Bicicletas.allBicis = []})

describe('Bicicletas.allBicis', ()=>{
    it('Comienza vacida', () =>{
        expect(Bicicletas.allBicis.length).toBe(0);
    })
});


describe('Bicicletas.add', ()=>{
    it('agregamos una bicicleta', ()=>{
        expect(Bicicletas.allBicis.length).toBe(0);
        var a = new Bicicletas(1, 'rojo', 'urbana', [-34.6012424, -58.38612897]);
        Bicicletas.add(a);
        expect(Bicicletas.allBicis.length).toBe(1);
        expect(Bicicletas.allBicis[0]).toBe(a);
    })
});

describe('Bicicleta.findById', () => {
    it('debe devolver la bici con id 1', ()=>{
        expect(Bicicletas.allBicis.length).toBe(0);
        var a = new Bicicletas(1, 'rojo', 'urbana', [-34.6012424, -58.38612897]);
        var b = new Bicicletas(2, 'blanca', 'urbana', [-34.591635, -58.3862397]);
    
        Bicicletas.add(a);
        Bicicletas.add(b);

        var target = Bicicletas.findById(1);

        expect(target.id).toBe(a.id);
        expect(target.color).toBe(a.color);
        expect(target.models).toBe(a.models);
        expect(target.ubicacion).toEqual(a.ubicacion)


    })
})

describe('Bicicleta.removeById',()=>{
    it('Debe eliminar la bicicleta', ()=>{
        expect(Bicicletas.allBicis.length).toBe(0);
        var a = new Bicicletas(1, 'rojo', 'urbana', [-34.6012424, -58.38612897]);
        var b = new Bicicletas(2, 'blanca', 'urbana', [-34.591635, -58.3862397]);
        Bicicletas.add(a);
        Bicicletas.add(b);
        Bicicletas.removeById(1)
        expect(Bicicletas.allBicis.length).toBe(1)
    })
}) */