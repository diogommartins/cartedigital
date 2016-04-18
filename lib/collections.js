/**
 * Created by diogomartins on 4/17/16.
 */
Collections = {};
Schemas = {};

Bebidas = Collections.Bebidas = new Mongo.Collection("bebidas");
Schemas.Bebidas = new SimpleSchema({
    'nome': {
        type: String
    },
    'foto': {
        type: String,
        optional: true
    },
    'siteFabricante': {
        type: String,
        optional: true
    },
    'valor': {
        type: Number,
        decimal: true
    }
});

Pratos = Collections.Pratos = new Mongo.Collection("pratos");
Schemas.PratosSchema = new SimpleSchema({
    'nome': {
        type: String
    },
    'foto': {
        type: String,
        optional: true
    },
    'tempoDePreparo': {
        type: Number
    },
    'sugestaoBebida': {
        type: String
    },
    'video': {
        type: String,
        optional: true
    },
    'valor': {
        type: Number,
        decimal: true
    },
    'observacao': {
        type: String
    },
    'tipo': {
        type: String,
        allowedValues: ['Entrada', 'Prato principal', 'Petisco', 'Sobremesa']
    },
    'descricao': {
        type: String
    }
});


Eventos = Collections.Eventos = new Mongo.Collection('eventos');
Schemas.EventosSchema = new SimpleSchema({
    'nome': {
        type: String
    },
    'dataInicio': {
        type: Date
    },
    'dataFim': {
        type: Date
    }
});

Empregados = Collections.Empregados = new Mongo.Collection('empregados');
Schemas.EmpregadosSchema = new SimpleSchema({
    'nome': {
        type: String
    },
    'funcao': {
        type: String,
        allowedValues: ['Cozinheiro', 'Garçom', 'Gerente']
    }

});