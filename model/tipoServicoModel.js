let mongoose = require('mongoose');
Schema = mongoose.Schema;

let tipoServicoSchema = new Schema({
    _id: {type: Schema.Types.ObjectId},
    nomeTpServico: {type: String, required: true, index: true},
    idTpUsuario: {type: Number},
},  {collection : 'TipoServico'});

var tipoServico = mongoose.model('TipoServico', tipoServicoSchema);

module.exports = tipoServico;