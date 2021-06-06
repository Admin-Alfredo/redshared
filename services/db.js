











const mongoose = require('mongoose')
const URL_CONNECT_MONGO = process.env.MONGO_DB_CONNECT  || "mongodb://localhost:27017/shareDB"
mongoose.Promise = global.Promise
mongoose.connect(URL_CONNECT_MONGO, { useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log('Your app connected with database'))
    .catch(err => console.error(err.message))
module.exports = mongoose