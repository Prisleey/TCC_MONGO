let mongoose = require('mongoose');
Schema = mongoose.Schema;

let servicoSchema = new Schema({
    _id : {type: Schema.Types.ObjectId},
    preco : {type: Decimal, required: true},
    idTipoServico : {type: Schema.Types.ObjectId, ref : 'TipoUsuario'},
    idUsuario : {type: Schema.Types.ObjectId, ref: "Usuario"}
});

var servico = mongoose.model('Servico', servicoSchema);

module.exports = servico;