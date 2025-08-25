const contratacaoService = require('../services/contratacaoService.js');

module.exports = {
  async contratar(req, res) {
    try {
      const contratacao = await contratacaoService.contratar(req.body);
      res.status(201).json(contratacao);
    } catch (err) {
      res.status(400).json({ erro: err.message });
    }
  },

  async listarPorCliente(req, res) {
    const contratacoes = await contratacaoService.listarPorCliente(req.params.ClienteId);
    res.json(contratacoes);
  },

  async atualizarStatus(req, res) {
    const atualizado = await contratacaoService.atualizarStatus(req.params.id, req.body.status);
    res.json(atualizado);
  }
};
