let CarteiraModel = require('../model/carteiraModel');
let AgendaModel = require('../model/agendaModel');
let ObjectId = require('mongoose').Types.ObjectId;


exports.criarCarteira = function(carteiraTemp) {
    return new Promise(function(resolve, reject) {

        let carteira = new CarteiraModel(carteiraTemp);
        carteira.save(function(err) {
            if(err) {
                reject({status: false, erro: err});
            } else {
                resolve({status: true});
            }
        });
    });
}

exports.estornarComoCredito = function(id_agendamento) {
    return new Promise(function(resolve, reject) {
        AgendaModel.findOne({
            _id : id_agendamento
        }, {
            idUsuario:1,
            valorAgendamento:1
        }, function(err, infoAgendamento) {
            if(!err && infoAgendamento) {
                CarteiraModel.findOne({
                    'idUsuario': infoAgendamento.idUsuario
                }, function (err, carteira) {
                    if(carteira) {
                        let totalCreditos = parseFloat(carteira.creditos) + parseFloat(infoAgendamento.valorAgendamento);

                        CarteiraModel.where({
                            "idUsuario": infoAgendamento.idUsuario
                        }).update({
                            $set: {
                                "creditos": totalCreditos
                            }
                        }, function (err, estorno) {
                            if (err) {
                                reject({'status': false, 'erro': err})
                            } else {
                                resolve({'status': true});
                            }
                        });
                    }
                });

            } else {
                reject({status :false, erro: err});
            }
        });
    });
}

exports.descontarSaldoCarteira = function(id_usuario, valorAgendamento) {
    return new Promise(function(resolve, reject){
        CarteiraModel.find({
            idUsuario : id_usuario
        }, function(erro, carteira) {
            if(carteira) {
                console.log('TESTANDO VALORES PARA SUBTRAÇÃO ######################################');
                console.log('CRÉDITO CARTEIRA> ', parseFloat(carteira[0].creditos));
                console.log('VALOR AGENDAMENTO> ', valorAgendamento);
                let desconto = carteira[0].creditos - valorAgendamento.replace(',','.')
                console.log('TESTANDO VALORES PARA SUBTRAÇÃO ######################################');

                CarteiraModel.where({
                    "idUsuario": id_usuario
                }).update({
                    $set: {
                        "creditos": desconto
                    }
                }, function (err, estorno) {
                    if (err) {
                        reject({'status': false, 'erro': err})
                    } else {
                        resolve({'status': true});
                    }
                });
            } else {
                reject({'status' : false, 'erro' : erro});
            }
        });
    });
}

exports.consultarCarteira = function(id_usuario) {
    return new Promise(function(resolve, reject) {

        CarteiraModel.find({
            idUsuario : id_usuario
        }, function(erro, carteira) {
            if(carteira) {
                resolve({'status' : true, 'carteira' : carteira});
            } else {
                reject({'status' : false, 'erro' : erro});
            }
        });
    });
}

