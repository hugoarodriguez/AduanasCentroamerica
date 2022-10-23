const express = require('express');
var cors = require('cors');
var { dbConnection } = require('../database/config.js')

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.grProjectPath = '/api/servicegt';

        //Conectar a la BD
        this.conectDB();

        //Middlewares
        this.middlewares();

        //Rutas de ingreso al servidor
        this.routes();
    }

    //Método para invocar el código de conexión a la BD
    async conectDB(){

        await dbConnection();
        
    }

    middlewares(){

        //Política de acceso CORS para publicación WEB
        this.app.use(cors());

        //Parser JSON
        this.app.use(express.json());

        //Accesos públicos
        this.app.use(express.static('public'));        

    }

    routes() {

        this.app.use(this.grProjectPath, require('../routes/gtprojects.js'));

    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Example app listening on port ${process.env.PORT}`);
        })
    }
}

module.exports = Server;