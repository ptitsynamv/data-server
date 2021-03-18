import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const publicServiceWaterSchema = new Schema({
    date: {
        type: String,
        required: true,
    },
    data: {
        hot1: String,
        hot1CounterName: String,
        hot2:String,
        hot2CounterName: String,
        cold1: String,
        cold1CounterName: String,
        cold2: String,
        cold2CounterName: String,
    },
});

module.exports = mongoose.model('public-service-water', publicServiceWaterSchema);

