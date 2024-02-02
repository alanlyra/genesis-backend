const mongoose = require('mongoose');
const { Schema } = mongoose;

const collectionMapping = require('../collection_mapping/Projects')

const DocumentSchema = require('./subSchemas/DocumentSchema');
const RoadmapSchema = require('./subSchemas/RoadmapSchema.js');
const ScenariosSchema = require('./subSchemas/ScenariosSchema.js');
const ReportSchema = require('./subSchemas/ReportSchema');
const { collection } = require('./Empresas');

const ProjectsSchema = new Schema({
    name: String,
    description: String,
    startDate: Date,
    endDate: Date,
    status: String,
    owner: String,
    bibliometrics: {
        method: String,
        keywords: [String],
        documents: [DocumentSchema]
    },
    roadmap: [RoadmapSchema],
    scenarios: [ScenariosSchema],
    report: [ReportSchema]
});

module.exports = mongoose.model('Projects', ProjectsSchema, collectionMapping);