import * as recommendationService from '../../../src/services/recommendationService.js';
import * as recommendationRepository from '../../../src/repositories/recommendationRepository.js';
import NoRecommendationError from '../../../src/errors/NoRecommendationError.js';

const sut = recommendationService;
jest.mock('../../../src/repositories/recommendationRepository.js');

describe('test getTopRecommendations service', () => {
    it('allRecommendations.length === 0', async () => {
        jest.spyOn(
            recommendationRepository,
            'getRecommendations'
        ).mockImplementationOnce(() => {
            return [];
        });
        const promise = sut.getTopRecommendations();
        await expect(promise).rejects.toThrowError(NoRecommendationError);
    });

    it('allRecommendations.length !== 0', async () => {
        const recommendations = [
            {
                id: 1,
                name: 'Música teste 1',
                youtubeLink: 'http://youtube.com/watch?v=teste',
                score: -5,
            },
            {
                id: 2,
                name: 'Música teste 2',
                youtubeLink: 'http://youtube.com/watch?v=teste',
                score: 10,
            },
            {
                id: 3,
                name: 'Música teste 3',
                youtubeLink: 'http://youtube.com/watch?v=teste',
                score: -5,
            },
            {
                id: 4,
                name: 'Música teste 1',
                youtubeLink: 'http://youtube.com/watch?v=teste',
                score: 10,
            },
            {
                id: 5,
                name: 'Música teste 1',
                youtubeLink: 'http://youtube.com/watch?v=teste',
                score: 10,
            },
        ];
        jest.spyOn(
            recommendationRepository,
            'getRecommendations'
        ).mockImplementationOnce(() => {
            return recommendations;
        });
        const result = await sut.getTopRecommendations(recommendations.length);
        expect(result).toEqual(recommendations);
    });
});
