const moment = require('moment');

const models = require('../models');

const EDIT_CHANNEL = 'edit';
const CREATE_CHANNEL = 'create';
const CHANGE_CHANNEL = 'create';
const CREATED = 'Created';
const EDITED = 'Edited';
const { File, Folder } = models;

const resolvers = {
  Query: {
    files: () => File.findAll({ order: [['createdAt', 'DESC']] }),
    file: (_, { id }) => File.findByPk(id),
    folders: () => Folder.findAll({ order: [['createdAt', 'DESC']] }),
  },
  Mutation: {
    createFile: (_, { file }, { pubsub }) =>
      File.create(file, { returning: true }).then(fileCreated => {
        pubsub.publish(CHANGE_CHANNEL, {
          fileId: fileCreated.id,
          type: CREATED,
        });
        return fileCreated;
      }),
    updateFile: async (_, { file }, { pubsub }) => {
      const { id } = file;
      const fileInDb = await File.findByPk(id);
      fileInDb.update(file).then(() => {
        pubsub.publish(CHANGE_CHANNEL, { fileId: id, type: EDITED });
      });

      return fileInDb;
    },
    deleteFile: (_, { id }) =>
      File.destroy({ where: { id } }).then(() => 'file deleted'),
  },
  Subscription: {
    fileChange: {
      subscribe: (root, args, { pubsub }) =>
        pubsub.asyncIterator([CHANGE_CHANNEL]),
      resolve: ({ fileId, type }) =>
        File.findByPk(fileId).then(file => ({ [`file${type}`]: file })),
    },
    fileEdited: {
      subscribe: (root, args, { pubsub }) =>
        pubsub.asyncIterator([EDIT_CHANNEL]),
    },
    fileCreated: {
      subscribe: (root, args, { pubsub }) =>
        pubsub.asyncIterator([CREATE_CHANNEL]),
      resolve: ({ fileId }) => File.findByPk(fileId),
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
