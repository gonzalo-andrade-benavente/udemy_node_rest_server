const express = require('express');
const cors = require('cors');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.userPath = '/app/users';
        
        //Middleawares
        this.middlewares();
        // Rutas de mi aplicación
        this.routes();
    }

    routes() {
       this.app.use(this.userPath , require('../routes/user'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Server running in port ${ this.port }`);
        });
    }

    middlewares() {

        // CORS
        this.app.use( cors() );

        // Parser JSON
        this.app.use( express.json() );

        // Directorio público.
        this.app.use( express.static('public') );
    }


}

module.exports = Server;