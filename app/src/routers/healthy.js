// Rotas para verificar se a API está funcionando
const express = require('express')
const auth = require('../middleware/auth')
const router = new express.Router()

// Retorna um string indicando que o servidor está funcionando
//router.get('/', auth, async (req, res) => {
router.get('/', async (req, res) => {

    res.send(`[${process.env.PROJECT_ENVIRONMENT.toUpperCase()}] Servidor backend do GENESIS está no ar`)

})

module.exports = router