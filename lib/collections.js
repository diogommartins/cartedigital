/**
 * Created by diogomartins on 4/17/16.
 */
import { Mongo } from 'meteor/mongo';

export const Collections = {};
export const Schemas = {};

global.Bebidas = Collections.Bebidas = new Mongo.Collection("bebidas");
Schemas.BebidasSchema = new SimpleSchema({
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
Bebidas.attachSchema(Schemas.BebidasSchema);

global.Pratos = Collections.Pratos = new Mongo.Collection("pratos");
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
Pratos.attachSchema(Schemas.PratosSchema);

Pratos.helpers({
    mockImage: function(){
        return "http://lorempixel.com/640/480/food/";
    }
});

global.Eventos = Collections.Eventos = new Mongo.Collection('eventos');
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
Eventos.attachSchema(Schemas.EventosSchema);

global.Empregados = Collections.Empregados = new Mongo.Collection('empregados');
Schemas.EmpregadosSchema = new SimpleSchema({
    'nome': {
        type: String
    },
    'funcao': {
        type: String,
        allowedValues: ['Cozinheiro', 'Garçom', 'Gerente']
    }

});
Empregados.attachSchema(Schemas.EmpregadosSchema);