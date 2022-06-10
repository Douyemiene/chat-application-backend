const sendMessage = async (data, socket, io) => {
   try{
    const {name, message, room} = data
    // console.log({name, message, room})
    const msg = {name, message}
    if(room){
      io.to(room).emit('message', msg)
      if(room != 'admin' && name != 'Timothy') io.to('admin').emit('message', msg)
    }else{
     socket.broadcast.emit('message', msg)
    }

   }catch(err){
      console.log({err})
   }
}

module.exports = {sendMessage}
