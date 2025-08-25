module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Cartao', {
    nome: DataTypes.STRING,
    tipo: DataTypes.ENUM('crédito', 'débito'),
    anuidade: DataTypes.FLOAT,
    bandeira: DataTypes.STRING
  });
};
