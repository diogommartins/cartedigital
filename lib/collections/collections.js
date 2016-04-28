/**
 * Created by diogomartins on 4/17/16.
 */
import { Mongo } from 'meteor/mongo';

export const Collections = {};
export const Schemas = {};


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




global.Images = Collections.Images = new FS.Collection("images", {
    stores: [
        new FS.Store.FileSystem("images"),
        new FS.Store.FileSystem("thumbs", {
            transformWrite: function(fileObj, readStream, writeStream) {
                var size;
                if (gm.isAvailable) {
                    size = {
                        width: 100,
                        height: 100
                    };
                    return gm(readStream, fileObj.name()).autoOrient().resize(size.width + "^>", size.height + "^>").gravity("Center").extent(size.width, size.height).stream().pipe(writeStream);
                } else {
                    return readStream.pipe(writeStream);
                }
            }
        })
    ],
    filter: {
        allow: {
            contentTypes: ['image/*']
        }
    }
});

Images.allow({
    insert: function(userId, fileObj){
        console.log('insert', arguments);
        return true;
    },
    update: function(userId, fileObj) {
        console.log('update', arguments);
        return !!userId;
    },
    remove: function(userId, fileObj) {
        return !!userId;
    },
    download: function(userId, fileObj, shareId) {
        console.log('download', arguments);
        return true;
    },
    fetch: []
});

//
// Meteor.publish('images', function(){
//     return Images.find();
// });
