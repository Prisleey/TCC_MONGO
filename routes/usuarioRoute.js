var express = require('express');
let UsuarioBusiness = require('../business/usuarioBusiness');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.render('index', {validacao : {}});
});

router.post('/cadastro', function(req, res, next) {
    var nome = req.body.nome;
    var login = req.body.login;
    var email = req.body.email;
    var senha = req.body.senha;

    let usuario = {
        'nome' : nome,
        'login' : login,
        'email' : email,
        'senha' : senha
    };

    UsuarioBusiness.salvarUsuario(usuario).then(function(objeto) {
        res.render('index', { validacao : {} });
    }).catch (function(erro) {
        console.log(erro);
        res.render('index', { validacao : {dhiawhdia} });
    });
});

router.post('/login', function(req, res, next) {
    var login = req.body.login;
    var senha = req.body.senha;

    let usuario = {
        'login':login,
        'senha':senha
    };

    UsuarioBusiness.verificarUsuario(usuario).then(function(objeto){
        // res.end(JSON.stringify(objeto));
        res.render('batata', objeto);
    }).catch(function(erro) {
        res.end(JSON.stringify(erro));
    });
});

module.exports = router;
