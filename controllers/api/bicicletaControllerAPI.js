var  Bicicleta = require('../../models/bicicletas')

exports.bicicleta_list = (req, res)=>{
    Bicicleta.allBicis(function(err,bicis){
        res.status(200).json({Bicicletas:bicis});
    })
}

exports.bicicleta_create = (req, res)=>{
    var bici = Bicicleta.createInstance(req.body.id, req.body.color, req.body.modelo, [req.body.lat, req.body.log]);
    Bicicleta.add(bici)

    res.status(200).json({
        Bicicleta:bici
    })
}


exports.bicicleta_delete = (req, res) => {
    Bicicleta.removeByCode(req.body.code, (err, TargetBici)=>{
        res.status(204).json({Bicicleta: TargetBici})
    })
    
}

exports.bicicleta_update = (req, res) => {
    var update = {color: req.body.color, modelo:req.body.modelo, ubicacion:[req.body.lat, req.body.log]}
    Bicicleta.updateByCode(req.body.code, update, (err, data) => {
        res.status(200).json({Bicicleta: data})
    })
}