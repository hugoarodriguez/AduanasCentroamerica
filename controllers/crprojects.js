const { Router } = require('express');

const CRProject = require('../models/crproject.js')
const utils = require('../middlewares/utils.js')
const developerInfo = "2506632017 - Rodríguez Cruz Hugo Alexander"

const crprojectsGet = async (req, res) => {

    const { limite = 5, desde = 0 } = req.query;
    const query = {};

    const [ total, crprojects ] = await Promise.all([
        CRProject.countDocuments(query),
        CRProject.find(query)
            .skip( Number( desde ) )
            .limit(Number( limite ))
    ]);

    res.json({
        total,
        crprojects,
        developerInfo
    });
}
const crprojectsPost = async (req, res) => {

    const body = req.body;
    const validarFecha = await utils.validaFecha(body.fechacierre);
    
    if(validarFecha === true){
        const crproject = new CRProject(body);
    
        await crproject.save();
    
        res.json({
            msg: 'POST API - crprojectPost',
            crproject,
            developerInfo
        });
    } else {
        res.json({
            "errors": [
                {
                    "msg": "Formato de fecha inválido, debe ser YYYY-MM-DD",
                    "param": "fechacierre",
                    "location": "body"
                }
            ]
        });
    }
}
const crprojectsPut = async (req, res) => {

    const {id} = req.params;
    const body = req.body;
    const validarFecha = await utils.validaFecha(body.fechacierre);
    
    if(validarFecha === true){

        const crproject = {...body};
    
        const crprojectToUpdate = await CRProject.findByIdAndUpdate(id, crproject);
    
        res.json({
            msg: 'PUT API - crprojectPut',
            crprojectUpdated: crprojectToUpdate,
            developerInfo
        });
        
    } else {
        res.json({
            "errors": [
                {
                    "msg": "Formato de fecha inválido, debe ser YYYY-MM-DD",
                    "param": "fechacierre",
                    "location": "body"
                }
            ]
        });
    }
}
const crprojectsDelete = async (req, res) => {

    const {id} = req.params;

    const crprojectToDelete = await CRProject.findByIdAndDelete(id);

    res.json({
        ok: true,
        crproject: crprojectToDelete,
        developerInfo
    });
}

module.exports = {crprojectsGet, crprojectsPost, crprojectsPut, crprojectsDelete};