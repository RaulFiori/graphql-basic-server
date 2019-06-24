const { Folder } = require('../models');

const FOLDERS = [
  {
    name: 'trabalhos'
  },
  {
    name: 'faculdade'
  },
  {
    name: 'fotos'
  },
  {
    name: 'arquivos'
  },
  {
    name: 'geral'
  },
  {
    name: 'projetos'
  }
];

module.exports = {
  up: () => {
    return Folder.bulkCreate(FOLDERS);
  },

  down: () => {
    return Folder.destroy();
  }
};
