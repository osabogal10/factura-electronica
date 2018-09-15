const mongoose = require('mongoose');

const ordenSchema = mongoose.Schema({
  producto: {type: mongoose.Schema.ObjectId, ref: 'Producto', required: true},
  cantidad: {type: Number, required: true}
  
});

module.exports = mongoose.model('Orden', ordenSchema);