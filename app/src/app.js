const express = require('express')
const { createProxyMiddleware } = require('http-proxy-middleware');

// Conexão do banco de dados
require('./db/mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')

// Importando arquivo de rotas
const healthyRouter = require('./routers/healthy')
const projectsRouter = require('./routers/projects')
const documentsRouter = require('./routers/documents')
const roadmapRouter = require('./routers/roadmap')
const eventsRoadmapRouter = require('./routers/events-roadmap')
//const informacoesCboRouter = require('./routers/informacoesCbo')

const app = express()

// Criando o parser de json (as requisições chegam e vão como objetos JSON)
const jsonParser = bodyParser.json({
    limit: "50000mb"
})

// Habilitando CORS e Transformando objeto recebido em JSON
app.use(cors())
app.use(jsonParser)

const port = process.env.PORT || 4000

// Aplicando rotas ao Express
app.use(healthyRouter)
app.use("/projects", projectsRouter)
app.use("/documents", documentsRouter)
app.use("/roadmap", roadmapRouter)
app.use("/events-roadmap", eventsRoadmapRouter)
app.use("/pdf", createProxyMiddleware({
    target: process.env.DOCUMENTOS_PDF_URL,
    pathRewrite: {
        '^/pdf': '', // remove /pdf from the URL
    },
    changeOrigin: true,
}))
//app.use("/rais", raisRouter)
//app.use("/ibge",ibgeRouter)
//app.use("/relatorio", proxy(process.env.SENAC_RELATORIOS_URL))

app.listen(port, () => {
    console.log(`Servidor iniciado na porta ${port}`)
})