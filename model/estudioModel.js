var mongoose = require('mongoose'),
Schema = mongoose.Schema;

var userSchema = new Schema({
    nomeEstudio: {type: String, required: true, index: true},
    descricao: {type: String, required: true}, 
    estado: {type: String, trim: true, required: true},
    cidade: {type: String, trim: true, required: true},
    bairro: {type: String, trim: true, required: true},
    rua: {type: String, trim: true, required: true},
    cep: {type: String, trim: true, required: true}
}, {collection : 'Estudio'});

var userModel = mongoose.model('Estudio', userSchema);

module.exports = userModel;