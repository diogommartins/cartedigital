/**
 * Created by diogomartins on 4/28/16.
 */
import { Mongo } from 'meteor/mongo';
import { Schemas } from './collections.js';
import { Collections } from './collections.js';

global.RotatorySlogans = Collections.RotatorySlogans = new Mongo.Collection('slogans');
Schemas.RotatorySlogansSchema = new SimpleSchema({
    'content': {
        type: String
    },
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
    'isActive':{
        type: Boolean,
        autoValue: function(){
            if (this.isInsert)
                return true;
        }
    }
});
RotatorySlogans.attachSchema(Schemas.RotatorySlogansSchema);

// todo: Deveria ir para api/
if (Meteor.isServer) {
    // This code only runs on the server
    Meteor.publish('slogans', function() {
        return RotatorySlogans.find({isActive: true});
    });
}
