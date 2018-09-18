let express = require('express');
let router = express.Router();
let UsuarioBusiness = require('../business/usuarioBusiness');

router.get('/portfolio', function(req, res, next) {
console.log('ID DO PRESTADOR: ', req.query.id_prestador);
    //let id_prestador = req.session.usuarioLogado[0]._id;
    let id_prestador = req.query.id_prestador;
console.log(id_prestador);
    UsuarioBusiness.consultaDadosUsuario(id_prestador).then(function(objeto) {
        console.log(objeto);
        if(req.session.usuarioLogado) {
            res.render('portfolio', { tiposUser : {}, usuarioLogado: req.session.usuarioLogado, usuario: objeto.usuario});
        } else {
            res.render('portfolio', { tiposUser : {}, usuarioLogado: false, usuario: objeto.usuario});
        }
    }).catch(function(erro){
        res.end(JSON.stringify((erro)));
    });
});

module.exports = router;