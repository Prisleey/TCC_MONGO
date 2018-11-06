var express = require('express');
var router = express.Router();

let UsuarioBusiness = require('../business/usuarioBusiness');
var CarteiraBusiness = require('../business/carteiraBusiness');

router.get('/', function(req, res, next) {
    UsuarioBusiness.listTipoUsuario().then(function(objeto) {
        if(typeof req.session.usuarioLogado !== 'undefined' && req.session.usuarioLogado.length > 0){
            CarteiraBusiness.consultarCarteira(req.session.usuarioLogado[0]._id).then(function(carteira){
                res.render('index', {tiposUser: objeto.tipos, usuarioLogado: req.session.usuarioLogado, creditos: carteira.carteira[0].creditos});
            }).catch(function(error){
                res.end(JSON.stringify(error));
            });
        }else {
            res.render('index', {tiposUser: objeto.tipos, usuarioLogado: req.session.usuarioLogado});
        }
    });
});

module.exports = router;