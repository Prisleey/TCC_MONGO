var mongoose = require('mongoose');
Schema = mongoose.Schema;

let tpUserSchema = new Schema({
    _id: {type: Schema.Types.ObjectId},
    desc: {type: String, required: true},
    idTpUsuario : {type: String},
}, {collection : 'TipoUsuario'});

var tpUserModel = mongoose.model('TipoUsuario', tpUserSchema);

module.exports = tpUserModel;