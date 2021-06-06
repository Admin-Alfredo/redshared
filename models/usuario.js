


const mongoose = require('../services/db')
const UsuarioSchema = new mongoose.Schema({
  nome: {
    type: String,
    require: true
  },
  email: {
    type: String,
    require: true
  },
  senha: {
    type: String,
    require: true,
  },
  sexo: {
    type: String,
    require: true,
    default: 'M'
  },
  dataNascimento: {
    type: Date,
    require: false,
  },
  telefone: {
    type: Number,
    require: false,
  },
  nacionalidade:{
    type: String,
    require:false,
  },
  image: {
    type: String,
    require: false,
    default: ''
  },
  amigos: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
    require: false
  }],
  conversas:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Mensagem',
    require: false
  }],
  notificacoes:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Notificacoes',
    require: false
  }],

})

const Usuario = mongoose.model('Usuario', UsuarioSchema)
module.exports = Usuario