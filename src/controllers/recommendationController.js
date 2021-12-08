import * as schemas from '../validations/schemas.js';
import * as recommendationService from '../services/recommendationService.js';
import UrlError from '../errors/UrlError.js';
import RecommendationIdError from '../errors/RecommendationIdError.js';
import NoRecommendationError from '../errors/NoRecommendationError.js';
import ExistentRecommendationError from '../errors/ExistentRecommendationError.js';

async function addRecommendation(req, res) {
    try {
        const validation = schemas.recommendations.validate(req.body);
        if (validation.error) {
            return res.status(400).send(validation.error.message);
        }

        const { name, youtubeLink } = req.body;

        await recommendationService.saveRecommendation({ name, youtubeLink });

        res.sendStatus(200);
    } catch (error) {
        if (error instanceof UrlError) {
            return res.status(404).send(error.message);
        }
        if (error instanceof ExistentRecommendationError) {
            return res.status(409).send(error.message);
        }
        res.sendStatus(500);
    }
}

async function upvoteRecommendation(req, res) {
    try {
        const { id } = req.params;
        await recommendationService.upvoteRecommendation({ id });
        res.sendStatus(200);
    } catch (error) {
        if (error instanceof RecommendationIdError) {
            return res.status(404).send(error.message);
        }
        res.sendStatus(500);
    }
}

async function downvoteRecommendation(req, res) {
    try {
        const { id } = req.params;
        await recommendationService.downvoteRecommendation({ id });
        res.sendStatus(200);
    } catch (error) {
        if (error instanceof RecommendationIdError) {
            return res.status(404).send(error.message);
        }
        res.sendStatus(500);
    }
}

async function getRandomRecommendation(req, res) {
    try {
        const recommendation =
            await recommendationService.getRandomRecommendation();
        res.status(200).send(recommendation);
    } catch (error) {
        if (error instanceof NoRecommendationError) {
            return res.status(404).send(error.message);
        }
        res.sendStatus(500);
    }
}

async function getTopRecommendations(req, res) {
    try {
        const { amount } = req.params;
        const recommendations =
            await recommendationService.getTopRecommendations(amount);
        res.send(recommendations);
    } catch (error) {
        if (error instanceof NoRecommendationError) {
            return res.status(404).send(error.message);
        }
        res.sendStatus(500);
    }
}

export {
    addRecommendation,
    upvoteRecommendation,
    downvoteRecommendation,
    getRandomRecommendation,
    getTopRecommendations,
};
