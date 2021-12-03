class NoRecommendationError extends Error {
    constructor(message) {
        super(message);
        this.name = 'NoRecommendationError';
    }
}

export default NoRecommendationError;
