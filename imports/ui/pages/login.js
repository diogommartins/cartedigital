/**
 * Created by diogomartins on 4/27/16.
 */
import './login.html';


Template.loginArea.helpers({
    
});

Template.loginArea.events({
    'click .loginButton': function(){
        Modal.show('modalLogin');
    },
    'click .logoutButton': function(){
        Meteor.logout();
    }
});


Template.modalLogin.events({
    'click .btn-facebook': function(){
        Meteor.loginWithFacebook({
            requestPermissions: ['user_friends', 'public_profile', 'email']
        }, function(err){
            if(err) {
                console.log("Error loginWithFacebook: ", err);
            }
            else{
                console.log("Logged in");
            }
            Modal.hide();
        });
    }
});