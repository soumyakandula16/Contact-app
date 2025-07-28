import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { auth, provider } from '../firebaseConfig';
import { toast } from 'react-toastify';

function Login() {
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const Navigate=useNavigate();
   const login= async(e)=>{
    e.preventDefault();
     try{await signInWithEmailAndPassword(auth,email,password);
    toast("LogedIn Successfully");
    localStorage.setItem("userId",auth.currentUser.uid);
    setEmail("");
    setPassword("");
    Navigate("/");}
    catch(error){
      toast(error.code);
    }
  }
  const google=async(e)=>{
      try{await signInWithPopup(auth,provider);
          localStorage.setItem("userId",auth.currentUser.uid);
        toast("logedIn Successfully");
       Navigate("/");
      }
      catch(error){
        toast(error.code);
      }
  }
  return (
    <>
    <div className="container mt-5">
      <h2>Login</h2>
     <input type ="email" placeholder="email" 
     className="form-control mb-3 w-50" name={email} onChange={(e)=>{setEmail(e.target.value)}}>
     </input>
     <input type="password" placeholder="password" name={password}
     className="form-control mb-3 w-50" onChange={(e)=>{setPassword(e.target.value)}}></input>
     <button className="btn  btn-primary mx-3 " onClick={login}>Login</button>
     <button className="btn btn-danger " onClick={google}>Login with Google</button>
     <p>Don't have an acoount <Link to={"/signup"}>SignUp</Link></p>
    </div>

    </>
  )
}

export default Login