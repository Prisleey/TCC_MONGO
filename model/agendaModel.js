let mongoose = require('mongoose');
Schema = mongoose.Schema;

let agendamentoSchema = new Schema({
    idSala: {type: Schema.Types.ObjectId, ref : 'Estudio.Sala'},
    horario_inicio: {type: Number, trim: true, required: true},
    horario_fim: {type: Number, trim: true, required: true},
    idServico: {type: Schema.Types.ObjectId, ref : 'Servico'},
    idUsuario:{type: Schema.Types.ObjectId, ref : 'Usuario'},
    descricao:{type: String, trim: true, required: true}
}, {collection : 'Agenda'});

let agendaModel = mongoose.model('Agenda', agendamentoSchema);

module.exports = agendaModel;