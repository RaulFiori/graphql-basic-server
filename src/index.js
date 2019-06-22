const { GraphQLServer } = require('graphql-yoga');
const models = require('./models');
const { File } = models;

const resolvers = {
  Query: {
    files: () => File.findAll(),
    file: (_, {id}) => File.findByPk(id),
    hello: () => 'olá'
  }
  // Mutation: {
  //   createDraft(parent, { title, content }, context) {
  //     return context.prisma.createPost({
  //       title,
  //       content,
  //     })
  //   },
  //   deletePost(parent, { id }, context) {
  //     return context.prisma.deletePost({ id })
  //   },
  //   publish(parent, { id }, context) {
  //     return context.prisma.updatePost({
  //       where: { id },
  //       data: { published: true },
  //     })
  //   },
  // },
};

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers
});

server.start(() => console.log('Server is running on http://localhost:4000'));
