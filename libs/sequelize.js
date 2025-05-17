const { Sequelize } = require('sequelize');
const config = require('../config/config');

let sequelize;

if (config.dbUrl) {
  sequelize = new Sequelize(config.dbUrl, {
    dialect: config.dialect,
    logging: false,
  });
} else {
  sequelize = new Sequelize(config.dbName, config.dbUser, config.dbPassword, {
    host: config.dbHost,
    port: config.dbPort,
    dialect: config.dialect,
    logging: false,
  });
}

sequelize
  .authenticate()
  .then(() => console.log('✅ Conexión a la BD exitosa'))
  .catch((err) => console.error('❌ Error conectando a la BD:', err));

module.exports = sequelize;
