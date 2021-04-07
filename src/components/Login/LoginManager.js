import React from 'react';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';

export const initializeLoginFramework = () => {
    if(firebase.apps.length ===0 ){
        firebase.initializeApp(firebaseConfig);
    }
}

export const handleGoogleSignIn = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    return firebase.auth()
      .signInWithPopup(provider)
      .then(res => {
        const {displayName, email, photoUrl} = res.user;
        const signedInUser = {
          isSignedIn: true,
          name: displayName,
          email: email,
          photo: photoUrl
        }
        return signedInUser;
      })

      .catch(err => {
      })
  }

export const handleFbSignup = () => {
    var fbProvider = new firebase.auth.FacebookAuthProvider();
    return firebase
    .auth()
    .signInWithPopup(fbProvider)
    .then((res) => {
      var token = res.credential.accessToken;
      var user = res.user; 
      console.log(res)     
    //   return user;
    const signedInUser = {isSignedIn: true}
    return signedInUser;
      
    })
    .catch((error) => {
        console.log(error)
      var errorCode = error.code;
      var errorMessage = error.message;
      const signedInUser = {isSignedIn: false}
    return signedInUser;
    });
  }

export const handleSignOut = () => {
    return firebase.auth().signOut().then(() => {
      const signedInUser = {
        isSignedIn: false,
        name: '',
        email: '',
        photo: ''
      }
      return signedInUser;
    }).catch((error) => {
      // An error happened.
    });
  }

export const createUserWithEmailAndPassword = (name, email, password) => {
    return firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((res) => {
      const newUserInfo = res.user;
      newUserInfo.successMessage = "Successfully Signed in";
      newUserInfo.error = '';
      updateUserInfo(name);
      return newUserInfo;
    })
    .catch((error) => {
      const newUserInfo = {};
      newUserInfo.error = error.message;
      newUserInfo.successMessage = '';
      return newUserInfo;
    });
}

export const signInWithEmailAndPassword = (email, password) => {
    return firebase.auth().signInWithEmailAndPassword(email, password)
    .then(res => {
      const newUserInfo = res.user;
      newUserInfo.successMessage = "Successfully Logged in";
      newUserInfo.error = '';
      return newUserInfo;
    })
    .catch((error) => {
      const newUserInfo = {};
      newUserInfo.error = error.message;
      newUserInfo.successMessage = '';
      return newUserInfo;
    });
}

const updateUserInfo = (name) => {
    const user = firebase.auth().currentUser;
    user.updateProfile({
      displayName: name,
    }).then(function() {
      console.log("name updated succesfully")
    }).catch(function(error) {
      console.log(error)
    });
  }