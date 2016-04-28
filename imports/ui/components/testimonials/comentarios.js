/**
 * Created by diogomartins on 4/18/16.
 */
import './comentarios.html';

Template.comentarios.helpers({
   lastComentarios: function(){
       // todo: Falta implementar limitação de quantidade e orderby
       return Comentarios.find().map(function(comentario, index, cursor){
           comentario._index = index;
           return comentario;
       });
   } 
});

Template.comentarios.onCreated(function(){
    Meteor.subscribe('comentariosAprovados');
});

Template.comentario.helpers({
   alignLeft: function(){
       return (this._index % 2) === 0;
   }
});