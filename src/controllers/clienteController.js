const clienteService = require('../services/clienteService.js');

module.exports = {
  async criar(req, res) {
    try {
      const cliente = await clienteService.criar(req.body);
      res.status(201).json(cliente);
    } catch (err) {
      res.status(400).json({ erro: err.message });
    }
  },
  async listar(req, res) {
    const clientes = await clienteService.listar();
    res.json(clientes);
  },
  async buscarPorId(req, res) {
    const cliente = await clienteService.buscarPorId(req.params.id);
    if (!cliente) return res.status(404).json({ erro: 'Cliente não encontrado' });
    res.json(cliente);
  },
  async atualizar(req, res) {
    const atualizado = await clienteService.atualizar(req.params.id, req.body);
    res.json(atualizado);
  },
  async remover(req, res) {
    await clienteService.remover(req.params.id);
    res.status(204).send();
  }
};
