var express = require('express');
let ServicoBusiness = require('../business/servicoBusiness');
let EstudioBusiness = require('../business/estudioBusiness');
var router = express.Router();

router.get('/listar-pesquisa', function(req, res, next){
    let nomeBusca = req.query.nome;
    let local = req.query.local;
    let who = req.query.who;

    let busca = {
        "nomeBusca": nomeBusca,
        "local": local,
        "who" : who
    };

    ServicoBusiness.buscar(busca).then(function(objeto){
        //res.end(JSON.stringify(objeto));
        if(who == "2") {
            res.end(JSON.stringify(objeto));
            //res.render('listarPesquisa', {prestadorServico: objeto.resultado, usuarioLogado: req.session.usuarioLogado});
        } else if(who == "3") {
            res.end(JSON.stringify(objeto));
            //res.render('listarPesquisa', {prestadorServico: objeto.resultado, usuarioLogado: req.session.usuarioLogado});
        } else if(who == "4") {
            res.render('listarPesquisa', {estudios: objeto.resultado, usuarioLogado: req.session.usuarioLogado});
        }
    }).catch(function(erro){
        res.end(JSON.stringify(erro));
    });
});

router.get('/detalhe-estudio', function(req, res, next) {
    let idEstudio = req.query.id_estudio;

    EstudioBusiness.detalheEstudio(idEstudio).then(function(objeto) {
        console.log(objeto);
        res.render('detalheEstudio', {estudio: objeto, usuarioLogado: req.session.usuarioLogado});
    }).catch(function(erro) {
        res.end(JSON.stringify(erro));
    });
});

router.get('/detalhe-sala', function(req, res, next) {

});

module.exports = router;