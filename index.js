const mongoose = require('mongoose');
const keys = require('./config/keys');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
// const passport = require('passport');
const routes = require('./routes');
const path = require('path');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const app = express();
mongoose.connect(keys.mongoUrl, {useNewUrlParser: true})
    .then(() => console.log('mongo db connected'))
    .catch(error => console.log(error));

// app.use(passport.initialize());
// require('./middleware/passport')(passport);
app.use(morgan('dev'));
app.use(cors());
app.use('/uploads', express.static('uploads'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// app.use('/api/auth', authRoutes);
app.use('/api/article', routes.article);

const options = {
    swaggerDefinition: {
        info: {
            title: 'API Antropogenez Server',
            version: '1.0.0',
        },
    },
    apis: [
        './routes/*',
        './models/*',
    ],
    basePath: '/',
};

const specs = swaggerJsdoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/dist/client'));
    app.get('*', (req, res) => {
        res.sendFile(
            path.resolve(
                __dirname, 'client', 'dist', 'client', 'index.html'
            )
        )
    });
}

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`server start on ${port}`));