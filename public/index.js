import Framework7 from 'framework7/framework7.esm.bundle';
import Dom7 from 'dom7';
import firebase from 'firebase/app';
import 'firebase/auth';
import app from "./my-app.js";
import "./grocery.js";

var firebaseConfig = {
    apiKey: "AIzaSyDaXvJde8g4_qZ7jN_9DB2dQmrH0o-ipLw",
    authDomain: "shoppinglist-fe37f.firebaseapp.com",
    databaseURL: "https://shoppinglist-fe37f.firebaseio.com",
    projectId: "shoppinglist-fe37f",
    storageBucket: "shoppinglist-fe37f.appspot.com",
    messagingSenderId: "403026864226",
    appId: "1:403026864226:web:fdb3b54298e16cb6d2c93b",
    measurementId: "G-K6D65ZLPTL"
  };
  

firebase.initializeApp(firebaseConfig);
const $$ = Dom7;
var provider = new firebase.auth.GoogleAuthProvider();
var db = firebase.database();
var ref = db.ref("/items");
var mainView = app.views.create('.view-main');


firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        app.tab.show("#tab2", true);
        console.log(user);
    } else {
        app.tab.show("#tab1", true);
        console.log("logged out");
    }
});

$$("#googleLogIn").on("click", (evt) => {
    firebase.auth().signInWithPopup(provider).then(function(result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        // ...
      }).then(() => {
        app.loginScreen.close(".loginYes", true);
        $$("#tab1").show();
        $$("#tab2").show();
      }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
      }); 
});

$$("#loginForm").on("submit", (evt) => {
    evt.preventDefault();
    var formData = app.form.convertToData('#loginForm');
    firebase.auth().signInWithEmailAndPassword(formData.username, formData.password).then(
        () => {
            // could save extra info in a profile here I think.
            app.loginScreen.close(".loginYes", true);
            $$("#tab1").show();
            $$("#tab2").show();
        }
    ).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        $$("#signInError").html(errorCode + " error " + errorMessage)
        console.log(errorCode + " error " + errorMessage);
        // ...
    });
         
});

$$("#signUpForm").on("submit", (evt) => {
    evt.preventDefault();
    var formData = app.form.convertToData('#signUpForm');
    //alert("clicked Sign Up: " + JSON.stringify(formData));
    firebase.auth().createUserWithEmailAndPassword(formData.username, formData.password).then(
        () => {
            // could save extra info in a profile here I think.
            app.loginScreen.close(".signupYes", true);
            $$("#tab1").show();
            $$("#tab2").show();
        }
    ).catch((error) => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        $$("#signUpError").html(errorCode + " error " + errorMessage)
        console.log(errorCode + " error " + errorMessage);
        // ...
    });

});

$$("#logout").on("click", () => {
    firebase.auth().signOut().then(() => {
        // Sign-out successful.
        $$("#tab2").hide();
    }).catch(() => {
        // An error happened.
    });
});
