/**
 * Created by diogomartins on 4/28/16.
 */
import { Mongo } from 'meteor/mongo';
import { Schemas } from './collections.js';
import { Collections } from './collections.js';

var numeral = require('numeral');

global.Bebidas = Collections.Bebidas = new Mongo.Collection("bebidas");
Schemas.BebidasSchema = new SimpleSchema({
    'nome': {
        type: String
    },
    'foto': {
        type: String,
        optional: true,
        autoform: {
            afFieldInput: {
                type: 'cfs-file',
                collection: 'images'
            }
        }
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
    },
    'isDisponivel': {
        type: Boolean,
        label: 'Está disponível?',
        autoValue: function(){
            if (this.isInsert)
                return true;
        }
    },
    'descricao': {
        type: String,
        optional: true,
        autoform: {
            rows: 5
        }
    }
});
Bebidas.attachSchema(Schemas.BebidasSchema);

Bebidas.helpers({
    preco: function(){
        return numeral(this.valor).format('$0,0.00');
    }
});

// Pratos

global.Pratos = Collections.Pratos = new Mongo.Collection("pratos");
Schemas.PratosSchema = new SimpleSchema({
    'nome': {
        type: String
    },
    'foto': {
        type: String,
        optional: true,
        autoform: {
            afFieldInput: {
                type: 'cfs-file',
                collection: 'images'
            }
        }
    },
    'tempoDePreparo': {
        type: Number
    },
    'sugestaoBebida': {
        type: String,
        optional: true,
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
        type: String,
        optional: true,
        autoform: {
            rows: 5
        }
    },
    'tipo': {
        type: String,
        allowedValues: ['Entrada', 'Prato principal', 'Petisco', 'Sobremesa']
    },
    'descricao': {
        type: String,
        autoform:{
            rows: 5
        }
    },
    'isDisponivel': {
        type: Boolean,
        label: "Está disponível?",
        autoValue: function(){
            if (this.isInsert)
                return true;
        }
    },
    'isSpecial': {
        type: Boolean,
        label: "Destacar preço?",
        autoValue: function () {
            if (this.isInsert)
                return false;
        }
    }
});
Pratos.attachSchema(Schemas.PratosSchema);

Pratos.helpers({
    mockImage: function(){
        return "http://lorempixel.com/640/480/food/";
    },
    preco: function(){
        return numeral(this.valor).format('$0,0.00');
    },
    imageURL: function(){
        return "http://lorempixel.com/80/80/food/";
    }
});


// todo: Deveria ir para api/
if (Meteor.isServer) {
    // This code only runs on the server
    Meteor.publish('pratosDisponiveis', function() {
        return Pratos.find({isDisponivel: true});
    });
    Meteor.publish('bebidasDisponiveis', function(){
        return Bebidas.find({isDisponivel: true});
    })
}