const Sequelize = require('sequelize');

module.exports = sequelize => {
  class File extends Sequelize.Model {}

  File.init(
    {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
      },
      name: Sequelize.STRING,
      docType: Sequelize.STRING
    },
    { sequelize, modelName: 'File' }
  );
  return File;
};
