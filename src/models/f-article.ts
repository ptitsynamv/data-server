import mongoose from 'mongoose'
const Schema = mongoose.Schema;

const fArticleSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    url: {
        type: String,
        required: true
    },
});

module.exports = mongoose.model('f-articles', fArticleSchema);

