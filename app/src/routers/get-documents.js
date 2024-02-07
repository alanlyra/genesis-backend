const express = require('express')
const router = new express.Router()
const Projects = require('../models/Projects')

router.get('/:_id', async (req, res) => {
    const { _id } = req.params;

    const project = await Projects.findById(_id).populate('bibliometrics.documents');
    if (!project) {
        return res.status(404).send({ message: 'Project not found' });
    }

    res.send(project.bibliometrics.documents);
});

module.exports = router