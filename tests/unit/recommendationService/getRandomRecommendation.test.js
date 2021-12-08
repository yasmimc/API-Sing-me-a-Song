import * as recommendationService from '../../../src/services/recommendationService.js';
import * as recommendationRepository from '../../../src/repositories/recommendationRepository.js';
import NoRecommendationError from '../../../src/errors/NoRecommendationError.js';

const sut = recommendationService;
jest.mock('../../../src/repositories/recommendationRepository.js');

describe('test getRandomRecommendation service', () => {
    it('random < 7', async () => {
        jest.spyOn(Math, 'random').mockImplementationOnce(() => {
            return 0.6;
        });
        jest.spyOn(
            recommendationRepository,
            'getRecommendationsByScore'
        ).mockImplementationOnce(() => {
            return [
                {
                    id: 1,
                    name: 'Música teste 1',
                    youtubeLink: 'http://youtube.com/watch?v=teste',
                    score: 11,
                },
                {
                    id: 2,
                    name: 'Música teste 2',
                    youtubeLink: 'http://youtube.com/watch?v=teste',
                    score: 16,
                },
            ];
        });

        const result = await sut.getRandomRecommendation();
        expect(result.score).toBeGreaterThanOrEqual(11);
    });

    it('random === 7', async () => {
        jest.spyOn(Math, 'random').mockImplementationOnce(() => {
            return 0.7;
        });
        jest.spyOn(
            recommendationRepository,
            'getRecommendationsByScore'
        ).mockImplementationOnce(() => {
            return [
                {
                    id: 1,
                    name: 'Música teste 1',
                    youtubeLink: 'http://youtube.com/watch?v=teste',
                    score: 9,
                },
                {
                    id: 2,
                    name: 'Música teste 2',
                    youtubeLink: 'http://youtube.com/watch?v=teste',
                    score: 10,
                },
            ];
        });

        const result = await sut.getRandomRecommendation();
        expect(result.score).toBeGreaterThanOrEqual(-5);
        expect(result.score).toBeLessThanOrEqual(10);
    });

    it('random > 7', async () => {
        jest.spyOn(Math, 'random').mockImplementationOnce(() => {
            return 0.8;
        });
        jest.spyOn(
            recommendationRepository,
            'getRecommendationsByScore'
        ).mockImplementationOnce(() => {
            return [
                {
                    id: 1,
                    name: 'Música teste 1',
                    youtubeLink: 'http://youtube.com/watch?v=teste',
                    score: 9,
                },
                {
                    id: 2,
                    name: 'Música teste 2',
                    youtubeLink: 'http://youtube.com/watch?v=teste',
                    score: 10,
                },
            ];
        });

        const result = await sut.getRandomRecommendation();
        expect(result.score).toBeGreaterThanOrEqual(-5);
        expect(result.score).toBeLessThanOrEqual(10);
    });

    it('randomRecommendationByScore === null and  recommendations.length > 1', async () => {
        jest.spyOn(
            recommendationRepository,
            'getRecommendationsByScore'
        ).mockImplementationOnce(() => {
            return [];
        });
        jest.spyOn(
            recommendationRepository,
            'getRecommendations'
        ).mockImplementationOnce(() => {
            return [
                {
                    id: 1,
                    name: 'Música teste 1',
                    youtubeLink: 'http://youtube.com/watch?v=teste',
                    score: 9,
                },
                {
                    id: 2,
                    name: 'Música teste 2',
                    youtubeLink: 'http://youtube.com/watch?v=teste',
                    score: 10,
                },
            ];
        });
        const result = await sut.getRandomRecommendation();

        expect(result).toBeTruthy();
    });

    it('randomRecommendationByScore === null and recommendations.length === 0', async () => {
        jest.spyOn(
            recommendationRepository,
            'getRecommendationsByScore'
        ).mockImplementationOnce(() => {
            return [];
        });
        jest.spyOn(
            recommendationRepository,
            'getRecommendations'
        ).mockImplementationOnce(() => {
            return [];
        });

        const promise = sut.getRandomRecommendation();
        await expect(promise).rejects.toThrowError(NoRecommendationError);
    });

    it('recommendations.length === 1', async () => {
        jest.spyOn(
            recommendationRepository,
            'getRecommendationsByScore'
        ).mockImplementationOnce(() => {
            return [];
        });
        jest.spyOn(
            recommendationRepository,
            'getRecommendations'
        ).mockImplementationOnce(() => {
            return [
                {
                    id: 1,
                    name: 'Música teste 1',
                    youtubeLink: 'http://youtube.com/watch?v=teste',
                    score: 9,
                },
            ];
        });

        const result = await sut.getRandomRecommendation();

        expect(result).toEqual({
            id: 1,
            name: 'Música teste 1',
            youtubeLink: 'http://youtube.com/watch?v=teste',
            score: 9,
        });
    });
});
