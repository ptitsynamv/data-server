import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';
import passport from 'passport';
import * as routes from './routes';
import swaggerUi from 'swagger-ui-express';
import path from 'path';
import config from './swagger.config';

const port = process.env.PORT;
const app = express();

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
})
    .then(() => console.log('mongo db connected'))
    .catch((error) => console.log('mongo error', error));

app.use(passport.initialize());
require('./middleware/passport');

app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html', (err) => {
        res.end();
        if (err) throw(err);
    });
});

app.use('/api/article', routes.antropogenezArticle);
app.use('/api/f-article', routes.fArticle);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(JSON.parse(JSON.stringify(config))));
app.get('/oauth2-redirect.html', function (req, res) {
    const file = path.resolve(__dirname + "/../node_modules/swagger-ui/dist/oauth2-redirect.html");
    res.sendFile(file);
});

app.listen(port, () => console.log(`
server start: http://localhost:${port}
documentation: http://localhost:${port}/api-docs/ 
`));
