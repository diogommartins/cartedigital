/**
 * Created by diogomartins on 4/27/16.
 */

global.AdminConfig = {
    name: 'Carte Digital',
    adminEmails: ['magalhaesmartins@icloud.com'],
    collections: {
        Empregados: {
            color: 'red',
            icon: 'pencil',
            tableColumns: [
                { label: "Empregado", name: "nome"},
                { label: "Função", name: "funcao"}
            ]
        },
        Pratos: {},
        Bebidas: {},
        Eventos: {}
    }
};