const { GraphQLServer } = require('graphql-yoga');
const models = require('./models');
const { File } = models;

const resolvers = {
  Query: {
    files: () => File.findAll(),
    file: (_, { id }) => File.findByPk(id),
    hello: () => 'olá'
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
  }
};

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers
});

server.start(() => console.log('Server is running on http://localhost:4000'));
