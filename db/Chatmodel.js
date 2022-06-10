const  mongoose =  require('mongoose');

const ChatSchema = new mongoose.Schema({
  name: {
      type: String
  },
  message: {
    type: String,
    required: true,
  },
  room: String
});

module.exports = mongoose.model('Chat', ChatSchema);
