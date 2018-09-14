const mongoose = require('mongoose');

const facturaSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  nombreCliente: {type: String, required: true},
  cedulaCliente: {type: Number, required: true},
  ordenes: [{type: mongoose.Schema.ObjectId, ref: "Orden", required: true}],
  total: {type: Number, required: true}
  
});

module.exports = mongoose.model('Factura', facturaSchema);