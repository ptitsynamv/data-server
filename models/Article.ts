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

const ArticleModel = mongoose.model('articles', articleSchema);

export {ArticleModel};
