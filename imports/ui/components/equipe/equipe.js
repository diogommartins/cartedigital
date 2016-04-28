/**
 * Created by diogomartins on 4/28/16.
 */
import './equipe.html';

var fadeInTypes = ['fadeInLeft', 'fadeInTop', 'fadeInRight'];

Template.equipe.helpers({
   empregados: function(){
       return Empregados.find().map(function(empregado, index, cursor){
           empregado._index = index;
           return empregado;
       });
   }
});

Template.equipe.onCreated(function(){
    Meteor.subscribe('empregados');
});

// Itens

Template.equipeItem.helpers({
    fadeInType: function(){
        return fadeInTypes[this._index % 3];
    }
});
