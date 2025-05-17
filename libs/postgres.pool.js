const { Pool } = require('pg');
const { config } = require('./../config/config');

const options = {};
const USER = encodeURIComponent(process.env.DB_USER);
const PASSWORD = encodeURIComponent(process.env.DB_PASSWORD);
const HOST = process.env.DB_HOST;
const PORT = process.env.DB_PORT;
const DB = process.env.DB_NAME;
const DATABASE_URL = `mysql://${USER}:${PASSWORD}@${HOST}:${PORT}/${DB}`;
if (config.isProd) {
  options.connectionString = DATABASE_URL;
  options.ssl = {
    rejectUnauthorized: false,
  };
} else {
  const USER = encodeURIComponent(config.dbUser);
  const PASSWORD = encodeURIComponent(config.dbPassword);
  const DATABASE_URL = `mysql://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;
  options.connectionString = DATABASE_URL;
}

const pool = new Pool(options);

module.exports = pool;
