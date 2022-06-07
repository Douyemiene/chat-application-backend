const  mongoose =  require('mongoose');

const AgentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  status: {
    type: Boolean,
    default: true
  },
});

module.exports = mongoose.model('Agent', AgentSchema);
