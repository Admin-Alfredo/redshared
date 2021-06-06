


const mongoose = require('../services/db')
const MensagemSchema = new mongoose.Schema({
  de: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
    require: true
  },
  para: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
    require: true
  },
  data: {
    type: Date,
    require: true,
    default: new Date()
  },
  texto: {
    type: String,
    require: false
  },
  visto: {
    type: Boolean,
    require: false,
    default: false
  }
})

const Mensagem = mongoose.model('Mensagem', MensagemSchema)
module.exports = Mensagem