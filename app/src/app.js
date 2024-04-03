const express = require('express')
const { createProxyMiddleware } = require('http-proxy-middleware');

// Conexão do banco de dados
require('./db/mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')

// Importando arquivo de rotas
const healthyRouter = require('./routers/healthy')
const empresasRouter = require('./routers/empresas')
const createProjectsRouter = require('./routers/create-projects')
const getProjectsRouter = require('./routers/get-projects')
const getDocumentsRouter = require('./routers/get-documents')
const getRoadmapRouter = require('./routers/get-roadmap')
const editItemRoadmapRouter = require('./routers/edit-item-roadmap')
//const informacoesCboRouter = require('./routers/informacoesCbo')

const app = express()

// Criando o parser de json (as requisições chegam e vão como objetos JSON)
const jsonParser = bodyParser.json({
    limit: "50mb"
})

// Habilitando CORS e Transformando objeto recebido em JSON
app.use(cors())
app.use(jsonParser)

const port = process.env.PORT || 4000

// Aplicando rotas ao Express
app.use(healthyRouter)
app.use("/empresas", empresasRouter)
app.use("/create-projects", createProjectsRouter)
app.use("/get-projects", getProjectsRouter)
app.use("/get-documents", getDocumentsRouter)
app.use("/get-roadmap", getRoadmapRouter)
app.use("/edit-item-roadmap", editItemRoadmapRouter)
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