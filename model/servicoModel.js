let mongoose = require('mongoose');
Schema = mongoose.Schema;

let servicoSchema = new Schema({
    nomeServico: {type: String},
    descricaoServico: {type: String},
    precoServico: {type: Number, required: true},
    idTipoServico: {type: Schema.Types.ObjectId, ref: 'TipoServico'},
}, {collection : 'Servico'});

var servico = mongoose.model('Servico', servicoSchema);

module.exports = servico;