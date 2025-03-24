const sqlite3 = require('better-sqlite3');
const db = new sqlite3('mydatabase.db');
db.pragma('journal_mode = WAL');

// Create the positions table if it doesn't exist
db.exec(`
    CREATE TABLE IF NOT EXISTS positions (
        id INTEGER PRIMARY KEY,
        positions INTEGER
    );
`);

// Insert the default positions value if it doesn't already exist
db.exec(`
    INSERT OR IGNORE INTO positions (id, positions)
    VALUES (1, 2);
`);

const getPositionsDao = () => {
    const result = db.prepare('select * from positions WHERE id = 1').get()
    return result.positions
};

const updatePositionsDao = (positions) => {
    const stmt = db.prepare('UPDATE positions SET positions = (?) WHERE id = 1')
    const result = stmt.run(positions)
    return positions
};

module.exports = { getPositionsDao, updatePositionsDao };