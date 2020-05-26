import connection from '../index';

// import keys from "../../config";
// import mongoose from 'mongoose';
// mongoose.connect(keys.mongoUrl, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})
//     .then(() => console.log('mongo db connected'))
//     .catch((error) => console.log('mongo error', error));

const articleTable = `CREATE TABLE IF NOT EXISTS article (
    id INT AUTO_INCREMENT PRIMARY KEY,
    subject VARCHAR(200) NOT NULL,
    date DATE NOT NULL,
    text text NOT NULL
);`;

connection.query(articleTable, function (error, results, fields) {
    if (error) throw error;
});

