class UrlError extends Error {
    constructor(message) {
        super(message);
        this.name = 'UrlError';
    }
}

export default UrlError;
