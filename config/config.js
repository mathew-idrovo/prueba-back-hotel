require('dotenv').config();

const config = {
  development: {
    env: process.env.NODE_ENV || 'development',
    isProd: process.env.NODE_ENV === 'production',
    port: process.env.PORT || 3000,
    dbUser: process.env.DB_USER,
    dbPassword: process.env.DB_PASSWORD,
    dbHost: process.env.DB_HOST,
    dbName: process.env.DB_NAME,
    dbPort: process.env.DB_PORT,
    dialect: 'mysql',
    jwtSecret: process.env.JWT_SECRET,
    dbUrl: process.env.DATABASE_URL || null,
  },
};

module.exports = config.development;
