var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { autenticado : false, tipos : {} });
});

module.exports = router;