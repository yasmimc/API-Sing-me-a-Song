class RecommendationIdError extends Error {
    constructor(message) {
        super(message);
        this.name = 'RecommendationIdError';
    }
}

export default RecommendationIdError;
