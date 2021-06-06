


const Mensagem = require('../models/mensagem')
const Usuario = require('../models/usuario')

exports.getMensagem = async (req, res) => {
  try {
    const mensagens = await Mensagem.find({})
    return res.status(200).json({ mensagens })
  } catch (err) {
    return res.status(400).json({ mensagem: err.message })
  }
}
exports.getOneMensagem = async (req, res) => {
  try {
    const usuario = await Mensagem.findById(req.params.usuarioId)
    return res.status(200).json({ atributos: usuario || [] })
  } catch (err) {
    res.status(400).send({ mensagem: err.message })
  }
}
exports.updateMensagem = async (req, res) => {
  try {

    const mensagem = await Mensagem.findById(req.params.mensagemId)
    if (!mensagem) {
      return res.status(409).send({ mensagem: "mensagem não encontrado :(" })
    }
    Usuario.findOneAndUpdate({ _id: mensagem.id }, req.body).then(() => {
      res.status(201).json({ mensagem: "Usuario atualizado!" })
    }).catch(err => {
      res.status(400).send({ mensagem: err.message })
    })
  } catch (err) {
    res.status(400).send({ mensagem: err.message })
  }
}
exports.deleteMensagem = async (req, res) => {
  try {
    const mensagem = await Mensagem.findById(req.params.mensagemId)
    Mensagem.findOneAndDelete({ _id: mensagem.id }).then(usuario => {
      res.status(201).json({ mensagem: "Usuario deletado!" })
    }).catch(err => {
      res.status(400).send({ mensagem: err.message })
    })
  } catch (err) {
    res.status(400).send({ mensagem: err.message })
  }
}
