module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Contratacao', {
    dataContratacao: {
      type: DataTypes.DATE,
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM('ativo', 'cancelado'),
      defaultValue: 'ativo'
    },
    ClienteId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    CartaoId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });
};

