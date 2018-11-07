var express = require('express');
var router = express.Router();

var multer  = require('multer')
//var upload = multer({ dest: './public/uploads/' })
var path = require('path');

let UsuarioBusiness = require('../business/usuarioBusiness');
var CarteiraBusiness = require('../business/carteiraBusiness');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/uploads/')
    },
    filename: function (req, file, cb) {
        console.log('filename: ' + file.fieldname);
        cb(null, file.fieldname+'-'+Date.now()+'.'+path.extname(file.originalname));
    }
});

// utiliza a storage para configurar a instância do multer
const upload = multer({ storage });


router.get('/', function(req, res, next) {
    UsuarioBusiness.listTipoUsuario().then(function(objeto) {
        if(typeof req.session.usuarioLogado !== 'undefined' && req.session.usuarioLogado.length > 0){
            CarteiraBusiness.consultarCarteira(req.session.usuarioLogado[0]._id).then(function(carteira){
                res.render('index', {tiposUser: objeto.tipos, usuarioLogado: req.session.usuarioLogado, creditos: carteira.carteira[0].creditos});
            }).catch(function(error){
                res.end(JSON.stringify(error));
            });
        }else {
            res.render('index', {tiposUser: objeto.tipos, usuarioLogado: req.session.usuarioLogado});
        }
    });
});

router.get('/photos/upload', function(req,res,next) {
    res.render('teste');
});

router.post('/photos/upload', upload.single('gallery'), function(req, res) {
    res.send('<h2>Upload realizado com sucesso</h2>')
});

/*
router.post('/photos/upload', upload.array('galery', 12), function (req, res, next) {
    upload(req, res, (err) => {
        if(!err) {
            console.log(req.file);
            res.send('<h2>Upload realizado com sucesso</h2>')
        }
    });
});
*/


module.exports = router;