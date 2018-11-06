var UsuarioBusiness = require('../business/usuarioBusiness');
var CarteiraBusiness = require('../business/carteiraBusiness');
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
    let estado = req.body.estado;
    let cidade = req.body.cidade;
    let bairro = req.body.bairro;
    let telefone = req.body.telefone;
    let descricao = req.body.descricao;

    let usuario = {
        'nome' : nome,
        'login' : login,
        'email' : email,
        'senha' : senha,
        'tipo'  : tpUser,
        'estado':estado,
        'cidade':cidade,
        'bairro':bairro,
        'telefone':telefone,
        'descricao':descricao
    };

    UsuarioBusiness.salvarUsuario(usuario).then(function(objeto) {
        UsuarioBusiness.listTipoUsuario().then(function(listTpUser) {
            console.log(typeof(objeto.usuario._id));
            let carteira = {
                'creditos' : 0.00,
                'idUsuario' : objeto.usuario._id
            };
            console.log("teste1234");
            console.log(carteira);
            CarteiraBusiness.criarCarteira(carteira).then(function(status){
                res.render('index', {tiposUser: listTpUser.tipos, usuarioLogado: req.session.usuarioLogado});
            }).catch(function(erro){
               res.end(JSON.stringify(erro));
            });

        });

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

        req.session.usuarioLogado = objeto.usuario;
        if (objeto.status) {
            UsuarioBusiness.listTipoUsuario().then(function(listTpUser) {
                CarteiraBusiness.consultarCarteira(objeto.usuario[0]._id).then(function(carteira){
                    console.log("EITA");
                    console.log(carteira.carteira[0].creditos);
                    res.render('index', {tiposUser: listTpUser.tipos, usuarioLogado: req.session.usuarioLogado, creditos: carteira.carteira[0].creditos});
                }).catch(function(error){
                   res.end(JSON.stringify(error));
                });
            });
        } else {
            alert('Login ou senha incorretos.');
            res.render('index', {tiposUser: {}, usuarioLogado: req.session.usuarioLogado});
        }
    }).catch(function(erro) {
        res.render('index', { tiposUser : {}, usuarioLogado : {}});
    });
});

router.get('/logoff', function(req, res, next) {
    //logout
    console.log('logoff');
    req.session.destroy(function(err) {
        UsuarioBusiness.listTipoUsuario().then(function(objeto) {
            res.render('index', { tiposUser : objeto.tipos, usuarioLogado : false });
        });

    });
});

module.exports = router;