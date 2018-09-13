var express = require('express');
var router = express.Router();

router.get('/portfolio', function(req, res, next) {
    if(req.session.usuarioLogado) {
        res.render('portfolio', { tiposUser : {}, usuarioLogado: req.session.usuarioLogado});
    } else {
        res.render('portfolio', { tiposUser : {}, usuarioLogado: false});
    }
});

module.exports = router;