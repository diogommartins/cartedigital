/**
 * Created by diogomartins on 4/28/16.
 */
import { Schemas } from './collections.js';
import { Collections } from './collections.js';

global.Comentarios = Collections.Comentarios = new Mongo.Collection('comentarios');
Schemas.ComentariosSchema = new SimpleSchema({
    'owner':{
        type: String,
        regEx: SimpleSchema.RegEx.Id,
        autoValue: function() {
            if (this.isInsert) {
                return Meteor.userId();
            }
        },
        autoform: {
            options: function() {
                return _.map(Meteor.users.find().fetch(), function(user) {
                    return {
                        label: user.emails[0].address,
                        value: user._id
                    };
                });
            }
        }
    },
    'content': {
        type: String,
        autoform: { rows: 5 }
    },
    'createdAt':{
        type: Date,
        autoValue: function(){
            if (this.isInsert){
                return new Date();
            }
        }
    },
    'updatedAt':{
        type: Date,
        optional: true,
        autoValue: function(){
            if (this.isUpdate){
                return new Date();
            }
        }
    },
    'status': {
        type: String,
        allowedValues: ['Aprovado', 'Aguardando avaliação', 'Reprovado'],
        autoValue: function() {
            if (this.isInsert)
                return 'Aguardando avaliação'
        }
    }
});
Comentarios.attachSchema(Schemas.ComentariosSchema);

Comentarios.helpers({
    isAprovado: function(){
        return this.status === 'Aprovado'
    },
    autor: function(){
        return "John Doe";
    }
});

// todo: Deveria ir para api/
if (Meteor.isServer) {
    // This code only runs on the server
    Meteor.publish('comentariosAprovados', function() {
        return Comentarios.find({status: 'Aprovado'});
    });
}