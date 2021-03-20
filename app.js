/* Importaciones propias de Node */
require('dotenv').config();
/* Importaciones de terceros */
const Server = require('./models/server');

const server = new Server();

server.listen();
