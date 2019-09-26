const express = require('express');
const router = express.Router();
const controller = require('../controllers/auth');

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     description: Login to the application
 *     tags: [Auth]
 *     produces:
 *       - application/json
 *     parameters:
 *       - $ref: '#/parameters/email'
 *       - $ref: '#/parameters/password'
 *     responses:
 *       200:
 *         description: login
 *         schema:
 *           type: object
 *           $ref: '#/definitions/AuthResponse'
 */

router.post('/login', controller.login);


/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     description: Register to the application
 *     tags: [Auth]
 *     produces:
 *       - application/json
 *     parameters:
 *       - $ref: '#/parameters/email'
 *       - $ref: '#/parameters/password'
 *     responses:
 *       200:
 *         description: register
 *         schema:
 *           type: object
 *           $ref: '#/definitions/AuthResponse'
 */
router.post('/register', controller.register);

module.exports = router;