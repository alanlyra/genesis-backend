const express = require('express')
const router = new express.Router()
const Projects = require('../models/Projects');

//Rota para update de um evento do roadmap
router.put('/:_id', async (req, res) => {
    const { _id } = req.params;
    const updates = req.body;

    try {
        const project = await Projects.findOne({ 'roadmap': { $elemMatch: { _id } } });

        if (!project) {
            return res.status(404).send({ message: 'Project not found' });
        }

        const roadmapItemIndex = project.roadmap.findIndex(item => item._id.toString() === _id);

        if (roadmapItemIndex === -1) {
            return res.status(404).send({ message: 'Roadmap item not found' });
        }

        project.roadmap[roadmapItemIndex] = updates;

        await project.save();

        res.send(project.roadmap[roadmapItemIndex]);
    } catch (error) {
        res.status(500).send({ message: 'Server error' });
    }
});

//Rota para deletar um evento do roadmap
router.delete('/:_id', async (req, res) => {
    const { _id } = req.params;

    try {
        const project = await Projects.findOneAndUpdate(
            { 'roadmap._id': _id },
            { $pull: { roadmap: { _id: _id } } },
            { new: true }
        );

        if (!project) {
            return res.status(404).send({ message: 'Project not found' });
        }

        res.send(project);
    } catch (error) {
        res.status(500).send({ message: 'Server error' });
    }
});

//Rotas para retornar um evento do roadmap
router.get('/:_id', async (req, res) => {
    const { _id } = req.params;

    try {
        const project = await Projects.findOne({ 'roadmap': { $elemMatch: { _id } } });

        if (!project) {
            return res.status(404).send({ message: 'Project not found' });
        }

        const roadmapItem = project.roadmap.find(item => item._id.toString() === _id);

        if (!roadmapItem) {
            return res.status(404).send({ message: 'Roadmap item not found' });
        }

        res.send(roadmapItem);
    } catch (error) {
        res.status(500).send({ message: 'Server error' });
    }
   
});

module.exports = router