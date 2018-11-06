let express = require('express');
let router = express.Router();
let CarteiraBusiness = require('../business/carteiraBusiness');

router.get('/carteira', function(req, res, next) {
    let id_user = req.session.usuarioLogado[0]._id;

    CarteiraBusiness.consultarCarteira(id_user).then(function(carteira){

        res.render('carteira', {"creditos": carteira.carteira[0].creditos, usuarioLogado: req.session.usuarioLogado});
    }).catch(function(erro) {
        res.end(erro);
    });
});

router.post('/descontarSaldo', function(req,res,next) {
    let id_user = req.body.id_usuario;
    let valorAgendamento = req.body.valorAgendamento;

    CarteiraBusiness.descontarSaldoCarteira(id_user, valorAgendamento).then(function(saldo) {
        res.send(saldo);
    }).catch(function(err) {
        res.end(err);
    });
});

router.post('/checarSaldo', function(req, res, next) {
    //let id_user = req.session.usuarioLogado[0]._id;

    let id_user = req.body.id_usuario;

    CarteiraBusiness.consultarCarteira(id_user).then(function(carteira){
        res.send({"creditos": carteira.carteira[0].creditos/*, usuarioLogado: req.session.usuarioLogado*/});
    }).catch(function(erro) {
        res.end(erro);
    });
});

module.exports = router;