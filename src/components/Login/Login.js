import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { useContext, useState } from 'react';
import { UserContext } from "../../App";
import { useHistory, useLocation } from "react-router";

firebase.initializeApp(firebaseConfig);

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
 }

function Login() {
  const [newUser, setNewUser] = useState(false);
  const [user, setUser] = useState({
    isSignedIn: false,
    name: '',
    email: '',
    password: '',
    photo: '',
    error: '',
    successMessage: ''
  });
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  let history = useHistory();
  let location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };

  const provider = new firebase.auth.GoogleAuthProvider();
  
  const handleSignIn = () => {
    firebase.auth()
      .signInWithPopup(provider)
      .then(res => {
        const {displayName, email, photoUrl} = res.user;
        const signedInUser = {
          isSignedIn: true,
          name: displayName,
          email: email,
          photo: photoUrl
        }
        setUser(signedInUser);
      })

      .catch(err => {
      })
  }
  var fbProvider = new firebase.auth.FacebookAuthProvider();
  const handleFbSignup = () => {
    firebase
    .auth()
    .signInWithPopup(fbProvider)
    .then((result) => {
      console.log(result)
      /** @type {firebase.auth.OAuthCredential} */
      var credential = result.credential;

      // The signed-in user info.
      var user = result.user;

      // This gives you a Facebook Access Token. You can use it to access the Facebook API.
      var accessToken = credential.accessToken;

      // ...
    })
    .catch((error) => {
      console.log(error)
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;

      // ...
    });
  }

const handleSignOut = () => {
  firebase.auth().signOut().then(() => {
    const signedInUser = {
      isSignedIn: false,
      name: '',
      email: '',
      photo: ''
    }
    setUser(signedInUser);
  }).catch((error) => {
    // An error happened.
  });
}

const handleChange = (e) => {
  let isFormValid = true;
  if(e.target.name === 'email'){
    isFormValid = /\S+@\S+\.\S+/.test(e.target.value);
  }
  if(e.target.name === 'password'){
    isFormValid = e.target.value.length > 6;
  }
  if(isFormValid) {
    const newUserInfo = {...user};
    newUserInfo[e.target.name] = e.target.value;
    setUser(newUserInfo);
  }
}

const handleSubmit = (e) => {
  if(newUser && user.email && user.password){
    firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
    .then((userCredential) => {
      // Signed in 
      // var user = userCredential.user;
      // ...
      const newUserInfo = {...user};
      newUserInfo.successMessage = "Successfully Signed in";
      newUserInfo.error = '';
      setUser(newUserInfo);
      updateUserInfo(user.name);
    })
    .catch((error) => {
      // ..
      const newUserInfo = {...user};
      newUserInfo.error = error.message;
      newUserInfo.successMessage = '';
      setUser(newUserInfo);
    });
  }
  if(!newUser && user.email && user.password){
    firebase.auth().signInWithEmailAndPassword(user.email, user.password)
    .then((userCredential) => {
      // Signed in
      console.log(userCredential)
      // ...
      const newUserInfo = {...user};
      newUserInfo.successMessage = "Successfully Logged in";
      newUserInfo.error = '';
      setUser(newUserInfo);
      setLoggedInUser(newUserInfo);
      history.replace(from);
    })
    .catch((error) => {
      const newUserInfo = {...user};
      newUserInfo.error = error.message;
      newUserInfo.successMessage = '';
      setUser(newUserInfo);
    });
  }
  e.preventDefault();
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

  return (
    <div style={{textAlign:'center'}}>
      {
        user.isSignedIn ? <button onClick={handleSignOut}>Sign out</button> :
        <button onClick={handleSignIn}>Sign in</button>
      } <br/>
      <button onClick={handleFbSignup}>Facebook Signup</button>
      {
        user.isSignedIn && <p>Welcome, {user.name}</p>
      }


      <form action="" onSubmit={handleSubmit}>
        <h1>Our own authentication</h1>  
        <input type="checkbox" name="" id="" onChange={() => setNewUser(!newUser)} /> 
        <label htmlFor="">NewUser</label> <br/>
        {newUser && <input type="text" name="name" placeholder="Name" onBlur={handleChange} /> } <br/>   
        <input type="text" name="email" placeholder="Email" required onBlur={handleChange} /> <br/>
        <input type="password" name="password" id="" placeholder="Password" onBlur={handleChange} required /> <br/>
        <input type="submit" value={newUser ? "Sign up" : "Login"}/><br/>
        <p style={{color:'red'}}>{user.error}</p>
        <p style={{color:'green'}}>{user.successMessage}</p>
      </form>
    </div>
  );
}

export default Login;
