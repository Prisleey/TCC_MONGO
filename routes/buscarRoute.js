var express = require('express');
let ServicoBusiness = require('../business/servicoBusiness');
var router = express.Router();

router.get('/listar-estudios', function(req, res, next) {
    res.render('listarEstudios');
});

router.post('/listar-estudios', function(req, res, next){
    console.log("COMECOU!!");
    let nomeBusca = req.body.nome;
    let local = req.body.local;
    let busca= {
        "nomeBusca": nomeBusca,
        "local": local
    };

    console.log(nomeBusca);
    console.log(local);

    ServicoBusiness.buscar(busca).then(function(objeto){
        console.log("Deu 'sucesso'");
       res.render('listarEstudios', {resultado: objeto});
    }).catch(function(erro){
        res.end(JSON.stringify(erro));
    });
});
module.exports = router;