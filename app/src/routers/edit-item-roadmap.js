const express = require('express')
const router = new express.Router()
const Projects = require('../models/Projects');
const RoadmapSchema = require('../models/subSchemas/RoadmapSchema');

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