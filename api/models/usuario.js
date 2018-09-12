const mongoose = require('mongoose');

const usuarioSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  nombre: {type: String, required: true},
  correo: {type: String, required: true},
  password: {type: String, required: true},
  facturas: [{type: mongoose.Schema.ObjectId, ref: "Factura", required: false}]


});