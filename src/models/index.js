const fs = require('fs');

const path = require('path');

const Sequelize = require('sequelize');

const basename = path.basename(module.filename);

const maxPools = 15;

const config = require(`../../postgres/postgres-config`);
const db = {};
let sequelize;
config.logging = false;

// set max pool and appName
config.pool = { max: maxPools, min: 0, idle: 10000 };
if (!config.dialectOptions) {
  config.dialectOptions = {};
}

config.dialectOptions.application_name = 'graphql-api';

sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

fs.readdirSync(__dirname)
  .filter(
    file =>
      file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
  )
  .forEach(file => {
    const model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

const options = {};
options.force = true;

// sequelize.sync();

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
