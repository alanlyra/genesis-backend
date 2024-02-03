// Rotas para verificar se a API está funcionando
const express = require('express')
const router = new express.Router()
const Projects = require('../models/Projects')

// Retorna um string indicando que o servidor está funcionando
router.get('/', async (req, res) => {

    //const response = await Projects.find()

    let project = new Projects({
        "name": "Project 1",
        "description": "Description of project 1",
        "startDate": "2021-01-01",
        "endDate": "2021-12-31",
        "status": "In progress",
        "owner": "1",
        "bibliometrics": {
            "method": "bibliometrics",
            "keywords": ["word1", "word2", "word3"],
            "documents": [
                
            ]
        },
        "roadmap": [
            {
                "document": 1,
                "sentence": 1,
                "forecast": "forecast",
                "forecastDate": "next year",
                "explicitDate": "2025"
            },
            {
                "document": 1,
                "sentence": 2,
                "forecast": "forecast",
                "forecastDate": "next year",
                "explicitDate": "2025"
            }
        ],
        "scenarios": {
            "plausible": "Scenario 1",
            "pessimistic": "Scenario 2",
            "optimistic": "Scenario 3"
        },
        report: {
            "text": "Report text"
        }
    });

    const response = await project.save()
    console.log(response)

    res.send(response)
    //res.send(`[${process.env.PROJECT_ENVIRONMENT.toUpperCase()}] Servidor backend do GENESIS está no ar`)

})

module.exports = router