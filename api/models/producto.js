const mongoose = require('mongoose');

const productoSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  nombre: {type: String, required: true},
  descripcion: {type: String, required: true},
  precio: {type: Number, required: true}
  
});

module.exports = mongoose.model('Producto', productoSchema);