const jwt = require('jsonwebtoken')
const { key } = require('../config/secret.json')
const Usuario = require('../models/usuario')
exports.auth = async (req, res, next) => {

  const authToken = req.headers.authorization

  if (authToken) {
    const splitToken = authToken.split(' ')
    if (!authToken)
      return res.status(401).json({ mensagem: "Usuario Não Autenticado :(" })

    if (splitToken.length !== 2)
      return res.status(401).json({ mensagem: "Usuario o seu token está mal formatado :([0, 1])" })

    if (splitToken[0] !== "Bearer")
      return res.status(401).json({ mensagem: "Usuario o seu token está mal formatado :(Bearer)" })
    try {
      jwt.verify(splitToken[1], key, async (err, decode) => {
        if (err) {
          console.error(err)
          return res.status(401).json({ mensagem: "Token Invalido" })
        }
        const usuario = await Usuario.findById(decode.id)
        if (!usuario)
          return res.status(401).json({ mensagem: "Usuario não Autenticado --/--" })
        req.usuario = usuario
        return next()
      })
    } catch (err) {
      console.log(err.message);
      return res.status(401).json({ mensagem: err.message })
    }
  } else {
    return res.status(401).json({ mensagem: "Usuario não Autenticado!" })
  }
}
exports._auth = (socket, next) => {
  const authToken = socket.handshake.headers.authorization

  if (authToken) {
    const splitToken = authToken.split(' ')
    if (!authToken)
      return next(new Error("Usuario Não Autenticado :("))

    if (splitToken.length !== 2)
      return next(new Error("Usuario o seu token está mal formatado :([0, 1])"))

    if (splitToken[0] !== "Bearer")
      return next(new Error("Usuario o seu token está mal formatado :(Bearer)"))
    try {
      jwt.verify(splitToken[1], key, async (err, decode) => {
        if (err) {
          console.error(err)
          return next(new Error("Token Invalido"))
        }
        const usuario = await Usuario.findById(decode.id)
        if (!usuario)
          return next(new Error("Usuario não Autenticado --/--"))
          
        socket.usuario = usuario
        return next()
      })
    } catch (err) {
      console.log(err.message);
      return next(new Error("Token Invalido"))
    }
  } else {
    return next(new Error("Usuario não Autenticado!"))
  }
}