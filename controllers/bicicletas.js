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

exports.bicicleta_update_get = function (req, res){
    var bici = Bicicletas.findById(req.params.id);

    res.render('bicicletas/update', {bici})
}

exports.bicicleta_update_post = function (req, res){
    var bici = Bicicletas.findById(req.params.id);
    bici.id = req.body.id;
    bici.color = req.body.color;
    bici.modelo = req.body.modelo;
    bici.ubicacion = [req.body.lon, req.body.lat]

    res.redirect('/bicicletas');
}

exports.bicicleta_delete_post = function(req, res) {
    Bicicletas.removeById(req.body.id)
    res.redirect('/bicicletas');
}