const Agent = require('./db/Agentmodel')

const createAgent = async (req, res) => { 
    const { name } = req.body
    try{
        let agent = await Agent.findOne({ name });
    
        if (agent) res.status(401).json({ success: false, error: 'Agent already exists' });
        else{
            await Agent.create({ name,});
            res.json({success:true, error: ''})
        }
    }catch(error){
        console.log({error})
        res.status(500).json({success: false, error: 'error creating agent'})
    }
}


const updateAgent = async (req, res) => {
    const { name, status } = req.body;
    console.log({name,status})
  
      try {
        let agent = await Agent.findOne({ name });
  
        if (!agent) return res.json({ error: 'Agent Not Found' });
    
        await Agent.findOneAndUpdate({ name }, { status });

        res.json({ success: true, msg: 'Agent Edit Successful' });
      } catch (err) {
        res.json({ err: 'try again later?' });
      }
    
};

const getAllAgents = async (req, res) => {
    const agents = await Agent.find({});
  
    res.json({ agents });
  };

module.exports = { createAgent,updateAgent, getAllAgents }