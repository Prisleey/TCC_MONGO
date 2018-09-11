var UsuarioBusiness = require('../business/usuarioBusiness');
var express = require('express');
var router = express.Router();

/*router.get('/cadastro', function(req, res, next) {
    UsuarioBusiness.listTipoUsuario().then(function(objeto) {
    res.end(JSON.stringify(objeto.tipos));
});
});*/

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
        res.render('index', { autenticado : false, tiposUser : {} });
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

    UsuarioBusiness.verificarUsuario(usuario).then(function(objeto) {
        req.session.usuarioLogado = objeto;

        res.render('index', {tiposUser : {}, usuarioLogado: req.session.usuarioLogado})
    }).catch(function(erro) {
        res.end(JSON.stringify(erro));
    });
});
/*router.get('/login', function(req, res, next) {
    console.log('tentou fazer login');
    //nesse req.session.{qualquer merda}
    //você cria o que você quiser ali, jsonzão
    if(req.session.user_loged) {
        res.end("sessão -> "+req.session.user_loged);
    }else {
        req.session.user_loged = "bunda"
        res.end("inseriu a sessão");
    }
});

router.get('/logoff', function(req, res, next) {
    //logout
    req.session.destroy(function(err) {
        res.end("sessao destruida");
    });
});
*/
router.get('/logoff', function(req, res, next) {
    res.render('index', { autenticado : false, tiposUser : {} });
});

module.exports = router;