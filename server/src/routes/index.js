import express from 'express';
import passport from 'passport';
import userRouter from './user';
import issueRouter from './issue';
import labelRouter from './label';
import milestoneRouter from './milestone';
import OAuthApi from './oauth';
import fileRouter from './file';

const router = express.Router();

router.use('/oauth', OAuthApi);
router.use(passport.authenticate('jwt', { session: false }));
router.use('/users', userRouter);
router.use('/issues', issueRouter);
router.use('/labels', labelRouter);
router.use('/milestones', milestoneRouter);
router.use('/files', fileRouter);

export default router;
