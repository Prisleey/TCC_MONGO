var express = require('express');
var router = express.Router();

router.get('/view-cadastro-sala', function(req, res, next) {
    res.render('cadastrarSala');
});

module.exports = router;