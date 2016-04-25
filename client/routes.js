/**
 * Created by diogomartins on 4/25/16.
 */
import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

import '../imports/ui/pages/principal.js';

FlowRouter.route('/', {
    name: 'App.home',
    action: function(params){
        console.log("Entrando na página principal. Params: ", params);
        BlazeLayout.render('principal');
    }
});

FlowRouter.notFound = {
    action() {
        console.log("Alguma coisaasgasasdasd");
    }
};