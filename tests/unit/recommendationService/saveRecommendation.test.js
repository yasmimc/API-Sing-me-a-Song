import * as recommendationService from '../../../src/services/recommendationService.js';
import * as recommendationRepository from '../../../src/repositories/recommendationRepository.js';
import UrlError from '../../../src/errors/UrlError.js';

const sut = recommendationService;
jest.mock('../../../src/repositories/recommendationRepository.js');

describe('test saveRecommendation service', () => {
    it('url dont exists', async () => {
        const name = 'Música teste';
        const youtubeLink = 'http://www.com/teste';

        jest.spyOn(recommendationRepository, 'save').mockImplementation();

        const promise = sut.saveRecommendation({
            name,
            youtubeLink,
        });
        await expect(promise).rejects.toThrowError(UrlError);
    });

    it('url exists', async () => {
        const name = 'Música teste';
        const youtubeLink = 'http://www.youtube.com/teste';

        const mockRepository = jest
            .spyOn(recommendationRepository, 'save')
            .mockImplementation();

        await sut.saveRecommendation({
            name,
            youtubeLink,
        });
        expect(mockRepository.mock.calls.length).toBe(1);
    });
});
