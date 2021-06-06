const Usuario = require('../models/usuario')
const Mensagem = require('../models/mensagem')
const Notificacoes = require('../models/notificacoes')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const fs = require('fs')
const { join } = require('path')
const generateToken = require('../config/generateToken')
const { getNovosAmigos } = require('../config/fn_config')
const imagens = [
  "/img/avatar-1.png",
  "/img/avatar-2.png",
  "/img/avatar-3.png",
  "/img/avatar-4.png",
  "/img/avatar-5.png"
]
exports.getUsuario = async (req, res) => {
  try {
    const usuarios = await Usuario.find({})
    req.usuario.amigos.push(req.usuario)
    const novosAmigos = getNovosAmigos(req.usuario.amigos, usuarios)
    res.status(200).json({ usuarios: novosAmigos })
  } catch (err) {
    res.status(400).json({ mensagem: err.message })
  }

}
exports.postUsuario = async (req, res) => {
  try {
    const { senha, email } = req.body
    if (!email)
      return res.status(412).json({ mensagem: "ensira um email :(" })

    const usuarioFinded = await Usuario.findOne({ email })
    if (usuarioFinded) {
      return res.status(409).json({ mensagem: "Já existe um usuário com este email :(" })
    }

    if (senha.length < 6)
      return res.status(412).json({ mensagem: "defina uma senha com maior que 6 caracter :(" })

    bcrypt.hash(senha, 10, async (err, hash) => {
      if (err)
        return res.status(400).json({ mensagem: err.message })

      req.body.senha = hash
      req.body.image = imagens[Math.floor(Math.random() * 4)]
      try {
        const usuario = await new Usuario(req.body).save()
        usuario.senha = undefined
        return res.status(201).json({ mensagem: "Usuario criado", atributos: usuario, token: generateToken({ id: usuario._id }) })
      } catch (err) {
        return res.status(400).send({ mensagem: err.message })
      }
    })
  } catch (err) {
    return res.status(400).send({ mensagem: err.message })
  }
}
exports.getOneUsuario = async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.params.usuarioId).populate(['notificacoes', 'amigos', 'conversas'])
    usuario.amigos = usuario.amigos.map(a => {
      a.amigos = undefined
      a.notificacoes = undefined
      a.senha = undefined
      a.conversas = undefined
      return a
    })
    usuario.senha = undefined
    return res.status(200).json(usuario)
  } catch (err) {
    console.log(err)
    res.status(400).send({ mensagem: err.message })
  }
}
exports.updateUsuario = async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.params.usuarioId)
    if (!usuario) {
      return res.status(409).send({ mensagem: "usuário não encontrado :(" })
    }
    Usuario.findOneAndUpdate({ _id: usuario.id }, req.body).then(usuario => {
      res.status(201).json({ mensagem: "Usuario atualizado!" })
    }).catch(err => {
      res.status(400).send({ mensagem: err.message })
    })

  } catch (err) {
    res.status(400).send({ mensagem: err.message })
  }
}
exports.deleteUsuario = async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.params.usuarioId)
    Usuario.findOneAndDelete({ _id: usuario.id }).then(usuario => {
      res.status(201).json({ mensagem: "Usuario deletado!" })
    }).catch(err => {
      res.status(400).send({ mensagem: err.message })
    })
  } catch (err) {
    res.status(400).send({ mensagem: err.message })
  }
}

exports.loginUsuario = async (req, res) => {
  const { senha, email } = req.body
  //CERIFICANDO A SENHA

  if (!senha)
    return res.status(401).json({ mensagem: "informe a senha." })

  if (senha.length < 6)
    return res.status(412).json({ mensagem: "só é permitido senha com mais de 6 caracter." })

  if (!email)
    return res.status(412).json({ mensagem: "porfavor informe o email ou número." })

  try {
    var usuario = null
    if (/^\d{9}$/.test(email.trim())) {
      usuario = await Usuario.findOne({ telefone: email })
    } else if (/\w{1,}@\w+.com/.test(email)) {
      usuario = await Usuario.findOne({ email: email })
    } else {
      return res.status(401).json({ mensagem: "Usuario não autenticado (email ou número invalido)." })
    }
    if (!usuario)
      return res.status(401).json({ mensagem: "Usuario não autenticado (email ou número invalido)." })
    console.log(usuario)

    if (!bcrypt.compareSync(senha, usuario.senha))
      return res.status(401).json({ mensagem: "Usuario não autenticado (senha incorreta)." })

    usuario.senha = undefined
    return res.status(201).json({ mensagem: "Usuario logado", atributos: usuario, token: generateToken({ id: usuario._id }) })
  } catch (err) {
    console.log(err);
    return res.status(400).json({ mensagem: "err.message" })
  }
}

//("http://localhost:400/usuarios/datas/preload?mxFriends=10")
/**
 * Objectivo carregar todos os dados na [app]
 * assim que o usuario se logar[authorization]
 * como os contatos.
 * mxFriends o maximo de amigos que app carregará 
 * inicialmente 
 * 
 */
exports.usuarioPedidoAmizade = async (req, res) => {

  try {
    const notifi = new Notificacoes({
      tipo: "PEDIDO_DE_AMIZADE",
      texto: `O ${req.usuario.nome} convidou-te para ser seu amigo!`,
      de: req.usuario._id,
      para: req.params.idPara
    })
    const convidando = await Usuario.findById(req.params.idPara)
    if (!convidando)
      return res.status(412).json({ mensagem: "Amigo que você está a convidar não exite :(" })
    //Verificando se já es amigos deste!
    //convidado existe
    const [cx] = req.usuario.amigos.filter(u => u == convidando.id)
    console.log("PILHAS DE AMIGOS ", cx)

    if (cx) {
      console.warn("JA E SEU AMIGO ", cx)
      return res.status(409).json({ mensagem: `${convidando.nome} já é seu amigo :)` })
    }

    //verificando se já enviaste um pedido de amizada para este usuario
    const [ex] = await Notificacoes.find({ de: req.usuario.id, para: convidando.id })
    console.log("NOTIFI JA ENVIADA ", ex)
    if (ex) {
      console.warn("PEDIDO JA ENVIADO ", ex)
      return res.status(409).json({ mensagem: `já enviaste um convite para ${convidando.sexo === "M" ? "o" : "a"} ${convidando.nome} :)` })
    }

    await notifi.save()

    convidando.notificacoes.push(notifi._id)
    await convidando.save()

    return res.status(200).json({ mensagem: "Convite enviado!" })
  } catch (err) {
    return res.status(400).json({ mensagem: err.message })
  }
}
exports.usuarioConfirmeAmizade = async (req, res) => {
  const usuario = req.usuario
  console.log(req.body, usuario)
  try {
    if (req.body.tipo === "PEDIDO_DE_AMIZADE") {
      const de = await Usuario.findById(req.body.de)
      //verificando se jã é seu amigo
      //console.log(de)
      if (de) {
        const [cx] = req.usuario.amigos.filter(u => u == de.id)
        console.log("PILHA DE AMIGOS: ", req.usuario.amigos, cx)
        if (cx) {
          await Notificacoes.findOneAndDelete({ _id: req.body._id })
          return res.status(400).json({ mensagem: `já es amigo de  ${de.nome} :)` })
        }

        //guardando o id da pessoa que me convidou 
        usuario.amigos.push(de._id)
        await usuario.save()

        de.amigos.push(usuario._id)
        await de.save()

        await Notificacoes.findOneAndDelete({ _id: req.body._id })
        de.amigos = undefined
        de.notificacoes = undefined
        de.senha = undefined
        de.conversas = undefined
        return res.status(200).json({ mensagem: "Ok! podes falar com " + de.nome, usuario: de })
      } else {
        return res.status(400).json({ mensagem: "O dono do convite não foi encontrado!" })
      }
    } else {
      return res.status(400).json({ mensagem: "Esta rota é de convidar novos amigos, babaca verifica o corpo da requisição" })
    }
  } catch (err) {
    return res.status(400).json({ mensagem: err.message })
  }
}
exports.uploadImage = async (req, res) => {
  if (req.query.type && req.query.type === 'imgCapa') {
    if (!/\/avatar-[1-5].\w{3,5}$/.test(req.usuario.image)) {
      try {
        fs.unlinkSync(join(process.cwd(), '/public/' + req.usuario.image))
      } catch (err) {
        return res.status(400).json({ mensagem: err.message })
      }
    }
    req.usuario.image = process.env.HOST ? `${process.env.HOST}/img/${req.file.filename}` : `/img/${req.file.filename}`
    await req.usuario.save()
    return res.status(200).json({ mensagem: "nova imagem de capa selecionada!", link: process.env.HOST ? `${process.env.HOST}/img/${req.file.filename}` : `/img/${req.file.filename}` })
  } else {
    return res.status(400).json({ mensagem: "Consulta invalida", ...req.query })
  }

}