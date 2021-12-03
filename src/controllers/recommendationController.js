import * as schemas from '../validations/schemas.js';
import * as recommendationService from '../services/recommendationService.js';
import UrlError from '../errors/UrlError.js';

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
        res.sendStatus(500);
    }
}

async function upvoteRecommendation(req, res) {
    try {
        const { id } = req.params;
        await recommendationService.upvoteRecommendation({ id });
        res.sendStatus(200);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

export { addRecommendation, upvoteRecommendation };
