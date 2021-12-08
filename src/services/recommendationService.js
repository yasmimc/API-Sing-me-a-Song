import UrlError from '../errors/UrlError.js';
import * as recommendationRepository from '../repositories/recommendationRepository.js';
import NoRecommendationError from '../errors/NoRecommendationError.js';
import RecommendationIdError from '../errors/RecommendationIdError.js';
import axios from 'axios';
import ExistentRecommendationError from '../errors/ExistentRecommendationError.js';

async function saveRecommendation({ name, youtubeLink }) {
    try {
        await axios.get(youtubeLink);
    } catch (err) {
        throw new UrlError('This video was not found');
    }
    const existentRecommendation =
        await recommendationRepository.findRecommendationByYoutubeLink(
            youtubeLink
        );
    if (existentRecommendation?.score >= -5) {
        throw new ExistentRecommendationError(
            'This recommendation has already been added'
        );
    }
    recommendationRepository.save({ name, youtubeLink });
}

async function upvoteRecommendation({ id }) {
    const result = await recommendationRepository.editScore({
        id,
        scoreUpdate: '+ 1',
    });
    if (result.length === 0) {
        throw new RecommendationIdError('Recommendation not found');
    }
}

async function downvoteRecommendation({ id }) {
    const result = await recommendationRepository.editScore({
        id,
        scoreUpdate: '- 1',
    });
    if (result.length === 0) {
        throw new RecommendationIdError('Recommendation not found');
    }
}

async function getAllRecommendations(amount) {
    const recommendations = await recommendationRepository.getRecommendations(
        amount
    );
    const validRecommendations = getValidRecommendations({ recommendations });
    return validRecommendations;
}

async function getRandomRecommendation() {
    let random = parseInt(Math.random() * 10);
    let randomRecommendationByScore;
    if (random < 7) {
        randomRecommendationByScore = await getRandomRecommendationByScore({
            minScore: 11,
        });
    } else {
        randomRecommendationByScore = await getRandomRecommendationByScore({
            minScore: -5,
            maxScore: 10,
        });
    }

    let recommendations;
    if (randomRecommendationByScore === null) {
        recommendations = await getAllRecommendations();
    } else {
        return randomRecommendationByScore;
    }

    if (recommendations.length === 0) {
        throw new NoRecommendationError('Sorry, any recommendation today :(');
    }

    if (recommendations.length === 1) {
        return recommendations[0];
    }

    const maxRandom = recommendations.length;
    random = parseInt(Math.random() * maxRandom);
    return recommendations[random];
}

function getValidRecommendations({ recommendations }) {
    return recommendations.filter(
        (recommendation) => recommendation.score >= -5
    );
}

async function getRandomRecommendationByScore({ minScore, maxScore }) {
    const filteredRecommendations =
        await recommendationRepository.getRecommendationsByScore({
            minScore: minScore ? minScore : null,
            maxScore: maxScore ? maxScore : null,
        });

    if (filteredRecommendations.length === 0) {
        return null;
    }

    const maxRandom = filteredRecommendations?.length;
    const random = parseInt(Math.random() * maxRandom);
    return filteredRecommendations[random];
}

async function getTopRecommendations(amount) {
    const allRecommendations = await getAllRecommendations(amount);
    if (allRecommendations.length === 0) {
        throw new NoRecommendationError('Sorry, any recommendation today :(');
    }

    return allRecommendations;
}

export {
    saveRecommendation,
    upvoteRecommendation,
    downvoteRecommendation,
    getRandomRecommendation,
    getTopRecommendations,
    getRandomRecommendationByScore,
    getValidRecommendations,
    getAllRecommendations,
};
