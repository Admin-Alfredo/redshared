
const express = require('express')
const { auth } = require('../middleware/auth')
const multer = require('multer')

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/img/')
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname)
  }
})
const limits = {
  fileSize: 1024 * 1024 * 3
}
const upload = multer({ storage, limits })
const router = express.Router()
const {
  getUsuario,
  postUsuario,
  getOneUsuario,
  updateUsuario,
  deleteUsuario,
  loginUsuario,
  usuarioPedidoAmizade,
  usuarioConfirmeAmizade,
  uploadImage
} = require('../controllers/usuario')


router.get('/', auth, getUsuario)
router.post('/', postUsuario)
router.get('/:usuarioId', auth, getOneUsuario)
router.put('/:usuarioId', auth, updateUsuario)
router.delete('/:usuarioId', deleteUsuario)
router.post('/login', loginUsuario)
router.get('/enviar/convite/notif/:idPara', auth, usuarioPedidoAmizade)
router.post('/enviar/convite/notif/confirme/', auth, usuarioConfirmeAmizade)
router.post('/upload/', upload.single('avatar_image'), auth, uploadImage)
module.exports = router