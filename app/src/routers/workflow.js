// Rotas para verificar se a API está funcionando
const express = require('express')
const axios = require('axios')
const router = new express.Router()
const Projects = require('../models/Projects')

//Rota para update de um project
router.post('/project/:id', async (req, res) => {
    const { id } = req.params;
    const updatedProject = req.body;
    console.log("Initializing Worflow for Project ID: " + id)
    try {
        const project = await Projects.findById(id);
        console.log(project);

        if (!project) {
            return res.status(404).send({ message: 'Project not found' });
        }

        try {
            console.log("Initializing Bibliometrics for Project ID: " + project._id)
            response = await axios.get('http://bibliometrics-service:4107/bibliometrics/' + project._id)
            console.log("Finished Bibliometrics for Project ID: " + project._id)
            return response
        } catch (error) {
            console.log(error);
        }

        Object.assign(project, updatedProject);

        await project.save();

        res.send(project);
    } catch (error) {
        res.status(500).send({ message: 'Server error' });
    }
});


module.exports = router