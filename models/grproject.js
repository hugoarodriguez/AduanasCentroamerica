const {Schema, model} = require('mongoose');

const GTProjectSchema=Schema({

    codigo : {
        type : String,
        required : [true, "El código es requerido"]
    },
    nombreproyecto : {
        type : String,
        required : [true, "El nombre del proyecto es requerido"]
    },
    monto : {
        type : Number,
        required :[true, "El monto es requerido"]
    },
    fecha : {
        type : String,
        required : [true, "La fecha es requerida"]
    }

});

GTProjectSchema.methods.toJSON = function(){
    const {__v, ...data} = this.toObject();
    return data;
}

module.exports = model('GTProject', GTProjectSchema);