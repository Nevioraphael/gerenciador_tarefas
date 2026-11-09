const Tarefa = require('../models/Tarefa');

class TarefaController {

    static listar(req, res) {

        const status = req.query.status || 'todas';

        const filtrosPermitidos = [
            'todas',
            'pendente',
            'concluida'
        ];

        if (!filtrosPermitidos.includes(status)) {
            return res.status(400).send('Filtro inválido!');
        }

        const tarefas = Tarefa.filtrar(status);

        res.render('tarefas/index', {
            tarefas,
            filtro: status
        });
    }


    // Consultar detalhes de uma tarefa
    static consultar(req, res) {

        const { id } = req.params;

        // Buscar tarefa no Model
        const tarefa = Tarefa.buscarPorId(id);

        // Verificar se a tarefa existe
        if (!tarefa) {
            return res.status(404).send('Tarefa não encontrada!');
        }

        // Exibir página de detalhes
        res.render('tarefas/detalhes', {
            tarefa: tarefa
        });
    }


    // Exibir tela de cadastro
    static nova(req, res) {
        res.render('tarefas/cadastro', {
            erro: null,
            dados: {}
        });
    }

    // Cadastrar uma nova tarefa
    static cadastrar(req, res) {

        const { titulo, descricao, disciplina } = req.body;

        // Validar título
        if (
            typeof titulo !== 'string' ||
            titulo.trim().length < 3 ||
            titulo.trim().length > 100
        ) {
            return res.status(400).render('tarefas/cadastro', {
                erro: 'O título deve ter entre 3 e 100 caracteres.',
                dados: req.body
            });
        }

        // Validar descrição
        if (
            descricao !== undefined &&
            (typeof descricao !== 'string' || descricao.trim().length > 500)
        ) {
            return res.status(400).render('tarefas/cadastro', {
                erro: 'A descrição deve ter no máximo 500 caracteres.',
                dados: req.body
            });
        }

        // Validar disciplina
        if (
            typeof disciplina !== 'string' ||
            disciplina.trim().length < 2 ||
            disciplina.trim().length > 80
        ) {
            return res.status(400).render('tarefas/cadastro', {
                erro: 'A disciplina deve ter entre 2 e 80 caracteres.',
                dados: req.body
            });
        }



        // Enviar os dados para o Model
        Tarefa.criar({
            titulo: titulo.trim(),
            descricao: descricao ? descricao.trim() : '',
            disciplina: disciplina.trim()
        });

        // Retornar para a página inicial
        return res.redirect('/tarefas');
    }

    // Exibir formulário de edição
    static editarForm(req, res) {

        const { id } = req.params;

        const tarefa = Tarefa.buscarPorId(id);

        if (!tarefa) {
            return res.status(404).send('Tarefa não encontrada!');
        }

        res.render('tarefas/editar', {
            tarefa: tarefa,
            erro: null
        });
    }

    // Atualizar tarefa
    static atualizar(req, res) {

        const { id } = req.params;
        const { titulo, descricao, disciplina } = req.body;

        const tarefa = Tarefa.buscarPorId(id);

        if (!tarefa) {
            return res.status(404).send('Tarefa não encontrada!');
        }

        // Validar título
        if (
            typeof titulo !== 'string' ||
            titulo.trim().length < 3 ||
            titulo.trim().length > 100
        ) {
            return res.status(400).render('tarefas/editar', {
                tarefa: { ...tarefa, ...req.body },
                erro: 'O título deve ter entre 3 e 100 caracteres.'
            });
        }

        // Validar descrição
        if (
            descricao !== undefined &&
            (typeof descricao !== 'string' || descricao.trim().length > 500)
        ) {
            return res.status(400).render('tarefas/editar', {
                tarefa: { ...tarefa, ...req.body },
                erro: 'A descrição deve ter no máximo 500 caracteres.'
            });
        }

        // Validar disciplina
        if (
            typeof disciplina !== 'string' ||
            disciplina.trim().length < 2 ||
            disciplina.trim().length > 80
        ) {
            return res.status(400).render('tarefas/editar', {
                tarefa: { ...tarefa, ...req.body },
                erro: 'A disciplina deve ter entre 2 e 80 caracteres.'
            });
        }

        Tarefa.editar(id, {
            titulo: titulo.trim(),
            descricao: descricao ? descricao.trim() : '',
            disciplina: disciplina.trim()
        });

        return res.redirect('/tarefas');
    }

    static concluir(req, res) {
        const { id } = req.params;

        const tarefa = Tarefa.concluir(id);

        if (!tarefa) {
            return res.status(404).send('Tarefa não encontrada!');
        }

        return res.redirect('/tarefas');
    }

    static excluir(req, res) {
        const { id } = req.params;

        const excluida = Tarefa.excluir(id);

        if (!excluida) {
            return res.status(404).send('Tarefa não encontrada!');
        }

        return res.redirect('/tarefas');
    }


}

module.exports = TarefaController;
