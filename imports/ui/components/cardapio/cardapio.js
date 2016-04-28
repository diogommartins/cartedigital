/**
 * Created by diogomartins on 4/25/16.
 */
import './cardapio.html';

Template.cardapio.helpers({
    entradas: function(){
        return Pratos.find({tipo: 'Entrada', isDisponivel: true})
    },
    pratosPrincipais: function(){
        return Pratos.find({tipo: 'Prato principal', isDisponivel: true})
    },
    bebidas: function(){
        return Bebidas.find({isDisponivel: true});
    },
    sobremesas: function(){
        return Pratos.find({tipo: 'Sobremesa'});
    }
});

Template.cardapio.onCreated(function(){
    Meteor.subscribe('pratosDisponiveis');
    Meteor.subscribe('bebidasDisponiveis');
});

Template.cardapioItem.helpers({
    teste: function(){
        return "";
    }
});

Template.cardapioItem.onRendered(function(){
    console.log('rendering', this);
});