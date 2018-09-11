let express = require('express');
let router = express.Router();


router.get('/xablau', function(req, res, next) {
    //nesse req.session.{qualquer merda}
    //você cria o que você quiser ali, jsonzão
    if(req.session.user_loged) {
        res.end("sessão -> "+req.session.user_loged);    
    }else {
        req.session.user_loged = "bunda"
        res.end("inseriu a sessão");
    }
});

router.get('/destroir', function(req, res, next) {
    //logout
    req.session.destroy(function(err) {
        res.end("sessao destruida");
    })
    
});

module.exports = router;