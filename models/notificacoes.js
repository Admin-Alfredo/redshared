const mongoose = require('../services/db')
const NotificacoesSchema = new mongoose.Schema({
  tipo: {
    type: String,
    require: true
  },
  data: {
    type: Date,
    reuire:false,
    default: new Date()
  },
  texto: {
    type: String,
    require: false,
  },
  de: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
    require: false
  },
  para: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
    require: true
  },
  links: [{
    type: String,
    require: false
  }]
})
// 1 - tipo: pedido-de-amizade
// 2 - ...
// 3 - ..
const Notificacoes = mongoose.model('Notificacoes', NotificacoesSchema)
module.exports = Notificacoes