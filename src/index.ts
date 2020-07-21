import mongoose from 'mongoose';
import keys from './config';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';
import passport from 'passport';
import * as routes from './routes';
import swaggerUi from 'swagger-ui-express';
import path from 'path';
import * as swaggerDocument from './swagger.json';

const port = process.env.PORT || 3000;
const app = express();

mongoose.connect(keys.mongoUrl, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})
    .then(() => console.log('mongo db connected'))
    .catch((error) => console.log('mongo error', error));

app.use(passport.initialize());
require('./middleware/passport');

app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use('/api/article', routes.article);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.get('/oauth2-redirect.html', function (req, res) {
    const file = path.resolve(__dirname + "/../node_modules/swagger-ui/dist/oauth2-redirect.html");
    res.sendFile(file);
});


app.listen(port, () => console.log(`documentation: http://localhost:${port}/api-docs/`));
