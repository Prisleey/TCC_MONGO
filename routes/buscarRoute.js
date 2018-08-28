var express = require('express');
//let EstudioBusiness = require('../business/estudioBusiness');
var router = express.Router();

router.get('/listar-estudios', function(req, res, next){
    let nomePrestador = req.body.nome;
    let local = req.body.local;
    console.log(nomePrestador);
    console.log(local);
    res.render('listarEstudios');
});
module.exports = router;