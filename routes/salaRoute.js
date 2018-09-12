var express = require('express');
var EstudioBusiness = require('../business/estudioBusiness');
var router = express.Router();

router.get('/cadastro-sala', function(req, res, next) {

    let idUsuarioLogado = req.session.usuarioLogado[0]._id;

    EstudioBusiness.consultarEstudio(idUsuarioLogado).then(function(objeto) {
        res.render('cadastrarSala', {estudios: objeto.estudios, usuarioLogado: req.session.usuarioLogado});
    }).catch(function(erro) {
        res.end(JSON.stringify(erro));
    });
});

router.post('/cadastro-sala', function(req, res, next) {
    var id_estudio = req.body.id_estudio;
    var nome = req.body.nome_sala;
    var valor = req.body.valor_sala;

    let sala = {
        'nomeSala' : nome,
        'valorSala' : valor
    };

    EstudioBusiness.updateEstudio(id_estudio, sala).then(function(objeto) {
        console.log(objeto);
        res.render('index', { usuarioLogado: req.session.usuarioLogado });
    }).catch (function(erro) {
        console.log(erro);
        res.render('index', { usuarioLogado: req.session.usuarioLogado });
    });
});

module.exports = router;