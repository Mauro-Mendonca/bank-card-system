const clienteRepository = require('../repositories/clienteRepository.js');

module.exports = {
  async criar(dados) {
    return await clienteRepository.criar(dados);
  },

  async listar() {
    return await clienteRepository.listar();
  },

  async buscarPorId(id) {
    return await clienteRepository.buscarPorId(id);
  },

  async atualizar(id, dados) {
    return await clienteRepository.atualizar(id, dados);
  },

  async remover(id) {
    return await clienteRepository.remover(id);
  }
};
