import { Router } from 'express';
import * as recommendationController from '../controllers/recommendationController.js';

const router = new Router();

router.post('/recommendations', recommendationController.addRecommendation);
router.post(
    '/recommendations/:id/upvote',
    recommendationController.upvoteRecommendation
);
router.post(
    '/recommendations/:id/downvote',
    recommendationController.downvoteRecommendation
);
router.get(
    '/recommendations/random',
    recommendationController.getRandomRecommendations
);

export default router;
