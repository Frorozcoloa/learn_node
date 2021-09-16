
var Bicicletas = require('../../models/bicicletas');
var request = require('request');
var server = require('../../bin/www');



describe('Bicicleta API', ()=>{
    describe('GET BICILETAS', ()=>{
        it('Status 200', ()=>{
            expect(Bicicletas.allBicis.length).toBe(0);

            var a = new Bicicletas(1, 'rojo', 'urbana', [-34.6012424, -58.38612897])
            Bicicletas.add(a);

            request.get('http://localhost:5000/api/bicicletas',(err, res, body)=>{
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
})