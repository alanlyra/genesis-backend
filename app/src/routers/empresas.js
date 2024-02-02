// Rotas para verificar se a API está funcionando
const express = require('express')
const router = new express.Router()
const Empresas = require('../models/Empresas')

// Retorna um string indicando que o servidor está funcionando
router.get('/', async (req, res) => {

    const response = await Empresas.find()
    console.log(response)

    res.send(response)
    //res.send(`[${process.env.PROJECT_ENVIRONMENT.toUpperCase()}] Servidor backend do GENESIS está no ar`)

})

module.exports = router