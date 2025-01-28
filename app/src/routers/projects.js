// Rotas para verificar se a API está funcionando
const express = require('express')
const router = new express.Router()
const Projects = require('../models/Projects')

// Rota para retornar todos os projetos
router.get('/', async (req, res) => {

    const response = await Projects.find({}, 'name description startDate endDate bibliometrics roadmap status owner createdDate createdBy deleted deletedDate deletedBy updated updatedLastDate updatedLastBy').populate('bibliometrics.documents').populate('roadmap.document').populate('scopusResearch')
    console.log(response)

    res.send(response)

})

//Rota para retornar um projeto específico
// Rota para retornar um projeto pelo ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const project = await Projects.findById(id)
            .populate('bibliometrics.documents')
            .populate('roadmap.document')
            .populate('scopusResearch');

        if (!project) {
            return res.status(404).send({ message: 'Project not found' });
        }

        res.send(project);
    } catch (error) {
        res.status(500).send({ message: 'Server error' });
    }
});

//Rota para criar um projeto novo
router.post('/', async (req, res) => {
    const projectData = req.body;
    const project = new Projects(projectData);
    console.log("Criando novo projeto...");
    try {
        const response = await project.save();
        res.send(response)
    } catch (error) {
        res.status(500).send({ message: 'Server error' });
    }
});

//Rota para update de um project
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const updatedProject = req.body;

    try {
        const project = await Projects.findById(id);
        console.log(project);

        if (!project) {
            return res.status(404).send({ message: 'Project not found' });
        }

        Object.assign(project, updatedProject);

        await project.save();

        res.send(project);
    } catch (error) {
        res.status(500).send({ message: 'Server error' });
    }
});

//Rota para deletar um projeto
router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const project = await Projects.findById(id);

        if (!project) {
            return res.status(404).send({ message: 'Project not found' });
        }

        await project.remove();

        res.send({ message: 'Project deleted' });
    } catch (error) {
        res.status(500).send({ message: 'Server error' });
    }
});

module.exports = router