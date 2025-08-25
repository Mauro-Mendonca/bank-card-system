module.exports = {
  openapi: '3.0.0',
  info: {
    title: 'API de Gestão de Cartões Bancários',
    version: '1.0.0',
    description: 'Documentação da API para gerenciamento de clientes, cartões e contratações.'
  },
  paths: {
    '/clientes': {
      post: {
        summary: 'Cadastrar cliente',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Cliente'
              }
            }
          }
        },
        responses: {
          201: { description: 'Cliente criado com sucesso' },
          400: { description: 'Erro de validação' }
        }
      },
      get: {
        summary: 'Listar clientes',
        responses: {
          200: { description: 'Lista de clientes' }
        }
      }
    },
    '/clientes/{id}': {
      get: {
        summary: 'Buscar cliente por ID',
        parameters: [{
          name: 'id',
          in: 'path',
          required: true,
          schema: { type: 'integer' }
        }],
        responses: {
          200: { description: 'Dados do cliente' },
          404: { description: 'Cliente não encontrado' }
        }
      },
      put: {
        summary: 'Atualizar cliente',
        parameters: [{
          name: 'id',
          in: 'path',
          required: true,
          schema: { type: 'integer' }
        }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/Cliente' }
            }
          }
        },
        responses: {
          200: { description: 'Cliente atualizado com sucesso' }
        }
      },
      delete: {
        summary: 'Remover cliente',
        parameters: [{
          name: 'id',
          in: 'path',
          required: true,
          schema: { type: 'integer' }
        }],
        responses: {
          204: { description: 'Cliente removido com sucesso' }
        }
      }
    },
    '/cartoes': {
      post: {
        summary: 'Cadastrar cartão',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/Cartao' }
            }
          }
        },
        responses: {
          201: { description: 'Cartão criado com sucesso' }
        }
      },
      get: {
        summary: 'Listar cartões',
        responses: {
          200: { description: 'Lista de cartões' }
        }
      }
    },
    '/cartoes/{id}': {
      get: {
        summary: 'Buscar cartão por ID',
        parameters: [{
          name: 'id',
          in: 'path',
          required: true,
          schema: { type: 'integer' }
        }],
        responses: {
          200: { description: 'Dados do cartão' },
          404: { description: 'Cartão não encontrado' }
        }
      },
      put: {
        summary: 'Atualizar cartão',
        parameters: [{
          name: 'id',
          in: 'path',
          required: true,
          schema: { type: 'integer' }
        }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/Cartao' }
            }
          }
        },
        responses: {
          200: { description: 'Cartão atualizado com sucesso' }
        }
      },
      delete: {
        summary: 'Remover cartão',
        parameters: [{
          name: 'id',
          in: 'path',
          required: true,
          schema: { type: 'integer' }
        }],
        responses: {
          204: { description: 'Cartão removido com sucesso' }
        }
      }
    },
    '/contratacoes': {
      post: {
        summary: 'Cadastrar contratação',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/Contratacao' }
            }
          }
        },
        responses: {
          201: { description: 'Contratação realizada com sucesso' }
        }
      }
    },
    '/clientes/{ClienteId}/contratacoes': {
      get: {
        summary: 'Listar contratações por cliente',
        parameters: [{
          name: 'ClienteId',
          in: 'path',
          required: true,
          schema: { type: 'integer' }
        }],
        responses: {
          200: { description: 'Lista de contratações do cliente' }
        }
      }
    },
    '/contratacoes/{id}': {
      put: {
        summary: 'Atualizar status da contratação',
        parameters: [{
          name: 'id',
          in: 'path',
          required: true,
          schema: { type: 'integer' }
        }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  status: {
                    type: 'string',
                    enum: ['ativo', 'cancelado']
                  }
                }
              }
            }
          }
        },
        responses: {
          200: { description: 'Status atualizado com sucesso' }
        }
      }
    }
  },
  components: {
    schemas: {
      Cliente: {
        type: 'object',
        properties: {
          nome: { type: 'string' },
          cpf: { type: 'string' },
          email: { type: 'string' },
          dataNascimento: { type: 'string', format: 'date' }
        }
      },
      Cartao: {
        type: 'object',
        properties: {
          nome: { type: 'string' },
          tipo: { type: 'string', enum: ['crédito', 'débito'] },
          anuidade: { type: 'number' },
          bandeira: { type: 'string' }
        }
      },
      Contratacao: {
        type: 'object',
        properties: {
          ClienteId: { type: 'integer' },
          CartaoId: { type: 'integer' },
          dataContratacao: { type: 'string', format: 'date' },
          status: { type: 'string', enum: ['ativo', 'cancelado'] }
        }
      }
    }
  }
};

