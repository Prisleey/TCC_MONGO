let express = require('express');
let router = express.Router();
let AgendaBusiness = require('../business/agendaBusiness');

router.get('/agenda', function(req, res, next) {
    let id_user = req.session.usuarioLogado[0]._id;

    AgendaBusiness.consultarAgendamento(id_user).then(function(agendamentos){
        res.render('agenda', {'agendamentos': agendamentos});
    }).catch(function(erro) {
        res.end(erro);
    });
});

module.exports = router;