const mongoose = require('mongoose');

const facturaSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  nombreCliente: {type: String, required: true},
  cedulaCliente: {type: Number, required: true},
  productos: [{type: mongoose.Schema.ObjectId, ref: "Producto", required: true}],
  total: {type: Number, required: true}
  
});

module.exports = mongoose.model('Factura', facturaSchema);