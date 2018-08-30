var express = require('express');
let ServicoBusiness = require('../business/servicoBusiness');
var router = express.Router();

router.get('/listar-estudios', function(req, res, next){

    let nomeBusca = req.query.nome;
    let local = req.query.local;
    let busca= {
        "nomeBusca": nomeBusca,
        "local": local
    };

    ServicoBusiness.buscar(busca).then(function(objeto){
        console.log(objeto.resultado);
        res.render('listarEstudios', {estudios: objeto.resultado});
    }).catch(function(erro){
        res.end(JSON.stringify(erro));
    });
});

module.exports = router;