const { Router } = require('express');

const GTProject = require('../models/grproject.js')
const utils = require('../middlewares/utils.js')
const developerInfo = "2506632017 - Rodríguez Cruz Hugo Alexander"

const gtprojectsGet = async (req, res) => {

    const { limite = 5, desde = 0 } = req.query;
    const query = {};

    const [ total, gtprojects ] = await Promise.all([
        GTProject.countDocuments(query),
        GTProject.find(query)
            .skip( Number( desde ) )
            .limit(Number( limite ))
    ]);

    res.json({
        total,
        gtprojects,
        developerInfo
    });
}
const gtprojectsPost = async (req, res) => {

    const body = req.body;
    const validarFecha = await utils.validaFecha(body.fecha);

    if(validarFecha === true){

        const gtproject = new GTProject(body);
    
        await gtproject.save();
    
        res.json({
            msg: 'POST API - gtprojectPost',
            gtproject,
            developerInfo
        });
        
    } else {
        res.json({
            "errors": [
                {
                    "msg": "Formato de fecha inválido, debe ser YYYY-MM-DD",
                    "param": "fecha",
                    "location": "body"
                }
            ]
        });
    }

}
const gtprojectsPut = async (req, res) => {

    const {id} = req.params;
    const body = req.body;
    const validarFecha = await utils.validaFecha(body.fecha);
    
    if(validarFecha === true){

        const gtproject = {...body};
    
        const gtprojectToUpdate = await GTProject.findByIdAndUpdate(id, gtproject);
    
        res.json({
            msg: 'PUT API - gtprojectPut',
            gtprojectUpdated: gtprojectToUpdate,
            developerInfo
        });

    } else {
        res.json({
            "errors": [
                {
                    "msg": "Formato de fecha inválido, debe ser YYYY-MM-DD",
                    "param": "fecha",
                    "location": "body"
                }
            ]
        });
    }
}
const gtprojectsDelete = async (req, res) => {

    const {id} = req.params;

    const gtprojectToDelete = await GTProject.findByIdAndDelete(id);

    res.json({
        ok: true,
        gtproject: gtprojectToDelete,
        developerInfo
    });
}

module.exports = {gtprojectsGet, gtprojectsPost, gtprojectsPut, gtprojectsDelete};