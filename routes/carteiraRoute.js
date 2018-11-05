let express = require('express');
let router = express.Router();
let CarteiraBusiness = require('../business/carteiraBusiness');

router.get('/carteira', function(req, res, next) {
    let id_user = req.session.usuarioLogado[0]._id;

    CarteiraBusiness.consultarCarteira(id_user).then(function(carteira){
        console.log("EITA");
        console.log(carteira.carteira[0].creditos);
        res.render('carteira', {"creditos": carteira.carteira[0].creditos, usuarioLogado: req.session.usuarioLogado});
    }).catch(function(erro) {
        res.end(erro);
    });
});

module.exports = router;