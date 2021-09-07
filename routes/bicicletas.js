var express = require('express');
var router = express.Router();
var bicicletaController = require('../controllers/bicicletas')

router.get('/', bicicletaController.bicicleta_list)

module.exports = router;