const {Schema, model} = require('mongoose');

const CRProjectSchema=Schema({

    codigo : {
        type : String,
        required : [true, "El código es requerido"]
    },
    nombreproyecto : {
        type : String,
        required : [true, "El nombre del proyecto es requerido"]
    },
    paisqueejecuta : {
        type : String,
        required :[true, "El país que ejecuta es requerido"]
    },
    fechacierre : {
        type : String,
        required : [true, "La fecha de cierre es requerida"]
    }

});

CRProjectSchema.methods.toJSON = function(){
    const {__v, ...data} = this.toObject();
    return data;
}

module.exports = model('CRProject', CRProjectSchema);