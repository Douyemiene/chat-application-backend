const express = require('express')
const { createAgent, updateAgent, getAllAgents } = require('./agentController')

const router = express.Router()

router.get('/', getAllAgents)

router.post('/', createAgent)

router.put('/', updateAgent)

module.exports = router