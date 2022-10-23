const mongoose = require('mongoose');

const dbConnection = async () => {
    try {

        await mongoose.connect(process.env.MONGO_CNN, {
            useNewUrlParser: true
            
        })

        console.log("Base de Datos Online");
        
    } catch (error) {
        console.log(error);
        //throw new Error("¡Error en la Base de Datos, verifique!");
    }
}

module.exports = {dbConnection}