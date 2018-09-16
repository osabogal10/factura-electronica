const mongoose = require('mongoose');
const ordenSchema = mongoose.model('Orden').schema;

const facturaSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  nombreCliente: {type: String, required: true},
  cedulaCliente: {type: Number, required: true},
  fecha: {type: String, required: true},
  ordenes: {type:[ordenSchema], required: true},
  total: {type: Number, required: true}
  
});

module.exports = mongoose.model('Factura', facturaSchema);
