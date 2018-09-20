let mongoose = require('mongoose');
Schema = mongoose.Schema;

let agendamentoSchema = new Schema({
    idSala: {type: Schema.Types.ObjectId, ref : 'Estudio.Sala'},
    dataAgendamento : {type: String, required: true},
    horario_inicio: {type: String, trim: true, required: true},
    horario_fim: {type: String, trim: true, required: true},
    idServico: {type: Schema.Types.ObjectId, ref : 'Servico'},
    idUsuario:{type: Schema.Types.ObjectId, ref : 'Usuario'}
}, {collection : 'Agenda'});

let agendaModel = mongoose.model('Agenda', agendamentoSchema);

module.exports = agendaModel;