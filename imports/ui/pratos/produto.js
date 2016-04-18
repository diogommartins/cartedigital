/**
 * Created by diogomartins on 4/17/16.
 */
Template.produto.helpers({
    isPromocao: function(){
        return false;
    }
});

Template.produto.events({
    'click .hungry-menu-item-header': function(event, template){
        alert("mostrar detalhes da receita");
    }
});