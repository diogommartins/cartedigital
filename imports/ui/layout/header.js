/**
 * Created by diogomartins on 4/25/16.
 */
import './header.html';

import '../components/navigation/navigation.js';
import '../slider/slider.js';


Template.layoutHeader.helpers({
    slogans: function(){
        return RotatorySlogans.find();
    }
});

Template.layoutHeader.onCreated(function(){
    Meteor.subscribe('slogans');
});