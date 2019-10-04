const mongoose = require('mongoose');
const keys = require('./config/index');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const passport = require('passport');
const routes = require('./routes');
const swaggerUi = require('swagger-ui-express');
const port = process.env.PORT || 3000;
const swaggerDocument = require('./swagger.json');

const app = express();
mongoose.connect(keys.mongoUrl, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})
    .then(() => console.log('mongo db connected'))
    .catch(error => console.log('mongo error', error));

app.use(passport.initialize());
require('./middleware/passport');

app.use(morgan('dev'));
app.use(cors());
app.use('/uploads', express.static('uploads'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use('/api/article', routes.article);


app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.get('/oauth2-redirect.html', function(req, res) {
    res.sendFile(__dirname + "/node_modules/swagger-ui/dist/oauth2-redirect.html");
});

app.listen(port, () => console.log(`server start on ${port}`));