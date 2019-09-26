const mongoose = require('mongoose');
const Schema = mongoose.Schema;


/**
 * @swagger
 * definitions:
 *   Article:
 *     required:
 *       - _id
 *       - subject
 *     properties:
 *       _id:
*         type: string
 *       subject:
 *         type: string
 *       date:
 *         type: string
 *       text:
 *         type: string
 */

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

module.exports = mongoose.model('articles', articleSchema);
