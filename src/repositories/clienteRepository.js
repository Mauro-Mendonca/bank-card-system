const { Cliente } = require('../models');

module.exports = {
  async criar(dados) {
    return await Cliente.create(dados);
  },

  async listar() {
    return await Cliente.findAll();
  },

  async buscarPorId(id) {
    return await Cliente.findByPk(id);
  },

  async atualizar(id, dados) {
    const cliente = await Cliente.findByPk(id);
    if (!cliente) throw new Error('Cliente não encontrado');
    return await cliente.update(dados);
  },

  async remover(id) {
    const cliente = await Cliente.findByPk(id);
    if (!cliente) throw new Error('Cliente não encontrado');
    return await cliente.destroy();
  }
};
