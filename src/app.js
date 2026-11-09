const express = require('express');
const path = require('path');

const tarefaRoutes = require('./routes/TarefaRoutes');

const app = express();

// Configurar o EJS como mecanismo de visualização
app.set('view engine', 'ejs');

// Definir a localização das Views
app.set('views', path.join(__dirname, 'views'));

// Interpretar dados enviados pelos formulários
app.use(express.urlencoded({ extended: true }));

// Interpretar dados JSON
app.use(express.json());

// Página inicial
app.get('/', (req, res) => {
    res.redirect('/tarefas');
});

// Rotas das tarefas
app.use('/tarefas', tarefaRoutes);

module.exports = app;
