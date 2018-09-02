let mongoose = require('mongoose');
Schema = mongoose.Schema;

let tipoServicoSchema = new Schema({
    _id : {type: Schema.Types.ObjectId},
    nomeServico : {type: String, required: true, index: true},
});

var tipoServico = mongoose.model('TipoServico', tipoServicoSchema);

module.exports = tipoServico;