let express = require('express');
let router = express.Router();
let UsuarioBusiness = require('../business/usuarioBusiness');
let EstudioBusiness = require('../business/estudioBusiness');

router.get('/gerenciar-portfolio', function(req, res, next) {

    let id_prestador = req.query.id_prestador;
    let id_tp_user = req.query.tp_user;
    let flag_portfolio = req.query.flag;

    if(id_tp_user != 4){ //prestador de serviços
        UsuarioBusiness.consultarDadosUsuario(id_prestador).then(function(objetoUser) {
            if(req.session.usuarioLogado) {
                res.render('gerenciarPortfolio', { tiposUser : {}, tp_user: id_tp_user, usuarioLogado: req.session.usuarioLogado, usuario: objetoUser.usuario});
            } else {
                res.render('gerenciarPortfolio', { tiposUser : {}, tp_user: id_tp_user, usuarioLogado: false, usuario: objetoUser.usuario});
            }
        }).catch(function(erro){
            res.end(JSON.stringify(erro));
        });
    } else { // estudio
        EstudioBusiness.consultarEstudioById(id_prestador).then(function(objectEstudio) {
            res.render('gerenciarPortfolio', {tiposUser: {}, tp_user: id_tp_user, usuarioLogado: req.session.usuarioLogado, usuario: objectEstudio.estudios})
        }).catch(function(erro) {
            res.end(JSON.stringify(erro));
        });
    }
});


router.get('/portfolio', function(req, res, next) {
console.log('ID DO USUARIOs: ', req.query.id_prestador);


    let id_prestador = req.query.id_prestador;
    let id_tp_user = req.query.tp_user;
    let flag_portfolio = req.query.flag;

    //capturar fotos do portfolio
    const pastaDasFotos = './public/images/'+id_prestador;
    const caminhoFormatado = require('path').resolve(pastaDasFotos);
    const fs = require('fs');
    let fotos =[];
    if(fs.existsSync(caminhoFormatado)){
        fs.readdir(caminhoFormatado, (err, files) => {
            files.forEach(file => {
                fotos.push(caminhoFormatado + "\\" + file);
            });

            console.log(fotos);
//dkawjdnwa
            if(id_tp_user != 4){ //prestador de serviços
                UsuarioBusiness.consultarDadosUsuario(id_prestador).then(function(objetoUser) {
                    if(req.session.usuarioLogado) {
                        res.render('portfolio', {'fotos':fotos, tiposUser : {}, tp_user: id_tp_user, usuarioLogado: req.session.usuarioLogado, usuario: objetoUser.usuario});
                    } else {
                        res.render('portfolio', {'fotos':fotos, tiposUser : {}, tp_user: id_tp_user, usuarioLogado: false, usuario: objetoUser.usuario});
                    }
                }).catch(function(erro){
                    res.end(JSON.stringify(erro));
                });
            } else { // estudio
                EstudioBusiness.consultarEstudioById(id_prestador).then(function(objectEstudio) {
                    //console.log("OPA CHEGOU AQUI");
                    //console.log(objectEstudio.estudios);
                    res.render('portfolio', {'fotos':fotos, tiposUser: {}, tp_user: id_tp_user, usuarioLogado: req.session.usuarioLogado, usuario: objectEstudio.estudios})
                }).catch(function(erro) {
                    res.end(JSON.stringify(erro));
                });
            }
        })
        console.log("MEU ARRAY ---------------");

    }else{
        console.log("Directory does not exists ------------------- " + caminhoFormatado);
        console.log(caminhoFormatado);

    }

});

module.exports = router;