const { Server } = require('socket.io')
const { sendMessage } = require('./chatController')
const { createClient } = require('redis');
const { createAdapter } = require('@socket.io/redis-adapter');

class Socket{
    io = null

    constructor(server){
        this.server = server
    }

    async start(){
        const pubClient = createClient({ url: "redis://localhost:6379" });
        const subClient = pubClient.duplicate();
        await Promise.all([pubClient.connect(), subClient.connect()]).then(async () => {
           
            this.io = await new Server(this.server, {
                cors: {
                origins: ["http://localhost:3000","http://localhost:34669"]
              }
            });
            this.io.adapter(createAdapter(pubClient, subClient));
          });

    }

    async onConnection(){
        await this.start()
        this.io.on('connection', async (socket) => {
   
            socket.on('input', data => {
                console.log({data})
                sendMessage(data, socket, this.io)
            })

            socket.on('join-room', rooms => {
                rooms.forEach(room => socket.join(room))
            })

            socket.on("disconnecting", () => {
                console.log(socket.rooms); // the Set contains at least the socket ID
              });

        })
    }
    
}

module.exports = Socket











