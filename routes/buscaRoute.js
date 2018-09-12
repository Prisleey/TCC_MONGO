var express = require('express');
let ServicoBusiness = require('../business/servicoBusiness');
let EstudioBusiness = require('../business/estudioBusiness');
var router = express.Router();

router.get('/listar-estudios', function(req, res, next){
    let nomeBusca = req.query.nome;
    let local = req.query.local;
    let busca= {
        "nomeBusca": nomeBusca,
        "local": local
    };

    ServicoBusiness.buscar(busca).then(function(objeto){
        res.render('listarEstudios', {estudios: objeto.resultado});
    }).catch(function(erro){
        res.end(JSON.stringify(erro));
    });
});

router.get('/detalhe-estudio', function(req, res, next) {
    let idEstudio = req.query.id_estudio;

    EstudioBusiness.detalheEstudio(idEstudio).then(function(objeto) {
        console.log('teste');
        res.render('detalheEstudio', {estudio: objeto}, {servico: obj});
    }).catch(function(erro) {
        res.end(JSON.stringify(erro));
    });
});

router.get('/detalhe-sala', function(req, res, next) {

});

module.exports = router;