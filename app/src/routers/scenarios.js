const express = require('express')
const router = new express.Router()
const axios = require('axios');
const Projects = require('../models/Projects')
const DocumentSchema = require('../models/subSchemas/DocumentSchema')

// Rota para retornar o roadmap de um projeto e gerar scenarios
router.put('/:_id', async (req, res) => {
    const { _id } = req.params;
    const updatedProject = req.body;

    console.log("Initializing Scenarios Module...");

    const project = await Projects.findById(_id).populate('roadmap');
    if (!project) {
        return res.status(404).send({ message: 'Project not found' });
    }

    console.log("Initializing Scenarios Generation for Project ID: " + _id);

    try {
        const response = await axios.get('http://scenarios-service:4108/scenarios/project/' + project._id);
        console.log("Finished Scenarios Generation for Project ID: " + project._id);

        // Atualize o projeto com os dados retornados pela API de scenarios
        Object.assign(project, response.data);

        // Salve o projeto atualizado no banco de dados
        await project.save();

        res.send(project);
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: 'Error during Scenarios Generation for Project ID: ' + project._id });
    }
});

// Rota para retornar os scenarios de um projeto
router.get('/:_id', async (req, res) => {
    const { _id } = req.params;

    const project = await Projects.findById(_id).populate('scenarios');
    if (!project) {
        return res.status(404).send({ message: 'Project not found' });
    }

    res.send(project.scenarios);
});

// Rota para retornar os scenarios de um documento (SEM USO ATUAL)
router.get('/document/:_id', async (req, res) => {
    const { _id } = req.params;

    const document = await DocumentSchema.findById(_id);
    if (!document) {
        return res.status(404).send({ message: 'Document not found' });
    }

    const project = await Projects.findOne({ 'roadmap.document': document });

    if (!project) {
        return res.status(404).send({ message: 'Project not found' });
    }

    res.send(filtrarPorId(project.roadmap, document._id.toString()));
});

function filtrarPorId(array, id) {
    return array.filter(item => item.document == id);
}

module.exports = router