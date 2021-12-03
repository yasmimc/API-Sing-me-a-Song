import urlExist from 'url-exist';
import UrlError from '../errors/UrlError.js';
import * as recommendationRepository from '../repositories/recommendationRepository.js';

async function saveRecommendation({ name, youtubeLink }) {
    const exists = await urlExist(youtubeLink);
    if (!exists) {
        throw new UrlError('This video was not found');
    }
    await recommendationRepository.save({ name, youtubeLink });
}

export { saveRecommendation };
