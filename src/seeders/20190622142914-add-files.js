const { File } = require('../models');

const FILES = [
  {
    name: 'trabalho',
    docType: '.doc'
  },
  {
    name: 'monografia',
    docType: '.doc'
  },
  {
    name: 'contas',
    docType: '.doc'
  },
  {
    name: 'lista-de-compras',
    docType: '.doc'
  },
  {
    name: 'testes',
    docType: '.doc'
  },
  {
    name: 'projetos',
    docType: '.doc'
  },
  {
    name: 'lista de afazeres',
    docType: '.doc'
  }
];

module.exports = {
  up: () => {
    return File.bulkCreate(FILES);
  },

  down: () => {
    return File.destroy();
  }
};
