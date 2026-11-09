const express = require('express');

const router = express.Router();

const TarefaController = require('../controllers/TarefaController');

// Listar tarefas
router.get('/', TarefaController.listar);

// Exibir formulário de cadastro
router.get('/nova', TarefaController.nova);

// Cadastrar tarefa
router.post('/', TarefaController.cadastrar);

// Exibir formulário de edição
router.get('/:id/editar', TarefaController.editarForm);

// Atualizar tarefa
router.post('/:id/editar', TarefaController.atualizar);

// Concluir tarefa
router.post('/:id/concluir', TarefaController.concluir);

// Excluir tarefa
router.post('/:id/excluir', TarefaController.excluir);

// Consultar detalhes
router.get('/:id', TarefaController.consultar);

module.exports = router;

