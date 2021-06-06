const Usuario = require('../models/usuario')
const Mensagem = require('../models/mensagem')
module.exports = (io, socket) => {
  const usuario = socket.usuario
  socket.on(`chat.message`, async (payload) => {
    if (payload.para && usuario.id == payload.de) {
      payload.data = new Date()
      const mensagem = new Mensagem(payload)

      io.emit(`chat.message.${payload.para}`, mensagem)
      io.emit(`chat.message.${usuario.id}`, mensagem)

      
      
      const addressee = await Usuario.findById(payload.para)
      addressee.conversas.push(mensagem._id)
      usuario.conversas.push(mensagem._id)

      await mensagem.save()
      await addressee.save()
      await usuario.save()
      
    } else {
      console.log("payload... erro")
    }
  })
}
