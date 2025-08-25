require('dotenv').config();
const express = require('express');
const app = express();
const { sequelize } = require('./src/models');
const routes = require('./src/routes');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./src/docs/swagger');

app.use(express.json());
app.use('/api', routes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Sincroniza banco e inicia servidor
const PORT = process.env.PORT || 3000;
sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });
});

//Servir o front-end
const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));
