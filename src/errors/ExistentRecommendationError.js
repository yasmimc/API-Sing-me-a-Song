class ExistentRecommendationError extends Error {
    constructor(message) {
        super(message);
        this.name = 'ExistentRecommendationError';
    }
}

export default ExistentRecommendationError;
