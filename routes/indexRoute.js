var express = require('express');
var router = express.Router();

let UsuarioBusiness = require('../business/usuarioBusiness');

router.get('/', function(req, res, next) {
    UsuarioBusiness.listTipoUsuario().then(function(objeto) {
        //console.log('idtpusuario session: ', req.session.usuarioLogado[0].idTpUsuario);
        res.render('index', { tiposUser: objeto.tipos, usuarioLogado: req.session.usuarioLogado});
    });
});

module.exports = router;