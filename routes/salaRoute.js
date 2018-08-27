var express = require('express');
var EstudioBusiness = require('../business/estudioBusiness');
var router = express.Router();

router.get('/view-cadastro-sala', function(req, res, next) {

    EstudioBusiness.consultarEstudio().then(function(objeto) {
        res.render('cadastrarSala', {autenticado : true, estudios: objeto.estudios});
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
        res.render('index', { autenticado : true });
    }).catch (function(erro) {
        console.log(erro);
        res.render('index', { autenticado : erro });
    });
});

module.exports = router;