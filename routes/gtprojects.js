const { Router } = require('express');
const router = Router();
const {check} = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');
const { existeProyectoPorId } = require('../helpers/db-validators');

const gtprojectController = require('../controllers/gtprojects.js');

//Método para devolver valores usando el verbo GET de HTTTP
router.get('/', gtprojectController.gtprojectsGet);

//Código para Insertar - POST
router.post('/', [
    check('codigo', 'El código es obligatorio').not().isEmpty(),
    check('nombreproyecto', 'El nombre del proyecto es obligatorio').not().isEmpty(),
    check('monto', 'El monto no es válido').isDecimal(),
    check('fecha', 'La fecha es obligatoria').not().isEmpty(),
    validarCampos
]
, gtprojectController.gtprojectsPost);

//Código para Actualizar - PUT
router.put('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeProyectoPorId ),
    check('codigo', 'El código es obligatorio').not().isEmpty(),
    check('nombreproyecto', 'El nombre del proyecto es obligatorio').not().isEmpty(),
    check('monto', 'El monto no es válido').isDecimal(),
    check('fecha', 'La fecha es obligatoria').not().isEmpty(),
    validarCampos
]
, gtprojectController.gtprojectsPut);

//Código para Borrar - DELETE
router.delete('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeProyectoPorId ),
    validarCampos
], gtprojectController.gtprojectsDelete);

module.exports = router;