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
        //console.log(objeto.resultado[0].salas[0]);
        //console.log(objeto.resultado);
        res.render('listarEstudios', {estudios: objeto.resultado});
    }).catch(function(erro){
        res.end(JSON.stringify(erro));
    });
});

router.get('/detalhe-estudio', function(req, res, next) {
    let idEstudio = req.query.id_estudio;

    EstudioBusiness.detalheEstudio(idEstudio).then(function(objeto) {
        res.render('detalheEstudio', {salas: objeto});
    }).catch(function(erro) {
        res.end(JSON.stringify(erro));
    });

    //res.end(JSON.stringify('ID ESTUDIO: ' + idEstudio));
});

module.exports = router;