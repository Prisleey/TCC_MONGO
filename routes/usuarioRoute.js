var express = require('express');
let UsuarioBusiness = require('../business/usuarioBusiness');
var router = express.Router();

router.post('/cadastro', function(req, res, next) {
    let nome = req.body.nome;
    let login = req.body.login;
    let email = req.body.email;
    let senha = req.body.senha;
    let tpUser = req.body.tpUser;

    let usuario = {
        'nome' : nome,
        'login' : login,
        'email' : email,
        'senha' : senha,
        'tipo'  : tpUser
    };

    UsuarioBusiness.salvarUsuario(usuario).then(function(objeto) {
        res.render('index', { autenticado : false });
    }).catch (function(erro) {
        console.log(erro);
        res.render('index', { autenticado : erro });
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
        res.render('index', {autenticado : true })
    }).catch(function(erro) {
        res.end(JSON.stringify(erro));
    });
});

router.get('/logoff', function(req, res, next) {
    res.render('index', { autenticado : false });
});

module.exports = router;