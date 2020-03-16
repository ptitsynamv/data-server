import connection from '../index';
import mongoose from 'mongoose';
import keys from "../../config";
import {ArticleModel} from "../../models/Article";
import {Article} from "../../controllers/interfaces";

mongoose.connect(keys.mongoUrl, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})
    .then(() => console.log('mongo db connected'))
    .catch((error) => console.log('mongo error', error));

const articleTable = `CREATE TABLE IF NOT EXISTS article (
    id INT AUTO_INCREMENT PRIMARY KEY,
    subject VARCHAR(200) NOT NULL,
    date DATE NOT NULL,
    text text NOT NULL
);`;

connection.query(articleTable, function (error, results, fields) {
    if (error) throw error;

    const articles = ArticleModel
        .find({})
    articles.exec((err, posts: Article[]) => {
        posts.forEach((post) => {

            const {subject, date, text} = post;

            connection.query('INSERT INTO article SET ?', {subject, date, text}, function (error2, results, fields) {
                if (error) throw error;
            });
        })
    });
});

