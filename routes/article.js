const express = require('express');
const router = express.Router();
const controller = require('../controllers/article');
const passport = require('passport');

router.get('/',
    passport.authenticate('bearer', {session: false}),
    controller.get
);

router.get('/:id',
    passport.authenticate('bearer', {session: false}),
    controller.get
);

module.exports = router;