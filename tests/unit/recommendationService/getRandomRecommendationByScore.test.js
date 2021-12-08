import * as recommendationService from '../../../src/services/recommendationService.js';
import * as recommendationRepository from '../../../src/repositories/recommendationRepository.js';

const sut = recommendationService;
jest.mock('../../../src/repositories/recommendationRepository.js');

describe('test getRandomRecommendationByScore service', () => {
    it('filteredRecommendations.length === 0', async () => {
        const minScore = -5;
        const maxScore = 10;

        jest.spyOn(
            recommendationRepository,
            'getRecommendationsByScore'
        ).mockImplementationOnce(() => {
            return [];
        });

        const result = await sut.getRandomRecommendationByScore({
            minScore,
            maxScore,
        });
        expect(result).toEqual(null);
    });

    it('filteredRecommendations.length !== 0', async () => {
        const recommendations = [
            {
                id: 1,
                name: 'Música teste 1',
                youtubeLink: 'http://youtube.com/watch?v=teste',
                score: -4,
            },
            {
                id: 2,
                name: 'Música teste 2',
                youtubeLink: 'http://youtube.com/watch?v=teste',
                score: -5,
            },
            {
                id: 3,
                name: 'Música teste 3',
                youtubeLink: 'http://youtube.com/watch?v=teste',
                score: -6,
            },
            {
                id: 4,
                name: 'Música teste 1',
                youtubeLink: 'http://youtube.com/watch?v=teste',
                score: 9,
            },
            {
                id: 5,
                name: 'Música teste 1',
                youtubeLink: 'http://youtube.com/watch?v=teste',
                score: 10,
            },
            {
                id: 6,
                name: 'Música teste 1',
                youtubeLink: 'http://youtube.com/watch?v=teste',
                score: -11,
            },
        ];
        const minScore = -5;
        const maxScore = 10;

        const filteredRecommendations = recommendations.filter(
            (recommendation) =>
                recommendation.score >= minScore &&
                recommendation.score <= maxScore
        );
        jest.spyOn(
            recommendationRepository,
            'getRecommendationsByScore'
        ).mockImplementationOnce(() => {
            return filteredRecommendations;
        });

        const result = await sut.getRandomRecommendationByScore({
            minScore,
            maxScore,
        });
        expect(result.score).toBeGreaterThanOrEqual(minScore);
        expect(result.score).toBeLessThanOrEqual(maxScore);
    });
});
