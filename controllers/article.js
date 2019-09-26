const Article = require('../models/Article');
// import {from, combineLatest} from 'rxjs';

module.exports.get = (req, res) => {
    const id = req.query.id;
    if (id) {
        const article = Article.findById(id);
        article.exec((err, post) => {
            const {_id, date, subject, text} = post;
            return res.status(200).json({
                data: {id: _id, date, subject, text}
            })
        });
    } else {
        const {limit, offset} = req.query;
        const articles = Article
            .find({})
            .skip(parseInt(limit) * parseInt(offset))
            .limit(parseInt(1));

        const totalSize = Article.find({}).count().exec();

        // combineLatest(
        //     from(articles),
        //     from(totalSize),
        // )
        //     .subscribe((data) => {
        //         console.log('data', data)
        //     })


        articles.exec((err, posts) => {
            const data = posts ? posts.map(({_id, date, subject}) => ({id: _id, date, subject})) : [];
            return res.status(200).json({
                data
            })
        });
    }
};