import mongoose from 'mongoose'
const Schema = mongoose.Schema;

const articleSchema = new Schema({
    subject: {
        type: String,
        required: true,
        unique: true,
    },
    date: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
});

module.exports = mongoose.model('antropogenez-articles', articleSchema);

