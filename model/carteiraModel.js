let mongoose = require('mongoose');
Schema = mongoose.Schema;

let carteiraSchema = new Schema({
    creditos: {type: Number, required: true},
    idUsuario:{type: Schema.Types.ObjectId, ref : 'Usuario'}
}, {collection : 'Carteira'});

let carteiraModel = mongoose.model('Carteira', carteiraSchema);

module.exports = carteiraModel;