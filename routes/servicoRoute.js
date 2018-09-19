let express = require('express');
let router = express.Router();

let ServicoBusiness = require('../business/servicoBusiness');

router.post('/cadastro-servico', function(req, res, next) {
    console.log("OPAA");
    console.log(req.body);
    /*let tipoServico = req.body.tipoServico;
    let nomeServico = req.body.nomeServico;
    let precoServico = req.body.precoServico;
    let descricaoServico = req.body.descricaoServico;

    let servico = {
        'tipoServico':tipoServico,
        'nomeServico':nomeServico,
        'precoServico':precoServico,
        'descricaoServico':descricaoServico
    };*/

    /*
    ServicoBusiness.cadastrarServicos(servico).then(function(objeto) {
        res.render('index', { tiposUser: objeto.tipos, usuarioLogado: req.session.usuarioLogado});
    }).catch (function(erro) {
        res.render('');
    });
    */
});

router.post('/tipos-servico', function(req, res, next) {
    let tipoUsuario = req.body.tipoUsuario;
    ServicoBusiness.consultarTipoDeServicoPorTipoDeUsuario(tipoUsuario).then(function(tiposServico) {
        res.send(tiposServico);
    }).catch (function(erro) {
        res.error(erro);
    });
    //res.end()
});

router.get('/visualizar-servico', function(req, res, next) {
    res.render();
});

module.exports = router;