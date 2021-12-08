import connection from '../database/connection.js';

async function save({ name, youtubeLink }) {
    const result = await connection.query(
        `INSERT INTO recommendations (name, youtube_link) VALUES ($1, $2)`,
        [name, youtubeLink]
    );
}

async function findRecommendationByYoutubeLink(youtubeLink) {
    const result = await connection.query(
        `SELECT * FROM recommendations WHERE youtube_link = $1`,
        [youtubeLink]
    );
    if (result.rowCount) {
        return result.rows[0];
    }
    return null;
}

async function editScore({ id, scoreUpdate }) {
    const result = await connection.query(
        `UPDATE recommendations SET score = score ${scoreUpdate} WHERE id = $1  RETURNING *`,
        [id]
    );
    return result.rows;
}

async function getRecommendations(amount) {
    const baseQuery = `SELECT * FROM recommendations ORDER BY score DESC`;
    let query = baseQuery;
    const preparedValues = [];
    if (amount) {
        query += ` LIMIT $1;`;
        preparedValues.push(amount);
    } else {
        query += ';';
    }
    const result = await connection.query(query, preparedValues);
    return result.rows;
}

async function getRecommendationsByScore({ minScore, maxScore }) {
    const baseQuery = `SELECT * FROM recommendations`;
    let query = baseQuery;

    const preparedValues = [];

    if (minScore && maxScore) {
        query += ` WHERE score >= $1 AND score <= $2`;
        preparedValues.push(minScore, maxScore);
    } else if (minScore) {
        query += ` WHERE score >= $1`;
        preparedValues.push(minScore);
    } else if (maxScore) {
        query += ` WHERE score <= $1;`;
        preparedValues.push(maxScore);
    } else {
        query += `;`;
    }
    const result = await connection.query(query, preparedValues);
    return result.rows;
}

export {
    save,
    editScore,
    getRecommendations,
    findRecommendationByYoutubeLink,
    getRecommendationsByScore,
};
