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
},{
    toJSON:{virtuals: true},
    toObject:{virtuals: true}
});

// Relação entre Projects e Document pelo mongoose
DocumentSchema.virtual('projects', {
    ref: 'Document',
    localField: '_id',
    foreignField: 'bibliometrics.documents'
})

DocumentSchema.pre('save', async function (next) {
    const document = this
    next()
})

const Document = mongoose.model('Document', DocumentSchema, 'Documents')

module.exports = Document