const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../db/config');

class Server{

    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios'

        //Conect to Db
        this.conectarDB();

        // Middelwares

        this.middlewares();

        //Rutas de mi aplicación

        this.routes();
    }

    async conectarDB(){
        await dbConnection();
    }

    middlewares(){

        //CORS 
        this.app.use( cors() );

        //Parseo y lectura del body
        this.app.use( express.json() )

        //directorio publico
        this.app.use( express.static('public') )
    }

    routes(){
        
        this.app.use( this.usuariosPath, require('../routes/userRoutes'))

    }

    listen(){
        this.app.listen(this.port, () => {
            console.log(`Example app listening on port ${this.port}`)
          })
    }

}

module.exports = Server;

