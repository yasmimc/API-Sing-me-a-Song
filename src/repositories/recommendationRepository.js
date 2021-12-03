import connection from '../database/connection.js';

async function save({ name, youtubeLink }) {
    const result = await connection.query(
        `INSERT INTO recommendations (name, youtube_link) VALUES ($1, $2)`,
        [name, youtubeLink]
    );
}

export { save };
