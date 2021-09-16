var mongoose = require('mongoose');
var jasmine = require('jasmine');

var Bicicleta = require('../../../models/bicicletas')

describe('Testing Bicicletas', function(){
    var originalTimeout;
    beforeEach(function(done){
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;

        var mongoDB = 'mongodb://localhost/red_bicicletas';
        mongoose.connect(mongoDB, {useNewUrlParser:true});

        const db = mongoose.connection;
        db.on('error', console.error.bind(console, 'Mongodb connectio error: '))
        db.once('open', ()=>{
            console.log('We are connected to test database!');
            done;
        })
    });

    afterEach((done)=>{
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
        Bicicleta.deleteMany({}, (err, success)=>{
            if(err) console.log(err);
            done();
        })
    });

    /* describe('Bicicleta.createIstance', ()=>{
        it('Crea una instancia de Bicicleta', (done)=>{
            var bici = Bicicleta.createInstance(1, "verde", "urbana", [-34.5, -54.1]);

            expect(bici.code).toBe(1);
            expect(bici.color).toBe("verde");
            expect(bici.modelo).toBe("urbana");
            expect(bici.ubicacion[0]).toEqual(-34.5);
            expect(bici.ubicacion[1]).toEqual(-54.1);
            done();
        })
    }); */

    describe('Bicicletas allBicis', ()=>{
        it('Comienza vacida', (done)=>{
            Bicicleta.allBicis((err, bicis)=>{
                expect(bicis.length).toBe(0);
                done();
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