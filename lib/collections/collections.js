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
    },
    'tipo': {
        type: String,
        allowedValues: ['Alcoólica', 'Não-alcoolica']
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
        type: String,
        autoform: {
            options: function(){
                return _.map(Bebidas.find().fetch(), function(bebida) {
                    return {
                        label: bebida.nome,
                        value: bebida._id
                    };
                });
            }
        }
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
    },
    'foto': {
        type: String,
        autoform: {
            afFieldInput: {
                type: 'cfs-file',
                collection: 'images'
            }
        }
    }
});
Empregados.attachSchema(Schemas.EmpregadosSchema);




global.Images = new FS.Collection("images", {
    stores: [new FS.Store.FileSystem("images", {path: "~/uploads"})]
});

