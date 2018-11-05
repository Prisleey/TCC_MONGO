let express = require('express');
let router = express.Router();
let CarteiraBusiness = require('../business/carteiraBusiness');

router.get('/carteira', function(req, res, next) {
    let id_user = req.session.usuarioLogado[0]._id;

    CarteiraBusiness.consultarAgendamento(id_user).then(function(agendamentos){
        console.log(agendamentos);
        res.render('agenda', {usuarioLogado: req.session.usuarioLogado});
    }).catch(function(erro) {
        res.end(erro);
    });
});