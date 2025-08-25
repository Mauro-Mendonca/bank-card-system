const cartaoService = require('../services/cartaoService.js');

module.exports = {
  async criar(req, res) {
    try {
      const cartao = await cartaoService.criar(req.body);
      res.status(201).json(cartao);
    } catch (err) {
      res.status(400).json({ erro: err.message });
    }
  },

  async listar(req, res) {
    const cartoes = await cartaoService.listar();
    res.json(cartoes);
  },

  async buscarPorId(req, res) {
    const cartao = await cartaoService.buscarPorId(req.params.id);
    if (!cartao) return res.status(404).json({ erro: 'Cartão não encontrado' });
    res.json(cartao);
  },

  async atualizar(req, res) {
    const atualizado = await cartaoService.atualizar(req.params.id, req.body);
    res.json(atualizado);
  },

  async remover(req, res) {
    await cartaoService.remover(req.params.id);
    res.status(204).send();
  }
};
