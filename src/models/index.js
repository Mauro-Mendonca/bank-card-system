const Sequelize = require('sequelize');
const config = require('../config/config.js')['development'];

const sequelize = new Sequelize(config);

const Cliente = require('./cliente')(sequelize, Sequelize.DataTypes);
const Cartao = require('./cartao')(sequelize, Sequelize.DataTypes);
const Contratacao = require('./contratacao')(sequelize, Sequelize.DataTypes);

// Relacionamentos
Cliente.hasMany(Contratacao);
Cartao.hasMany(Contratacao);
Contratacao.belongsTo(Cliente);
Contratacao.belongsTo(Cartao);

module.exports = {
  sequelize,
  Sequelize,
  Cliente,
  Cartao,
  Contratacao
};
