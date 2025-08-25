const { Cartao } = require('../models');

module.exports = {
  async criar(dados) {
    return await Cartao.create(dados);
  },

  async listar() {
    return await Cartao.findAll();
  },

  async buscarPorId(id) {
    return await Cartao.findByPk(id);
  },

  async atualizar(id, dados) {
    const cartao = await Cartao.findByPk(id);
    if (!cartao) throw new Error('Cartão não encontrado');
    return await cartao.update(dados);
  },

  async remover(id) {
    const cartao = await Cartao.findByPk(id);
    if (!cartao) throw new Error('Cartão não encontrado');
    return await cartao.destroy();
  }
};
