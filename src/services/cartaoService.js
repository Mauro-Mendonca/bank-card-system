const cartaoRepository = require('../repositories/cartaoRepository.js');

module.exports = {
  async criar(dados) {
    return await cartaoRepository.criar(dados);
  },

  async listar() {
    return await cartaoRepository.listar();
  },

  async buscarPorId(id) {
    return await cartaoRepository.buscarPorId(id);
  },

  async atualizar(id, dados) {
    return await cartaoRepository.atualizar(id, dados);
  },

  async remover(id) {
    return await cartaoRepository.remover(id);
  }
};
