var mongoose = require('mongoose');
Schema = mongoose.Schema;

let userSchema = new Schema({
    nome: {type: String, required: true},
    senha: {type: String, required: true}, 
    login: {type: String, trim: true, index: true, required: true},
    email: {type: String, trim: true, index: true, required: true},
    tipo: {type: Schema.Types.ObjectId, trim:true, required: true, ref: 'TipoUsuario'}
}, {collection : 'Usuario'});

var userModel = mongoose.model('Usuario', userSchema);

module.exports = userModel;