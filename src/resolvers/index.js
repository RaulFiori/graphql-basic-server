const models = require('../models');
const moment = require('moment');
const { File } = models;

const resolvers = {
  Query: {
    files: () => File.findAll({ order: [['createdAt', 'DESC']] }),
    file: (_, { id }) => File.findByPk(id)
  },
  Mutation: {
    createFile: (_, { file }) => File.create(file, { returning: true }),
    updateFile: async (_, { file }) => {
      const { id } = file;
      const fileInDb = await File.findByPk(id);
      fileInDb.update(file);
      return fileInDb;
    },
    deleteFile: (_, { id }) =>
      File.destroy({ where: { id } }).then(() => 'file deleted')
  },
  File: {
    createdAt: ({ createdAt }) => moment(createdAt).format('DD/MM/YYYY HH:mm')
  }
};

module.exports = resolvers;
