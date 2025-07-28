import { createUserWithEmailAndPassword } from 'firebase/auth';
import React from 'react'
import {useState} from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { auth } from '../firebaseConfig';
import { toast } from 'react-toastify';

function Signup() {
   const [email,setEmail]=useState("");
     const [password,setPassword]=useState("");
     const Navigate=useNavigate();
    async function signup(e){
         e.preventDefault();
         try{
           const res=await createUserWithEmailAndPassword(auth,email,password);
           toast("Account Created");
           Navigate('/login');
           setEmail("");
           setPassword("");
           console.log(res);
         }
         catch(error){
          console.log(error);
          toast(error.code)
         }
     }
  return (
    <>
    <div className="container mt-5">
      <h2>SignUp</h2>
     <input type ="email" placeholder="email" 
     className="form-control mb-3 w-50" name={email}
     onChange={(e)=>{setEmail(e.target.value)}}>
     </input>
     <input type="password" placeholder="password" name={password}
     className="form-control mb-3 w-50" onChange={(e)=>{setPassword(e.target.value)}}></input>
     <button className="btn  btn-primary" onClick={signup}>SignUP</button>
     {/* <button className="btn btn-danger ">Login with Google</button> */}
     <p>Already have an acoount <Link to={"/login"}>Login</Link></p>
    </div>

    </>
  )
}

export default Signup