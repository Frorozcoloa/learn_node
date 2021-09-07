var Bicicletas = function (id, color, modelo, ubicacion){
    this.id = id;
    this.color = color;
    this.modelo = modelo;
    this.ubicacion = ubicacion;
}

Bicicletas.prototype.toString = function(){
    return 'id: ' + this.id + ' | color:' + this.color
}

Bicicletas.allBicis = [];

Bicicletas.add = function(aBici){
    Bicicletas.allBicis.push(aBici);
}

var a = new Bicicletas(1, 'rojo', 'urbana', [-34.6012424, -58.38612897])
var b = new Bicicletas(2, 'blanca', 'urbana', [-34.591635, -58.3862397])

Bicicletas.add(a);
Bicicletas.add(b);

module.exports = Bicicletas;