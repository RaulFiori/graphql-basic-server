const { File } = require('../models');

const FILES = [
  {
    name: 'teste',
    docType: '.doc'
  },
  {
    name: 'teste2',
    docType: '.doc'
  },
  {
    name: 'teste3',
    docType: '.doc'
  },
  {
    name: 'teste4',
    docType: '.doc'
  },
  {
    name: 'teste5',
    docType: '.doc'
  },
  {
    name: 'teste6',
    docType: '.doc'
  },
  {
    name: 'teste7',
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
