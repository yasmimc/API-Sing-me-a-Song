import { Router } from 'express';
import * as recommendationController from '../controllers/recommendationController.js';

const router = new Router();

router.post('/recommendations', recommendationController.addRecommendation);
router.post(
    '/recommendations/:id/upvote',
    recommendationController.upvoteRecommendation
);

export default router;
