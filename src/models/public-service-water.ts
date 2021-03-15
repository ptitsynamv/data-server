import mongoose from 'mongoose'
const Schema = mongoose.Schema;

const publicServiceWaterSchema = new Schema({
    date: {
        type: String,
        required: true
    },
    data: {
        type: String,
        required: true
    },
});

module.exports = mongoose.model('public-service-water', publicServiceWaterSchema);

