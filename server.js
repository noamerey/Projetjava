// j'Imports
var express = require('express');
var bodyParser = require('body-parser');
var apiRouter = require('./apiRouter').router;

// J'installe le serv 
var server = express();

//la je configure BODYPARSER!!!!!!(recupere argument et parametre fournis par une requete http)
server.use(bodyParser.urlencoded({extented: true}));
server.use(bodyParser.json());

//configurer les routes
server.get('/', function (req,res) {
    res.setHeader('Content-Typer', 'text/html');
    res.status(200).send('<h1>ben ntm</h1>'); 
});

server.use('/api/', apiRouter);  

//lanceur epic games
server.listen(6677, function() {
    console.log('Server en écoute');

});
