const GTProject = require('../models/grproject.js');
const CRProject = require('../models/crproject.js');

const existeProyectoGTPorId = async( id ) => {

    // Verificar si el correo existe
    const existeProyecto = await GTProject.findById(id);
    if ( !existeProyecto ) {
        throw new Error(`El id no existe ${ id }`);
    }
}

const existeProyectoCRPorId = async( id ) => {

    // Verificar si el correo existe
    const existeProyecto = await CRProject.findById(id);
    if ( !existeProyecto ) {
        throw new Error(`El id no existe ${ id }`);
    }
}

module.exports = {
    existeProyectoGTPorId, existeProyectoCRPorId
}

