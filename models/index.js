const { Sequelize, DataTypes } = require('sequelize');
const config = require('../config/config.json');

const env = process.env.NODE_ENV || 'development';
const sequelizeConfig = config[env];

const sequelize = new Sequelize(
  sequelizeConfig.database,
  sequelizeConfig.username,
  sequelizeConfig.password,
  {
    host: sequelizeConfig.host,
    dialect: sequelizeConfig.dialect
  }
);

const db = {
  sequelize,
  Sequelize,
  models: {}
};

// Import models here (e.g., User)
db.models.User = require('./user')(sequelize, DataTypes);

module.exports = db;
