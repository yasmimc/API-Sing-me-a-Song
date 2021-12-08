import * as recommendationService from '../../../src/services/recommendationService.js';

const sut = recommendationService;
jest.mock('../../../src/repositories/recommendationRepository.js');

describe('test getRandomRecommendationByScore service', () => {
    it('filteredRecommendations.length > 0', async () => {
        const recommendations = [
            {
                id: 1,
                name: 'Música teste 1',
                youtubeLink: 'http://youtube.com/watch?v=teste',
                score: 10,
            },
            {
                id: 2,
                name: 'Música teste 2',
                youtubeLink: 'http://youtube.com/watch?v=teste',
                score: 11,
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
                score: 9,
            },
        ];
        const minScore = -5;
        const maxScore = 10;
        const result = sut.getRandomRecommendationByScore({
            recommendations,
            minScore,
            maxScore,
        });
        expect(result.score).toBeGreaterThanOrEqual(minScore);
        expect(result.score).toBeLessThanOrEqual(maxScore);
    });

    it('filteredRecommendations.length > 0', async () => {
        const recommendations = [
            {
                id: 1,
                name: 'Música teste 1',
                youtubeLink: 'http://youtube.com/watch?v=teste',
                score: -6,
            },
            {
                id: 2,
                name: 'Música teste 2',
                youtubeLink: 'http://youtube.com/watch?v=teste',
                score: 11,
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
                score: 15,
            },
            {
                id: 5,
                name: 'Música teste 1',
                youtubeLink: 'http://youtube.com/watch?v=teste',
                score: 16,
            },
        ];
        const minScore = -5;
        const maxScore = 10;
        const result = sut.getRandomRecommendationByScore({
            recommendations,
            minScore,
            maxScore,
        });
        expect(result).toEqual(null);
    });
});
