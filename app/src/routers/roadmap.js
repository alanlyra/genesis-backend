const express = require('express')
const router = new express.Router()
const Projects = require('../models/Projects')
const DocumentSchema = require('../models/subSchemas/DocumentSchema')

// Rota para retornar o roadmap de um projeto
router.get('/:_id', async (req, res) => {
    const { _id } = req.params;

    const project = await Projects.findById(_id).populate('roadmap');
    if (!project) {
        return res.status(404).send({ message: 'Project not found' });
    }

    res.send(project.roadmap);
});

// Rota para retornar o roadmap de um documento
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