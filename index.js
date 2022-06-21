const express = require('express')
const http = require('http')
const cors = require('cors')
const Socket = require('./socket')
require('dotenv').config()

const app = express()
const server = http.createServer(app);
const socket = new Socket(server)


app.use(cors({ origin: '*'}))



const PORT = process.env.PORT 

app.get('/', (req,res) => {
  res.send(`You are at the backend now ___ PORT: ${PORT}`)
})

server.listen(PORT,  async () => {
  await socket.onConnection()
  console.log('listening on', PORT)
});

module.export = socket

