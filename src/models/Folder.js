const Sequelize = require('sequelize');

module.exports = sequelize => {
  class Folder extends Sequelize.Model {}

  Folder.init(
    {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
      },
      name: Sequelize.STRING
    },
    { sequelize, modelName: 'Folder' }
  );
  return Folder;
};
