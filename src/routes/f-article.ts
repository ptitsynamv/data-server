import express from 'express'
import * as controller from '../controllers/f-article'
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
router.put('/:id',
    passport.authenticate('bearer', {session: false}),
    controller.replaceArticle
);
router.delete('/:id',
    passport.authenticate('bearer', {session: false}),
    controller.deleteArticle
);
router.post('/',
    passport.authenticate('bearer', {session: false}),
    controller.create
);
export default router;
