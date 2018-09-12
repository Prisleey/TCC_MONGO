let express = require('express');
let router = express.Router();

let ServicoBusiness = require('../business/servicoBusiness');

router.post('/novo-servico', function(req, res, next) {
    let tipoServico = req.body.tipoServico;
    let nomeServico = req.body.nomeServico;
    let precoServico = req.body.precoServico;
    let descricaoServico = req.body.descricaoServico;

    let servico = {
        'tipoServico':tipoServico,
        'nomeServico':nomeServico,
        'precoServico':precoServico,
        'descricaoServico':descricaoServico
    };

    ServicoBusiness.cadastrarServicos(servico).then(function(objeto) {
        res.render('');
    }).catch (function(erro) {
        res.render('');
    });

});

router.post('/tipos-servico', function(req, res, next) {
    console.log("CHEGOU AQUI");
    let tipoUsuario = req.body.tipoUsuario;
    ServicoBusiness.consultarTipoDeServicoPorTipoDeUsuario(tipoUsuario).then(function(tiposServico) {
        console.log(tiposServico);
        res.send('OPA DEU BOM');
    }).catch (function(erro) {
        console.log(erro);
        res.error("DEU RUIM");
    });
    //res.end()
});

router.get('/visualizar-servico', function(req, res, next) {
    res.render();
});

module.exports = router;