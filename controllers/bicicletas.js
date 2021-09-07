var Bicicletas = require('../models/bicicletas');

exports.bicicleta_list = function (req, res){
    res.render('bicicletas/index', {bicis:Bicicletas.allBicis})
}

exports.bicicleta_create_get = function (req, res){
    res.render('bicicletas/create');
}

exports.bicicleta_create_post = function (req, res){
    var bici = new Bicicletas(req.body.id, req.body.color, req.body.modelo);
    bici.ubicacion = [req.body.lat, req.body.lon]

    Bicicletas.add(bici);

    res.redirect('/bicicletas');
}