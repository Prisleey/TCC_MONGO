var express = require('express');
var router = express.Router();

router.get('/portfolio', function(req, res, next) {
    res.render('portfolio', { tiposUser : {} ,usuarioLogado: false});
    //res.end(JSON.stringify(objeto.tipos));
});

module.exports = router;