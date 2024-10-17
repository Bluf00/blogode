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

// Import models
db.models.User = require('./user')(sequelize, DataTypes);
db.models.Post = require('./post')(sequelize, DataTypes);
db.models.Comment = require('./comment')(sequelize, DataTypes);

// Set up associations
Object.keys(db.models).forEach(modelName => {
    if (db.models[modelName].associate) {
        db.models[modelName].associate(db.models);
    }
});

module.exports = db;