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

    console.log("chegou na rota");
    let dadosSala = req.body;
    console.log(dadosSala[0]);
   // console.log(dadosSala[0]);

    let id_estudio = dadosSala[0].value;
    let nome = dadosSala[1].value;
    let equipamentos = dadosSala[2].value;


    let sala = {
        'nomeSala' : nome,
        'equipamentosSala' : equipamentos
    };
    console.log("AAAA SALAAAA");
    console.log(sala);
    EstudioBusiness.updateEstudio(id_estudio, sala).then(function(objeto) {
        console.log(objeto);
        res.send(objeto);
        //res.render('index', { usuarioLogado: req.session.usuarioLogado });
    }).catch (function(erro) {
        console.log(erro);
        res.send(erro);
        //res.render('index', { usuarioLogado: req.session.usuarioLogado });
    });
});

module.exports = router;