var express = require('express');
var router = express.Router();

let UsuarioBusiness = require('../business/usuarioBusiness');

/* GET home page. */
router.get('/', function(req, res, next) {
    UsuarioBusiness.listTipoUsuario().then(function(objeto) {
        //res.end(JSON.stringify(objeto.tipos));
        res.render('index', { tipos: objeto.tipos, usuarioLogado: req.session.login});
    });
});

module.exports = router;