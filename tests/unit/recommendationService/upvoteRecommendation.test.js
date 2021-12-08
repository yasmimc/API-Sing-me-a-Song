import * as recommendationService from '../../../src/services/recommendationService.js';
import * as recommendationRepository from '../../../src/repositories/recommendationRepository.js';
import RecommendationIdError from '../../../src/errors/RecommendationIdError.js';

jest.mock('../../../src/repositories/recommendationRepository.js');
const sut = recommendationService;

describe('test upvoteRecommendation service', () => {
    it('recommendation exists', async () => {
        const id = 1;

        const editScore = jest
            .spyOn(recommendationRepository, 'editScore')
            .mockImplementationOnce(() => {
                return [
                    {
                        id: 1,
                        name: 'Musica teste',
                        youtubeLink: 'http://youtube.com/watch?v=teste',
                    },
                ];
            });

        await sut.upvoteRecommendation({ id });
        expect(editScore).toHaveBeenCalledWith({ id, scoreUpdate: '+ 1' });
        expect(editScore.mock.calls.length).toBe(1);
    });

    it('recommendation dont exists', async () => {
        const id = 2;

        const editScore = jest
            .spyOn(recommendationRepository, 'editScore')
            .mockImplementationOnce(() => {
                return [];
            });

        const promise = sut.upvoteRecommendation({ id });
        expect(editScore).toHaveBeenCalledWith({ id, scoreUpdate: '+ 1' });
        await expect(promise).rejects.toThrowError(RecommendationIdError);
    });
});
