import React from 'react'
import {useState,useEffect} from 'react';
import {collection,addDoc,updateDoc,getDocs,getDoc,deleteDoc,doc,query,where} from 'firebase/firestore'
import {db,auth} from '../firebaseConfig'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { Toast } from 'react-bootstrap';
function Home() {
  const [name,setName]=useState("");
  const [phone,setphone]=useState("");
  const [email,setEmail]=useState("");
  const [contacts,setContacts]=useState([]);
  const [editId,setEditId]=useState(null);
  const userId=localStorage.getItem("userId") || auth.currentUser.uid;
  const navigate=useNavigate();
  // console.log(userId);
  async function handlesubmit (e){
        e.preventDefault();
        try{  
          if(editId){
            await updateDoc(doc(db,"contacts",editId),
            {name,
              phonenumber:phone,
              email
            })
            setEditId(null);
            setName("");
          setEmail("");
          setphone("");
          toast("Contact Updated successfully")
          }
          else{
          await addDoc(collection(db,"contacts"),{
            userId:userId,
            name:name,
            email:email,
            phonenumber:phone
          });
          setName("");
          setEmail("");
          setphone("");
          toast("SucessFully contact Added")}
          
        }
          catch(error){
            console.log(error);
          }
  }
  const fetchData=async()=>{
    const data=await query(collection(db,"contacts"),where("userId","==",userId))
    const datasnapshot=await getDocs(data);
    setContacts(datasnapshot.docs.map((item)=>
      ({id:item.id,...item.data()})
    ));
   
  }
  const handleDelete=async(docId)=>{
     await deleteDoc(doc(db,"contacts",docId))
     fetchData();
    
  }
  const handleEdit=async(contact)=>{
        setEditId(contact.id);
        setName(contact.name);
        setEmail(contact.email);
        setphone(contact.phonenumber);
  }
  const handleLogout=()=>{
        localStorage.removeItem("userId");
        auth.signOut();
        navigate("/login");
        toast("LoggedOut sucessfully");

  }
  useEffect(()=>{
    fetchData();
  },[contacts]);
  return (
    <div className="container mt-5">
      <h2 >Hello soumya</h2>
      <button className="btn btn-secondary mb-5" onClick={handleLogout}>Logout</button>
      <form onSubmit={handlesubmit}>
      <div className="container mb-3 " >
        <input type="text" placeholder="Name" className="form-control mb-3" min="2" max="100" onChange={(e)=>{setName(e.target.value)}} required name="name" value={name}></input>
        <input type="tel" placeholder="phoneNumber" className="form-control mb-2" maxLength={10} onChange={(e)=>{setphone(e.target.value)}} required name="phone" value={phone}></input>
        <input type="email" placeholder="email" className="form-control mb-2" onChange={(e)=>{setEmail(e.target.value)}} required name="email" value={email}></input>
        <button className="btn btn-primary" type="submit">
          {editId?"Update Contact":"Add Contact"}</button>
      </div>
      </form>
      <ul className="list-group">
        {contacts?.map((contact)=>{
           return(
          <li className="list-group-item d-flex justify-content-between align-items center" key={contact.id}>
            <p> {" "}
              <b>Name :</b>{contact.name}</p>
            <p>{" "}
              <b>Email :</b>{contact.email}</p>
            <p>{" "}
              <b>Number :</b>{ contact.phonenumber}</p>
            <div>
              <button className="btn btn-warning mx-2" onClick={()=>handleEdit(contact)}>Edit</button>
              <button className="btn btn-danger" onClick={()=>handleDelete(contact.id)}>Delete</button>
            </div>
          </li>
        )})}
      </ul>
    </div>
  )
}

export default Home