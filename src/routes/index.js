const express = require('express');
const router = express.Router();

const clienteController = require('../controllers/clienteController.js');
const cartaoController = require('../controllers/cartaoController.js');
const contratacaoController = require('../controllers/contratacaoController.js');

// Rotas de Cliente
router.post('/clientes', clienteController.criar);
router.get('/clientes', clienteController.listar);
router.get('/clientes/:id', clienteController.buscarPorId);
router.put('/clientes/:id', clienteController.atualizar);
router.delete('/clientes/:id', clienteController.remover);

// Rotas de Cartão
router.post('/cartoes', cartaoController.criar);
router.get('/cartoes', cartaoController.listar);
router.get('/cartoes/:id', cartaoController.buscarPorId);
router.put('/cartoes/:id', cartaoController.atualizar);
router.delete('/cartoes/:id', cartaoController.remover);

// Rotas de Contratação
router.post('/contratacoes', contratacaoController.contratar);
router.get('/clientes/:ClienteId/contratacoes', contratacaoController.listarPorCliente);
router.put('/contratacoes/:id', contratacaoController.atualizarStatus);

module.exports = router;
