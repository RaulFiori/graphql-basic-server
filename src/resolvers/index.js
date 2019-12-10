const models = require('../models');
const moment = require('moment');
const CHANNEL_ID = 'channel';
const { File, Folder } = models;

const resolvers = {
  Query: {
    files: () => File.findAll({ order: [['createdAt', 'DESC']] }),
    file: (_, { id }) => File.findByPk(id),
    folders: () => Folder.findAll({ order: [['createdAt', 'DESC']] }),
  },
  Mutation: {
    createFile: (_, { file }) => File.create(file, { returning: true }),
    updateFile: async (_, { file }, { pubsub }) => {
      const { id } = file;
      const fileInDb = await File.findByPk(id);
      fileInDb.update(file);
      pubsub.publish(CHANNEL_ID, { fileEdited: fileInDb });
      return fileInDb;
    },
    deleteFile: (_, { id }) =>
      File.destroy({ where: { id } }).then(() => 'file deleted'),
  },
  Subscription: {
    fileEdited: {
      subscribe: (root, args, { pubsub }) => pubsub.asyncIterator([CHANNEL_ID]),
    },
  },
  File: {
    createdAt: ({ createdAt }) => moment(createdAt).format('DD/MM/YYYY HH:mm'),
  },
  Folder: {
    createdAt: ({ createdAt }) => moment(createdAt).format('DD/MM/YYYY HH:mm'),
  },
};

module.exports = resolvers;
