import connection from '../database/connection.js';

async function save({ name, youtubeLink }) {
    const result = await connection.query(
        `INSERT INTO recommendations (name, youtube_link) VALUES ($1, $2)`,
        [name, youtubeLink]
    );
}

async function editScore({ id, scoreUpdate }) {
    const result = await connection.query(
        `UPDATE recommendations SET score = score ${scoreUpdate} WHERE id = $1`,
        [id]
    );
}

export { save, editScore };
