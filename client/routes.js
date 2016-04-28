/**
 * Created by diogomartins on 4/25/16.
 */
import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

import '../imports/ui/pages/principal.js';
import '../imports/ui/pages/login.js';
let indexRoute = {
    name: 'App.home',
    action: function(params){
        BlazeLayout.render('principal');
    }
};

FlowRouter.route('/', indexRoute);
FlowRouter.route('/index', indexRoute);

FlowRouter.route('/login',{
    name: 'App.login',
    action: function(){
        console.log("Login UI");
        BlazeLayout.render('loginPage');
    }
});

FlowRouter.notFound = {
    action() {
        console.log("Alguma coisaasgasasdasd");
    }
};