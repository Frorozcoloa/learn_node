var Bicicletas = require('../models/bicicletas');

exports.bicicleta_list = function (req, res){
    res.render('bicicletas/index', {bicis:Bicicletas.allBicis})
}