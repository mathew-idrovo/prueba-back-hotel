require('dotenv').config();
const { Sequelize } = require('sequelize');
const setupModels = require('../db/models');
const config =
  require('../config/config')[process.env.NODE_ENV || 'development'];

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    port: config.port,
    dialect: config.dialect,
    logging: false,
  },
);
setupModels(sequelize);
sequelize
  .authenticate()
  .then(() => console.log('✅ Conexion exitosa a la BD'))
  .catch((err) => console.error('❌ Error conectando a la BD:', err));

module.exports = sequelize;
