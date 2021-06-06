
const express = require('express')
//const morgan = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')
//const socketio = require('socket.io')
const http = require('http')
const { _auth } = require('./middleware/auth')
const app = express()

const server = http.createServer(app)
exports.app = app

app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE", ""],
  allowedHeaders: ['Content-Type', 'Authorization', 'Origin']
}))

const io = socketio(server, {
  cors: {
    origin: ["https://redshared.herokuapp.com/"],
    methods: ["POST", "PUT", "GET", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Origin", "Authorization", "Token"]
  }
})
//app.use(morgan('dev'))
app.use(bodyParser.json({ limit: '20mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '20mb', extended: true }))

app.use(express.static('./public'))

//LOGS DAS REQUISIÇÕES 


const PORT = process.env.PORT || 4000
const RouteUsuario = require('./routes/usuario')
const RouteMensagem = require('./routes/mensagem')

io.use(_auth)
io.on('connection', (socket) => require('./services/chat')(io, socket))

app.use('/usuarios', RouteUsuario)
app.use('/mensagems', RouteMensagem)

server.listen(PORT, () => {
  console.log(`RedShare in port ${PORT}`)
})


