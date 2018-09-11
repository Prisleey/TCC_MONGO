let express = require('express');
let router = express.Router();

let ServicoBusiness = require('../business/servicoBusiness');

router.post('/novo-servico', function(req, res, next) {
    let tipoServico = req.body.tipoServico;
    let nomeServico = req.body.nomeServico;
    let precoServico = req.body.precoServico;
    let descricaoServico = req.body.descricaoServico;

    let tipoServico = {
        'tipoServico':tipoServico,
        'nomeServico':nomeServico,
        'precoServico':precoServico,
        'descricaoServico':descricaoServico
    };

    ServicoBusiness.cadastrarServicos(tipoServico).then(function(objeto) {
        console.log(objeto);
        res.render('');
    }).catch (function(erro) {
        console.log(erro);
        res.render('');
    });

});

router.get('/visualizar-servico', function(req, res, next) {
    res.render();
});

module.exports = router;