// Rotas para verificar se a API está funcionando
const express = require('express')
const router = new express.Router()
const Projects = require('../models/Projects')

// Retorna um string indicando que o servidor está funcionando
router.get('/', async (req, res) => {

    const response = await Projects.find({}, 'name')
    console.log(response)

    res.send(response)

})

module.exports = router