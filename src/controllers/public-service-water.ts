import {publicServiceWater} from '../models';
import {NewPublicServiceWaterI, PublicServiceWaterI} from './interfaces';
import {ErrorResponse} from '../interfaces/interfaces';

export const get = async (req, res) => {
    const id: string = req.params.id;
    if (id) {
        const water = publicServiceWater.findById(id);
        water.exec((err, waterData) => {
            if (waterData) {
                const p: PublicServiceWaterI = {
                    id: waterData._id,
                    date: waterData.date,
                    data: waterData.data,
                };
                return res.status(200).json(p);
            } else {
                return res.status(404).json({
                    status: 404,
                    message: 'Public Service Water not found',
                });
            }
        });
    } else {
        const limit = req.query.limit ? parseInt(req.query.limit) : 5;
        const offset = req.query.offset ? parseInt(req.query.offset) : 0;
        const waterArray = publicServiceWater
            .find({})
            .skip(limit * offset)
            .limit(limit);

        waterArray.exec((err, water) => {
            const data = water ? water.map(({_id, date, data}) => ({id: _id, date, data})) : [];
            return res.status(200).json(data);
        });
    }
};

export const getLast = async (req, res) => {
    const waterLast = publicServiceWater
        .find({})
        .sort({_id: -1})
        .limit(1);

    waterLast.exec((err, water) => {
        if (water && water.length) {
            const waterData: PublicServiceWaterI = {
                id: water[0]._id,
                date: water[0].date,
                data: water[0].data,
            };
            return res.status(200).json(waterData);
        }
        return res.status(200).json({});
    });
};

export const create = async (req, res) => {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();

    const w: NewPublicServiceWaterI = {
        date: mm + '/' + dd + '/' + yyyy,
        data: req.body.data
    }
    const water = new publicServiceWater(w);
    water.save(function (err, waterCreated) {
        if (err) {
            const e: ErrorResponse = {
                success: false,
                message: err.message,
            };
            return res.status(500).json(e);
        }
        const a: PublicServiceWaterI = {
            id: waterCreated._id,
            date: waterCreated.date,
            data: waterCreated.data,
        };
        return res.status(200).json(a);
    });
};

export const deleteWater = async (req, res) => {
    const id: string = req.params.id;

    publicServiceWater.deleteOne({_id: id}, function (err, water) {
        if (err) {
            const e: ErrorResponse = {
                success: false,
                message: err.message,
            };
            return res.status(500).json(e);
        }
        return res.status(200).json();
    });
};
