const { Pool } = require('pg');


require('env2')('./config.env');

if (!process.env.DATABASE_URL) throw new Error('DB_URL is not set');
const dbUrl = process.env.DATABASE_URL;

module.exports = new Pool({ connectionString: dbUrl, ssl: true });
