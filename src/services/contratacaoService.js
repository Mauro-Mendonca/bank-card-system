const contratacaoRepository = require('../repositories/contratacaoRepository.js');

module.exports = {
  async contratar({ ClienteId, CartaoId, dataContratacao, status }) {
    return await contratacaoRepository.criar({
      ClienteId,
      CartaoId,
      dataContratacao,
      status
    });
  },

  async listarPorCliente(ClienteId) {
    return await contratacaoRepository.listarPorCliente(ClienteId);
  },

  async atualizarStatus(id, status) {
    return await contratacaoRepository.atualizarStatus(id, status);
  }
};