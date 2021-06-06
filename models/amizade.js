const mongoose = require('../services/db')
const AminzadeSchema = new mongoose.Schema({
    usuarioA: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario',
        require: true
    },
    usuarioB: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario',
        require: true
    },
    data: {
        type: Date,
        require: true,
        default: new Date()
    }
})

const Amizade = mongoose.model('Amizade', AminzadeSchema)
module.exports = Amizade