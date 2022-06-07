const db = require('./db/dbconnect')
const express = require('express')
const http = require('http')
const socket = require('socket.io')
const cors = require('cors')
const agentRouter = require('./agentRouter')
require('dotenv').config()

const app = express()
const server = http.createServer(app);

app.use(cors({ origin: '*'}))
app.use(express.json());
app.use('/agents', agentRouter )

const io = socket(server, {
    cors: {
    origin: "http://localhost:3000",
  }
});

//runs everytime a client connects
io.on('connection', socket => {
    console.log(socket.id)

    // io.emit('new-user', [1,2,3])
});

const PORT = process.env.PORT 
server.listen(PORT,  async () => {
  await db()
  console.log('listening on', PORT)
});


