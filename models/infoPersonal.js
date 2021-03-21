const mongoose = require('mongoose') //para interactuar con la bd de mongo

const infoPersonalSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true
  },
  apellidos: {
    type: String,
    required: true
  },
  edad: {
    type: Number,
    required: true
  },
  trabajo: {
    type: Boolean,
    required: true
  },
  direccion: [
    {
      type: String, 
      required: true,
      enum: ['arroz', 'pollo', 'tomate']
    }
  ],
  Date: {
    type: Date,
    required: true,
    default: Date.now
  }
})

module.exports = mongoose.model('infoPersonal', infoPersonalSchema) //El primero es el nombre de la bd y el segundo es el esquema que corresponde a un modelo
//El primero es el nombre del documento y el segundo es el nombre del esquema que se t