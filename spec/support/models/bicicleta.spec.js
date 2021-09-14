var Bicicletas = require('../../../models/bicicletas')

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
})