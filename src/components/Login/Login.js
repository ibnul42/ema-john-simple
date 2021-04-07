import { useContext, useState } from 'react';
import { UserContext } from "../../App";
import { useHistory, useLocation } from "react-router";
import { createUserWithEmailAndPassword, handleFbSignup, handleGoogleSignIn, handleSignOut, initializeLoginFramework, signInWithEmailAndPassword } from './LoginManager';

initializeLoginFramework();

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

  const googleSignIn = () => {
    handleGoogleSignIn()
    .then(res => {
      setUser(res);
      setLoggedInUser(res);
      history.replace(from);
    })
  }
const fbSignup = () => {
  handleFbSignup()
  .then(res => {      
    setUser(res);
    setLoggedInUser(res);
    history.replace(from);
  })
}

  const signOut = () => {
    handleSignOut()
    .then(res => {      
      setUser(res);
      setLoggedInUser(res);
    })
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
    createUserWithEmailAndPassword(user.name, user.email, user.password)
    .then(res => {
      setUser(res);
      setLoggedInUser(res);
      history.replace(from);
    })
  }
  if(!newUser && user.email && user.password){
    signInWithEmailAndPassword(user.email, user.password)
    .then(res => {
      setUser(res);
      setLoggedInUser(res);
      history.replace(from);
    })
  }
  e.preventDefault();
}



  return (
    <div style={{textAlign:'center'}}>
      {
        user.isSignedIn ? <button onClick={signOut}>Sign out</button> :
        <button onClick={googleSignIn}>Sign in</button>
      } <br/>
      <button onClick={fbSignup}>Facebook Signup</button>
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
