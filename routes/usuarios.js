var express = require('express');
var router = express.Router();
var usuarioContreller = require('../controllers/usuarios')

router.get('/', usuarioContreller.list);
router.get('/create', usuarioContreller.create_get);
router.post('/create', usuarioContreller.create);
router.get('/:id/update', usuarioContreller.update_get);
router.post('/:id/update', usuarioContreller.update);
router.post('/:id/delete', usuarioContreller.delete);

module.exports = router;

