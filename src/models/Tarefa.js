const { randomUUID } = require('crypto');

// Array que armazenará as tarefas em memória
let tarefas = [];

class Tarefa {

    // Cadastrar uma nova tarefa
    static criar(dados) {

        const novaTarefa = {
            id: randomUUID(),
            titulo: dados.titulo,
            descricao: dados.descricao || '',
            disciplina: dados.disciplina,
            status: 'pendente'
        };

        tarefas.push(novaTarefa);

        return novaTarefa;
    }

    // Listar todas as tarefas
    static listar() {
        return tarefas;
    }

    // Consultar tarefa pelo ID
    static buscarPorId(id) {
        return tarefas.find(tarefa => tarefa.id === id);
    }

    // Editar uma tarefa
    static editar(id, dados) {

        const tarefa = this.buscarPorId(id);

        if (!tarefa) {
            return null;
        }

        tarefa.titulo = dados.titulo;
        tarefa.descricao = dados.descricao || '';
        tarefa.disciplina = dados.disciplina;

        return tarefa;
    }

    // Concluir uma tarefa
    static concluir(id) {

        const tarefa = this.buscarPorId(id);

        if (!tarefa) {
            return null;
        }

        tarefa.status = 'concluida';

        return tarefa;
    }

    // Excluir uma tarefa
    static excluir(id) {

        const indice = tarefas.findIndex(
            tarefa => tarefa.id === id
        );

        if (indice === -1) {
            return false;
        }

        tarefas.splice(indice, 1);

        return true;
    }

    // Filtrar tarefas por status
    static filtrar(status) {

        if (status === 'todas') {
            return tarefas;
        }

        return tarefas.filter(
            tarefa => tarefa.status === status
        );
    }
}

module.exports = Tarefa;
