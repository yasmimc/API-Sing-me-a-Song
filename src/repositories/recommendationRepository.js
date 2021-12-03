import connection from '../database/connection.js';
import RecommendationIdError from '../errors/RecommendationIdError.js';

async function save({ name, youtubeLink }) {
    const result = await connection.query(
        `INSERT INTO recommendations (name, youtube_link) VALUES ($1, $2)`,
        [name, youtubeLink]
    );
}

async function editScore({ id, scoreUpdate }) {
    const result = await connection.query(
        `UPDATE recommendations SET score = score ${scoreUpdate} WHERE id = $1  RETURNING *`,
        [id]
    );
    if (result.rowCount === 0) {
        throw new RecommendationIdError('Recommendation not found');
    }
}

async function getRecommendations() {
    const result = await connection.query(`SELECT * FROM recommendations;`);
    return result.rows;
}

export { save, editScore, getRecommendations };
