//libreria que nos permite levantar un servidor
const http = require('http');
//libreria que nos permite optener los parametros desde la url
const url = require('url');
//libreria para logear
const winston = require('winston');

const greeting = require('./greeting')

//le dice al servidor en que IP expondra la API
const hostname = '127.0.0.1';
//el puerto
const port = 3000;

//crea una variable que permite imprimir por consola
const logger = winston.createLogger({
    'transports': [
        new winston.transports.Console()
    ]
});

const server = http.createServer((request, response) => {
    //obtenemos los parametros enviados en la url (ej: name=Gisselle)
    const parameters = url.parse(request.url, true).query

    //libreria de logs para mostrar mensajes en vez de usar console.log
    logger.log({
        // Message to be logged
        message: parameters,
        // Level of the message logging
        level: 'info'
    })

    //variable que contiene el resultado de llamar al metodo
    const saludo = greeting(parameters.name)

    //la API responde con un status de exito (200)
    response.statusCode = 200;
    //la API declara responder como texto
    response.setHeader('Content-Type', 'text/plain');
    //la API envia la respuesta
    response.end(saludo);
});

server.listen(port, hostname, () => {
    console.log(`El servidor se está ejecutando en http://${hostname}:${port}/`);
});