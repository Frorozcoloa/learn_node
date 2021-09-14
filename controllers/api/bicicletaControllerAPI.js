var  Bicicletas = require('../../models/bicicletas')

exports.bicicleta_list = (req, res)=>{
    res.status(200).json({
        bicicletas: Bicicletas.allBicis
    })
}

exports.bicicleta_create = (req, res)=>{
    var bici = new Bicicletas(req.body.id, req.body.color, req.body.modelo);
    bici.ubicacion = [req.body.lat, req.body.log]

    Bicicletas.add(bici)

    res.status(200).json({
        bicicleta:bici
    })
}


exports.bicicleta_delete = (req, res) => {
    Bicicletas.removeById(req.body.id)
    res.status(204).send();
}

exports.bicicleta_update = (req, res) => {
    var bicicleta = Bicicletas.findById(req.body.id);
    bicicleta.modelo = req.body.modelo;
    bicicleta.color = req.body.color;
    bicicleta.ubicacion = [req.body.lat, req.body.log]

    res.status(200).json({
        bicicleta: bicicleta,
    })
}