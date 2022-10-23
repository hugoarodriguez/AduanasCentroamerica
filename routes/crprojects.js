const { Router } = require('express');
const router = Router();
const {check} = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');
const { existeProyectoPorId, esFechaValida } = require('../helpers/db-validators');

const crprojectController = require('../controllers/crprojects.js');

//Método para devolver valores usando el verbo GET de HTTTP
router.get('/', crprojectController.crprojectsGet);

//Código para Insertar - POST
router.post('/', [
    check('codigo', 'El código es obligatorio').not().isEmpty(),
    check('nombreproyecto', 'El nombre del proyecto es obligatorio').not().isEmpty(),
    check('paisqueejecuta', 'El país que ejecuta es obligatorio').not().isEmpty(),
    check('fechacierre', 'La fecha es obligatoria').not().isEmpty(),
    validarCampos
]
, crprojectController.crprojectsPost);

//Código para Actualizar - PUT
router.put('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeProyectoPorId ),
    validarCampos
]
, crprojectController.crprojectsPut);

//Código para Borrar - DELETE
router.delete('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeProyectoPorId ),
    validarCampos
], crprojectController.crprojectsDelete);

module.exports = router;