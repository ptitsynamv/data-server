const express = require('express');
const router = express.Router();
const controller = require('../controllers/article');
const passport = require('passport');

/**
 * @swagger
 * /api/article:
 *   get:
 *     description: Get all articles list
 *     tags: [Article]
 *     produces:
 *       - application/json
 *     parameters:
 *       - $ref: '#/parameters/limit'
 *       - $ref: '#/parameters/offset'
 *     security:
 *     - Bearer: []
 *     responses:
 *       200:
 *         description: get all
 *         schema:
 *           type: object
 *           $ref: '#/definitions/ArticleList'
 */

/**
 * @swagger
 * /api/article/{id}:
 *   get:
 *     description: Get article by id
 *     tags: [Article]
 *     produces:
 *       - application/json
 *     parameters:
 *       - $ref: '#/parameters/id'
 *     security:
 *     - Bearer: []
 *     responses:
 *       200:
 *         description: article by id
 *         schema:
 *           type: object
 *           $ref: '#/definitions/Article'
 */

router.get('/', passport.authenticate('jwt', {session: false}), controller.get);
router.get('/:id', passport.authenticate('jwt', {session: false}), controller.get);

module.exports = router;