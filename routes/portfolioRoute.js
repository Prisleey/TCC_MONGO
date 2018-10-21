let express = require('express');
let router = express.Router();
let UsuarioBusiness = require('../business/usuarioBusiness');

router.get('/portfolio', function(req, res, next) {
console.log('ID DO USUARIO: ', req.query.id_prestador);

    let id_prestador = req.query.id_prestador;
    let flag_portfolio = req.query.flag;

    UsuarioBusiness.consultarDadosUsuario(id_prestador).then(function(objetoUser) {
        console.log(objetoUser.usuario);
        //res.end(JSON.stringify(objetoUser.usuario));
        if(req.session.usuarioLogado) {
            res.render('portfolio', { tiposUser : {}, usuarioLogado: req.session.usuarioLogado, usuario: objetoUser.usuario});
        } else {
            res.render('portfolio', { tiposUser : {}, usuarioLogado: false, usuario: objetoUser.usuario});
        }
    }).catch(function(erro){
        res.end(JSON.stringify(erro));
    });
});

module.exports = router;