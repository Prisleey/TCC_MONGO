let mongoose = require('mongoose');
Schema = mongoose.Schema;

let servicoSchema = new Schema({
    _id : {type: Schema.Types.ObjectId},
    nomeServico : {type: String},
    descServico : {type: String},
    precoServico : {type: Number, required: true},
    idTipoServico : {type: Schema.Types.ObjectId, ref : 'TipoServico'}
});

var servico = mongoose.model('Servico', servicoSchema);

module.exports = servico;