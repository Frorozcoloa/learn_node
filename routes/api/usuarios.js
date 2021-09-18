var express = require('express');
var router = express.Router();

var bicicletaController = require('../../controllers/api/usuarios')

router.get('/',  bicicletaController.usuario_list);
router.post('/create', bicicletaController.usuario_create);
router.post('/reservar', bicicletaController.usuario_reservar)

module.exports = router;