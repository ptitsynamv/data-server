import {fArticle} from '../models';
import {FArticle, NewFArticle} from './interfaces';
import {ErrorResponse} from '../interfaces/interfaces';

export const get = async (req, res) => {
    const id: string = req.params.id;
    if (id) {
        const article = fArticle.findById(id);
        article.exec((err, article) => {
            if (article) {
                const a: FArticle = {
                    id: article._id,
                    title: article.title,
                    url: article.url,
                };
                return res.status(200).json(a);
            } else {
                return res.status(404).json({
                    status: 404,
                    message: 'F Article not found',
                });
            }
        });
    } else {
        const limit = req.query.limit ? parseInt(req.query.limit) : 5;
        const offset = req.query.offset ? parseInt(req.query.offset) : 0;
        const articles = fArticle
            .find({})
            .skip(limit * offset)
            .limit(limit);

        const totalSize = await fArticle.estimatedDocumentCount().exec();
        articles.exec((err, posts) => {
            const data = posts ? posts.map(({_id, date, subject}) => ({id: _id, date, subject})) : [];
            return res.status(200).json({
                count: totalSize,
                list: data,
            });
        });
    }
};

export const create = async (req, res) => {
    const newArticle: NewFArticle = req.body;

    const article = new fArticle({...newArticle});
    article.save(function (err, articleCreated) {
        if (err) {
            const e: ErrorResponse = {
                success: false,
                message: err.message,
            };
            return res.status(500).json(e);
        }
        const a: FArticle = {
            id: articleCreated._id,
            title: articleCreated.title,
            url: articleCreated.url,
        };
        return res.status(200).json(a);
    });
};

export const replaceArticle = async (req, res) => {
    const updateArticle: NewFArticle = req.body;
    const id: string = req.params.id;

    await fArticle.updateOne(
        {_id: id},
        updateArticle,
        {
            omitUndefined: true,
        },
        function (err, updateResult) {
            if (err) {
                const e: ErrorResponse = {
                    success: false,
                    message: err.message,
                };
                return res.status(500).json(e);
            }
        });

    fArticle.findById(id, function (err, article) {
        if (err) {
            const e: ErrorResponse = {
                success: false,
                message: err.message,
            };
            return res.status(500).json(e);
        }
        const a: FArticle = {
            id: article._id,
            title: article.title,
            url: article.url,
        };
        return res.status(200).json(a);
    });
};

export const deleteArticle = async (req, res) => {
    const id: string = req.params.id;

    fArticle.deleteOne({_id: id}, function (err, article) {
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
