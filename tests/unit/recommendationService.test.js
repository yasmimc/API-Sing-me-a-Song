// import '../../src/setup.js';
import * as recommendationService from '../../src/services/recommendationService.js';
// import jest from 'jest';
import urlExist from 'url-exist';
// import * as recommendationRepository from '../../src/repositories/recommendationRepository.js';

const sut = recommendationService;
// jest.mock('url-exist');

// jest.mock('../../src/services/recommendationService.js');
// jest.mock('../../src/repositories/recommendationRepository.js');
describe('test save recommendation service', () => {
    it('url exists', async () => {
        const name = 'Música teste';
        const youtubeLink = 'http://www.youtube.com/teste';

        jest.spyOn(recommendationRepository, 'save');

        // urlExist.mockImplementationOnce(() => {
        //     return true;
        // });

        const promise = await recommendationService.saveRecommendation({
            name,
            youtubeLink,
        });
        console.log(promise);

        console.log('oi');
    });
});
