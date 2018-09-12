let mongoose = require('mongoose');
Schema = mongoose.Schema;

let salaSchema = new Schema({
    nomeSala : {type: String, required: true, index: true},
    valorSala : {type: Number, required: true},
    // equipamentos : {type: [Schema.Types.ObjectId], ref: 'Equipamento' },
});

let estudioSchema = new Schema({
    nomeEstudio: {type: String, required: true, index: true},
    descricao: {type: String, required: true}, 
    estado: {type: String, trim: true, required: true},
    cidade: {type: String, trim: true, required: true},
    bairro: {type: String, trim: true, required: true},
    rua: {type: String, trim: true, required: true},
    cep: {type: String, trim: true, required: true},
    telefone: {type: String, trim: true, required: true},
    idUsuario : {type: Schema.Types.ObjectId, ref : 'Usuario'},
    salas: {
        type: [salaSchema],
        select: true,
    },
}, {collection : 'Estudio'});

var estudioModel = mongoose.model('Estudio', estudioSchema);

module.exports = estudioModel;