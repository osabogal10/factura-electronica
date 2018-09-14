const mongoose = require('mongoose');

const ordenSchema = mongoose.Schema({
  idProducto: mongoose.Schema.Types.ObjectId,
  cantidad: {type: Number, required: true}
  
});

module.exports = mongoose.model('Orden', ordenSchema);