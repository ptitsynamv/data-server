import {Article} from "./interfaces";
import connection from '../db';

const columns = ['id', 'subject', 'date', 'text'];
const tableName = 'article';

export const getById = async (req, res) => {
    const id = req.params.id;

    if (!id) {
        return res.status(404).json({
            status: 400,
            message: 'Id is undefined',
        })
    }

    connection.query('SELECT ?? FROM ?? WHERE id = ?', [columns, tableName, id], function (error, post: Article, fields) {
        if (error) throw error;

        if (post && post[0]) {
            const {date, subject, text} = post[0];

            return res.status(200).json({_id: post[0].id, date, subject, text})
        }
        return res.status(404).json({
            status: 404,
            message: 'Article not found',
        })
    });
};

export const get = async (req, res) => {
    const limit = req.query.limit ? parseInt(req.query.limit) : 5;
    const offset = req.query.offset ? parseInt(req.query.offset) : 0;

    connection.query('SELECT ?? FROM ?? LIMIT ? OFFSET ?', [columns, tableName, limit, offset], function (error, results: Article[], fields) {
        if (error) throw error;

        return res.status(200).json({
            count: results.length ? results.length : 0,
            list: results.length ? results : [],
        })
    });
};

