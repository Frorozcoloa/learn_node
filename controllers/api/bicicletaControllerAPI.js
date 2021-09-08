var  Bicicletas = require('../../models/bicicletas')

exports.bicicleta_list = (req, res)=>{
    res.status(200).json({
        bicicletas: Bicicletas.allBicis
    })
}