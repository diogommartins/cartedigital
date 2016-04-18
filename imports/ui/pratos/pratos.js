/**
 * Created by diogomartins on 4/17/16.
 */
Template.pratos.helpers({
    produtos: function(){
        return Pratos.find();
    }
});