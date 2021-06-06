const express = require('express')

const router = express.Router()
const {
    getMensagem,
    //postMensagem,
    getOneMensagem,
    updateMensagem,
    deleteMensagem
} = require('../controllers/mensagem')

router.get('/', getMensagem)
//router.post('/', postMensagem)
router.get('/:mensagemId', getOneMensagem)
router.put('/:mensagemId', updateMensagem)
router.delete('/:mensagemId', deleteMensagem)

module.exports = router