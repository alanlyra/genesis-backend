const mongoose = require('mongoose');
const { Schema } = mongoose;

const DocumentSchema = new Schema({
    name: String,
    description: String,
    uploadDate: Date,
    URL: String,
    preprocessing: {
        text: String,
        sentences: [Schema.Types.Mixed]
    }
});

module.exports = DocumentSchema;