# 💳 BANK-CARD-SYSTEM

Sistema completo para gestão de clientes, cartões bancários e contratações. Desenvolvido com Node.js, Express e SQLite, com interface web responsiva e documentação via Swagger. Esse projeto
foi desenvolvido como desafio do curso de Dev Foundations da Fiap.

## 📦 Funcionalidades

- Cadastro, listagem, atualização e exclusão de **clientes**
- Gerenciamento de **cartões** (crédito/débito, bandeira, anuidade)
- Contratação de cartões por clientes, com controle de **status**
- Interface web com páginas dedicadas para clientes, cartões e contratos
- Pesquisa dinâmica e formulários interativos
- API RESTful documentada com Swagger

## 🖥️ Interface Web

Disponível em `/public` com as seguintes páginas:

- `index.html`: página de boas-vindas
- `menu.html`: dashboard com indicadores
- `clientes.html`: gestão de clientes
- `cartoes.html`: gestão de cartões
- `contratacoes.html`: gestão de contratações

## 🚀 Como rodar o projeto

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/BANK-CARD-SYSTEM.git
cd BANK-CARD-SYSTEM

# Instale as dependências
npm install

# Inicie o servidor
npm start

O banco de dados SQLite será criado automaticamente como database.sqlite.

🔗 Endpoints principais
POST /clientes – Cadastrar cliente

GET /clientes – Listar clientes

GET /clientes/:id – Buscar cliente por ID

PUT /clientes/:id – Atualizar cliente

DELETE /clientes/:id – Remover cliente

POST /cartoes – Cadastrar cartão

GET /cartoes – Listar cartões

GET /cartoes/:id – Buscar cartão por ID

PUT /cartoes/:id – Atualizar cartão

DELETE /cartoes/:id – Remover cartão

POST /contratacoes – Contratar cartão

GET /clientes/:ClienteId/contratacoes – Listar contratações por cliente

PUT /contratacoes/:id – Atualizar status da contratação

📚 Documentação da API
Acesse a documentação interativa via Swagger:
http://localhost:3000/api-docs

🛠️ Tecnologias Utilizadas
Node.js

Express

Sequelize (ORM)

SQLite

HTML, CSS, JavaScript (ES6)

Swagger (OpenAPI 3.0)

BANK-CARD-SYSTEM/
├── public/               # Interface web
├── src/
│   ├── config/           # Configuração do banco
│   ├── controllers/      # Lógica dos endpoints
│   ├── docs/             # Swagger
│   ├── models/           # Modelos Sequelize
│   ├── repositories/     # Acesso ao banco
│   ├── routes/           # Rotas da API
│   └── services/         # Regras de negócio
├── app.js                # Inicialização do servidor
├── database.sqlite       # Banco de dados
├── package.json
└── README.md

🤝 Contribuições
Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou enviar pull requests.

📄 Licença
Este projeto está sob a licença MIT.

