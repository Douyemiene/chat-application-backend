const socket = require('socket.io')
const chat = require('./db/Chatmodel')
const { sendMessage } = require('./chatController')
class Socket{
    io = null

    constructor(server){
        this.server = server
    }

    async start(){
        this.io = await socket(this.server, {
            cors: {
            origin: "http://localhost:3000",
          }
        });
    }

    async onConnection(){
        await this.start()
        this.io.on('connection', async (socket) => {
   
            socket.on('input', data => {
                sendMessage(data, socket, this.io)
            })

            socket.on('join-room', rooms => {
                rooms.forEach(room => socket.join(room))
            })

        })
    }
    
}

module.exports = Socket











