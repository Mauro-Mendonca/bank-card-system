module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Cliente', {
    nome: DataTypes.STRING,
    cpf: DataTypes.STRING,
    email: DataTypes.STRING,
    dataNascimento: DataTypes.DATE
  });
};
