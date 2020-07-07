import express from 'express'
import * as controller from '../controllers/article'
import passport from 'passport'

const router = express.Router();

router.get('/',
    passport.authenticate('bearer', {session: false}),
    controller.get
);

router.get('/:id',
    passport.authenticate('bearer', {session: false}),
    controller.get
);

export default router;
