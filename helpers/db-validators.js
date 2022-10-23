const GTProject = require('../models/grproject.js');

const existeProyectoPorId = async( id ) => {

    // Verificar si el correo existe
    const existeProyecto = await GTProject.findById(id);
    if ( !existeProyecto ) {
        throw new Error(`El id no existe ${ id }`);
    }
}

module.exports = {
    existeProyectoPorId
}

