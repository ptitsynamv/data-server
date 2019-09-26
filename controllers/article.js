const Article = require('../models/Article');

module.exports.get = async (req, res) => {
    const id = req.params.id;
    if (id) {
        const article = Article.findById(id);
        article.exec((err, post) => {
            if (post) {
                const {_id, date, subject, text} = post;
                return res.status(200).json({
                    _id, date, subject, text
                })
            } else {
                return res.status(404).json({
                    status: 404,
                    message: 'Article not found',
                })
            }


        });
    } else {
        const limit = req.query.limit ? parseInt(req.query.limit) : 5;
        const offset = req.query.offset ? parseInt(req.query.offset) : 0;
        const articles = Article
            .find({})
            .skip(limit * offset)
            .limit(limit);

        const totalSize = await Article.find({}).count().exec();
        articles.exec((err, posts) => {
            const data = posts ? posts.map(({_id, date, subject}) => ({id: _id, date, subject})) : [];
            return res.status(200).json({
                count: totalSize,
                list: data,
            })
        });
    }
};