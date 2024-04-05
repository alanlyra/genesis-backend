const express = require('express')
const router = new express.Router()
const Projects = require('../models/Projects')
const DocumentSchema = require('../models/subSchemas/DocumentSchema')

// Rota para retornar todos os documentos de um projeto
router.get('/:_id', async (req, res) => {
    const { _id } = req.params;

    const project = await Projects.findById(_id).populate('bibliometrics.documents');
    if (!project) {
        return res.status(404).send({ message: 'Project not found' });
    }

    res.send(project);
});

// Rota para editar um documento
router.put('/:documentId', async (req, res) => {
    const { documentId } = req.params;
    const updatedDocument = req.body;
  
    try {
        const document = await DocumentSchema.findById(documentId);
        if (!document) {
            return res.status(404).send({ message: 'Document not found' });
        }
  
      document.set(updatedDocument);
  
      await document.save();
  
      res.send(document);
    } catch (error) {
      res.status(500).send({ message: 'Server error' });
    }
  });
  
  // Rota para deletar um documento
  router.delete('/:documentId', async (req, res) => {
    const { documentId } = req.params;
  
    try {
        const document = await DocumentSchema.findById(documentId);
        if (!document) {
            return res.status(404).send({ message: 'Document not found' });
        }

      document.remove();
  
      res.send({ message: 'Document deleted' });
    } catch (error) {
      res.status(500).send({ message: 'Server error' });
    }
  });

module.exports = router