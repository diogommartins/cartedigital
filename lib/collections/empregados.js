/**
 * Created by diogomartins on 4/28/16.
 */
import { Mongo } from 'meteor/mongo';
import { Schemas } from './collections.js';
import { Collections } from './collections.js';

global.Empregados = Collections.Empregados = new Mongo.Collection('empregados');
Schemas.EmpregadosSchema = new SimpleSchema({
    'nome': {
        type: String
    },
    'funcao': {
        type: String,
        allowedValues: ['Chef', 'Garçom', 'Gerente', 'Bartender']
    },
    'foto': {
        type: String,
        autoform: {
            afFieldInput: {
                type: 'cfs-file',
                collection: 'images'
            }
        }
    },
    'descricao': {
        type: String,
        autoform: { rows: 5 }
    },
    'isAtivo': {
        type: Boolean,
        autoValue: function(){
            if (this.isInsert)
                return true;
        }
    },
    'facebook': {
        type: String,
        optional: true
    },
    'twitter': {
        type: String,
        optional: true
    },
    'instagram': {
        type: String,
        optional: true
    }
});
Empregados.attachSchema(Schemas.EmpregadosSchema);


// todo: Deveria ir para api/
if (Meteor.isServer) {
    // This code only runs on the server
    Meteor.publish('empregados', function() {
        return Empregados.find({isAtivo: true});
    });
}