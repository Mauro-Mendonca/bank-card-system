const { Contratacao, Cartao } = require('../models');

module.exports = {
  async criar(dados) {
    return await Contratacao.create(dados);
  },

  async listarPorCliente(ClienteId) {
    return await Contratacao.findAll({
      where: { ClienteId: ClienteId },
      include: [Cartao]
    });
  },

  async atualizarStatus(id, status) {
    const contratacao = await Contratacao.findByPk(id);
    if (!contratacao) throw new Error('Contratação não encontrada');
    return await contratacao.update({ status });
  }
};
