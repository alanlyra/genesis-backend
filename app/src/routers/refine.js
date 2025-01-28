const express = require('express');
const router = new express.Router();
const Projects = require('../models/Projects');
const axios = require('axios');

// Rota para retornar o roadmap de um projeto
router.put('/:_id', async (req, res) => {
    const { _id } = req.params;
    const updatedProject = req.body;

    console.log("Initializing Refinement...");

    const project = await Projects.findById(_id).populate('roadmap');
    if (!project) {
        return res.status(404).send({ message: 'Project not found' });
    }

    console.log("Initializing Refinement for Project ID: " + _id);

    try {
        console.log("Roadmapping document: " + project._id);
        const response = await axios.get('http://roadmap-service:4102/roadmap/refinement/project/' + project._id);
        console.log("Finished roadmapping document: " + project._id);

        // Atualize o projeto com os dados retornados pela API de refinamento
        Object.assign(project, response.data);

        // Salve o projeto atualizado no banco de dados
        await project.save();

        res.send(project);
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: 'Error during refinement' });
    }
});

module.exports = router;