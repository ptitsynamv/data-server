import express from 'express'
import * as controller from '../controllers/public-service-water'
import passport from 'passport'

const router = express.Router();

router.get('/last',
    passport.authenticate('bearer', {session: false}),
    controller.getLast
);
router.get('/',
    passport.authenticate('bearer', {session: false}),
    controller.get
);
router.get('/:id',
    passport.authenticate('bearer', {session: false}),
    controller.get
);
router.post('/',
    passport.authenticate('bearer', {session: false}),
    controller.create
);
router.delete('/:id',
    passport.authenticate('bearer', {session: false}),
    controller.deleteWater
);
export default router;
