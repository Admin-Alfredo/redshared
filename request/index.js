


const http = require('http')



const imagens = [
  "/img/avatar-1.png",
  "/img/avatar-2.png",
  "/img/avatar-3.png",
  "/img/avatar-4.png",
  "/img/avatar-5.png"
]
const postData = [
  {
    nome: "Amilton Diogo",
    email: "diogo@gmail.com",
    senha: "123456",
    sexo: "M",
    dataNascimento: "2000-03-01T08:00:00.000Z",
    telefone: 921929387,
    nacionalidade: "Angola",
    image: `${imagens[Math.floor(Math.random() * 4)]}`
  },
  {
    nome: "Andelson Nuno",
    email: "andelsonnuno@gmail.com",
    senha: "123456",
    sexo: "M",
    dataNascimento: "2000-03-01T08:00:00.000Z",
    telefone: 921929374,
    nacionalidade: "Angola",
    image: `${imagens[Math.floor(Math.random() * 4)]}`
  },
  {
    email: "helena@gmail.com",
    nome: "Helena Sebastião",
    senha: "123456",
    dataNascimento: '1999-11-23',
    sexo: "F",
    nacionalidade: "Angola",
    telefone: 929182345,
    image: `${imagens[Math.floor(Math.random() * 4)]}`
  },
  {
    email: "admiroalfredo1742@gmail.com",
    nome: "Admiro Alfredo",
    senha: "admin1742",
    dataNascimento: '2000-02-17',
    sexo: "M",
    nacionalidade: "Angola",
    telefone: 929917123,
    image: `${imagens[Math.floor(Math.random() * 4)]}`
  },
  {
    email: "manuel948@gmail.com",
    nome: "Manuel Alfredo",
    senha: "123456",
    dataNascimento: '1997-08-12',
    sexo: "M",
    nacionalidade: "Angola",
    telefone: 929182341,
    image: `${imagens[Math.floor(Math.random() * 4)]}`
  },
  {
    email: "josemarquipipa@gmail.com",
    nome: "Josemar Quipipa",
    senha: "123456",
    dataNascimento: '1994-02-23',
    sexo: "M",
    nacionalidade: "Angola",
    telefone: 929182342,
    image: `${imagens[Math.floor(Math.random() * 4)]}`
  },
  {
    email: "telma@gmail.com",
    nome: "telma Alfredo",
    senha: "123456",
    dataNascimento: '1999-11-23',
    sexo: "F",
    nacionalidade: "Angola",
    telefone: 929182343,
    image: `${imagens[Math.floor(Math.random() * 4)]}`
  },
  {
    email: "biatriz@gmail.com",
    nome: "Biatriz Sebastião",
    senha: "123456",
    dataNascimento: '1999-11-23',
    sexo: "F",
    nacionalidade: "Angola",
    telefone: 929182344,
    image: `${imagens[Math.floor(Math.random() * 4)]}`
  },
  {
    email: "manolo@gmail.com",
    nome: "Manolo Alfredo",
    senha: "123456",
    dataNascimento: '1999-11-23',
    sexo: "F",
    nacionalidade: "Angola",
    telefone: 929182345,
    image: `${imagens[Math.floor(Math.random() * 4)]}`
  },
  {
    email: "quipipa@gmail.com",
    nome: "Branca Quipipa",
    senha: "123456",
    dataNascimento: '1999-11-23',
    sexo: "F",
    nacionalidade: "Angola",
    telefone: 929182346,
    image: `${imagens[Math.floor(Math.random() * 4)]}`
  },
  {
    email: "sisilha@gmail.com",
    nome: "Sisilha Alfredo",
    senha: "123456",
    dataNascimento: '1999-11-23',
    sexo: "F",
    nacionalidade: "Angola",
    telefone: 929182347,
    image: `${imagens[Math.floor(Math.random() * 4)]}`
  },
  {
    email: "mendez@gmail.com",
    nome: "Mendez Sebastião",
    senha: "123456",
    dataNascimento: '1999-11-23',
    sexo: "M",
    nacionalidade: "Angola",
    telefone: 929182348,
    image: `${imagens[Math.floor(Math.random() * 4)]}`
  },
  {
    email: "admin1742@gmail.com",
    nome: "Admiro Alfredo",
    senha: "123456",
    dataNascimento: '200-02-17',
    sexo: "M",
    nacionalidade: "Angola",
    telefone: 929182349,
    image: `${imagens[Math.floor(Math.random() * 4)]}`
  },
  {
    email: "luz@gmail.com",
    nome: "Liciana Baldez",
    senha: "123456",
    dataNascimento: '1999-11-23',
    sexo: "F",
    nacionalidade: "Angola",
    telefone: 929182340,
    image: `${imagens[Math.floor(Math.random() * 4)]}`
  }
]

const req = http.request({
  hostname: "localhost",
  path: "http://localhost:400/usuarios",
  port: 4000,
  method: "POST",
  headers: {
    'Authorization': "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwMzUxMTcxYzY2MzY3MDc2YzQ5NDBjMyIsImlhdCI6MTYxNDA5MjE0OX0.CWBX68vl6FJAjfglW0c6A5d177i7zITNp-D0Ct0D-lY",
    'Content-Type': "application/json",
    // 'Content-Length': Buffer.byteLength(postData)
  }
}, (res) => {
  res.setEncoding('utf8');
  res.on('data', (datas) => {
    var dataJSON = JSON.parse(datas)
    console.log(`status ${res.statusCode} `, dataJSON)
  })
  res.on('error', (err) => {
    console.log(err.message);
  })
})
req.write(JSON.stringify(postData[13]))
//postData.forEach(data => {
//});

req.end()

