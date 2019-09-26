const express = require('express');
const router = express.Router();
const controller = require('../controllers/article');
const passport = require('passport');

/**
 * @swagger
 * /api/article:
 *   get:
 *     description: Get all articles
 *     tags: [Article]
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: get all
 *         schema:
 *           type: object
 *           $ref: '#/definitions/Article'
 */

router.get('/', passport.authenticate('jwt', {session: false}), controller.get);

module.exports = router;