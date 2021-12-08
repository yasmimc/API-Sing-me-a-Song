import * as recommendationService from '../../../src/services/recommendationService.js';
import * as recommendationRepository from '../../../src/repositories/recommendationRepository.js';
import NoRecommendationError from '../../../src/errors/NoRecommendationError.js';

const sut = recommendationService;
jest.mock('../../../src/repositories/recommendationRepository.js');

describe('test getRandomRecommendation service', () => {
    it('recommendations.length === 1', async () => {
        jest.spyOn(
            recommendationRepository,
            'getRecommendations'
        ).mockImplementation(() => {
            return [
                {
                    id: 1,
                    name: 'Música teste 1',
                    youtubeLink: 'http://youtube.com/watch?v=teste',
                    score: 0,
                },
            ];
        });

        const result = await sut.getRandomRecommendation();

        expect(result).toEqual({
            id: 1,
            name: 'Música teste 1',
            youtubeLink: 'http://youtube.com/watch?v=teste',
            score: 0,
        });
    });

    it('recommendations.length === 0', async () => {
        jest.spyOn(
            recommendationRepository,
            'getRecommendations'
        ).mockImplementation(() => {
            return [];
        });

        const promise = sut.getRandomRecommendation();
        await expect(promise).rejects.toThrowError(NoRecommendationError);
    });

    it('recommendations.length > 1 and random < 7', async () => {
        jest.spyOn(
            recommendationRepository,
            'getRecommendations'
        ).mockImplementation(() => {
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
                    score: 0,
                },
            ];
        });

        jest.spyOn(Math, 'random').mockImplementationOnce(() => {
            return 0.6;
        });

        const result = await sut.getRandomRecommendation();
        expect(result).toEqual({
            id: 1,
            name: 'Música teste 1',
            youtubeLink: 'http://youtube.com/watch?v=teste',
            score: 11,
        });
    });

    it('recommendations.length > 1 and random = 7', async () => {
        jest.spyOn(
            recommendationRepository,
            'getRecommendations'
        ).mockImplementation(() => {
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
                    score: 0,
                },
            ];
        });

        jest.spyOn(Math, 'random').mockImplementationOnce(() => {
            return 0.7;
        });

        const result = await sut.getRandomRecommendation();
        expect(result).toEqual({
            id: 2,
            name: 'Música teste 2',
            youtubeLink: 'http://youtube.com/watch?v=teste',
            score: 0,
        });
    });

    it('recommendations.length > 1 and random > 7', async () => {
        jest.spyOn(
            recommendationRepository,
            'getRecommendations'
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
                    score: 0,
                },
            ];
        });

        jest.spyOn(Math, 'random').mockImplementationOnce(() => {
            return 0.8;
        });

        const result = await sut.getRandomRecommendation();
        expect(result).toEqual({
            id: 2,
            name: 'Música teste 2',
            youtubeLink: 'http://youtube.com/watch?v=teste',
            score: 0,
        });
    });

    it('randomRecommendationByScore === null', async () => {
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
                    score: 0,
                },
            ];
        });

        const result = await sut.getRandomRecommendation();

        expect(result).toBeTruthy();
    });
});
