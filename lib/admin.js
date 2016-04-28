/**
 * Created by diogomartins on 4/27/16.
 */

global.AdminConfig = {
    name: 'Carte Digital',
    adminEmails: ['magalhaesmartins@icloud.com'],
    collections: {
        Empregados: {
            color: 'yellow',
            icon: 'pencil',
            tableColumns: [
                { label: "Empregado", name: "nome"},
                { label: "Função", name: "funcao"},
                { label: "Foto de perfil", name: "foto"},
                { label: "Funcionario ativo?", name: "isAtivo"}
            ]
        },
        Pratos: {
            icon: 'cutlery',
            tableColumns: [
                { label: "Foto", name: "foto" },
                { label: "Nome", name: "nome" },
                { label: "Preço Und.", name: "valor" },
                { label: "Tipo de prato", name: "tipo" },
                { label: "Tempo de preparo (em minutos)", name: "tempoDePreparo" },
                { label: "Disponibilidade atual", name: "isDisponivel" }
            ]
        },
        Bebidas: {
            icon: 'glass',
            tableColumns: [
                { label: "Foto", name: "foto" },
                { label: "Nome", name: "nome" },
                { label: "Preço Und.", name: "valor" },
                { label: "Identificador único", name: "_id" },
                { label: "Disponibilidade atual", name: "isDisponivel" }
            ]
        },
        Eventos: {
            icon: 'calendar'
        },
        Comentarios: {
            icon: 'comment',
            tableColumns: [
                { label: "Comentário", name: "content"},
                { label: "Estado", name: "status"},
                { label: "Data de criação", name: "createdAt"}
            ]
        },
        RotatorySlogans: {
            icon: 'font',
            label: 'Slogans',
            tableColumns: [
                { label: "Texto", name: "content"},
                { label: "Adicionado em", name: "createdAt"},
                { label: "Ativo?", name: "isActive"}
            ]
        }
    }
};