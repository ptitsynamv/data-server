const express = require('express');
const router = express.Router();
const controller = require('../controllers/article');
const passport = require('passport');

router.get('/', passport.authenticate('jwt', {session: false}), controller.get);

module.exports = router;