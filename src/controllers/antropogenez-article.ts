import {antropogenezArticle} from '../models';
import {AntropogenezArticle, NewAntropogenezArticle} from './interfaces';
import {ErrorResponse} from '../interfaces/interfaces';

export const get = async (req, res) => {
    const id: string = req.params.id;
    if (id) {
        const article = antropogenezArticle.findById(id);
        article.exec((err, article) => {
            if (article) {
                return res.status(200).json({
                    id: article._id,
                    date: article.date,
                    subject: article.subject,
                    text: article.text,
                });
            } else {
                return res.status(404).json({
                    status: 404,
                    message: 'Antropogenez Article not found',
                });
            }
        });
    } else {
        const limit = req.query.limit ? parseInt(req.query.limit) : 5;
        const offset = req.query.offset ? parseInt(req.query.offset) : 0;
        const articles = antropogenezArticle
            .find({})
            .skip(limit * offset)
            .limit(limit);

        const totalSize = await antropogenezArticle.estimatedDocumentCount().exec();
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
    const newArticle: NewAntropogenezArticle = req.body;
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();

    const article = new antropogenezArticle({...newArticle, date: mm + '/' + dd + '/' + yyyy});
    article.save(function (err, articleCreated) {
        if (err) {
            const e: ErrorResponse = {
                success: false,
                message: err.message,
            };
            return res.status(500).json(e);
        }
        const a: AntropogenezArticle = {
            id: articleCreated._id,
            subject: articleCreated.subject,
            date: articleCreated.date,
            text: articleCreated.text,
        };
        return res.status(200).json(a);
    });
};

export const replaceArticle = async (req, res) => {
    const updateArticle: NewAntropogenezArticle = req.body;
    const id: string = req.params.id;

    await antropogenezArticle.updateOne(
        {_id: id},
        updateArticle,
        {
            omitUndefined: true,
        },
        function (err, article) {
            if (err) {
                const e: ErrorResponse = {
                    success: false,
                    message: err.message,
                };
                return res.status(500).json(e);
            }
        });

    antropogenezArticle.findById(id, function (err, article) {
        if (err) {
            const e: ErrorResponse = {
                success: false,
                message: err.message,
            };
            return res.status(500).json(e);
        }
        return res.status(200).json({
            id: article._id,
            date: article.date,
            subject: article.subject,
            text: article.text,
        });
    });
};

export const update = async (req, res) => {
    const updateArticle: NewAntropogenezArticle = req.body;
    const id: string = req.params.id;

    antropogenezArticle.updateOne({_id: id}, updateArticle, function (err, updateResult) {
        if (err) {
            const e: ErrorResponse = {
                success: false,
                message: err.message,
            };
            return res.status(500).json(e);
        }
    });

    antropogenezArticle.findById(id, function (err, article) {
        if (err) {
            const e: ErrorResponse = {
                success: false,
                message: err.message,
            };
            return res.status(500).json(e);
        }
        return res.status(200).json({
            id: article._id,
            date: article.date,
            subject: article.subject,
            text: article.text,
        });
    });
};

export const deleteArticle = async (req, res) => {
    const id: string = req.params.id;

    antropogenezArticle.deleteOne({_id: id}, function (err, article) {
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
