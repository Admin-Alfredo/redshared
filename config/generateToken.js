const jwt = require('jsonwebtoken')
const {key} = require('./secret.json')
module.exports = payload =>(jwt.sign(payload, key, {}))
