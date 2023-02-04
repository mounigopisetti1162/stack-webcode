import {useFormik} from 'formik'
import { useState } from 'react';
import {useNavigate} from 'react-router-dom'
import './login.css'

import { API } from './global'
export default function Login() {

  const [status,setstatus]=useState('submit')
  const nav=useNavigate();
  const {values,handleChange,handleSubmit}=useFormik({
initialValues:{
  username:'mounika',
  
},
onSubmit:(values)=>{
    setstatus('loding..') 
    console.log(values)
    fetch(`${API}/user/login`,{
      method:'POST',
      body:JSON.stringify(values),
      headers:{"Content-Type":"application/json"},
      
    }).then((data)=>
    {
  if(data.status===401)
  {
    setstatus("error")
  throw new Error(data.statusText)
  
  }
  setstatus("submited");
  return data.json();}).then((data)=>{console.log(data);
  localStorage.setItem('token',data.token);
  nav('/')})
  }
  })
  return(
  <>
  <div className="container-md container1"><h2>login Page</h2>
    <div className="row justify-content-center">
    <div className="col-sm-6 col1">
    <h1>stack login</h1>
    <form className="login-form" onSubmit={handleSubmit}>
      <input name='username' value={values.username} onChange={handleChange} type='text' placeholder='username'>
        </input>
        <input name='password' value={values.password} onChange={handleChange} type='text' placeholder='password'>
        </input>
        
        <button onSubmit={handleSubmit} type=" " >{status}</button>
        </form>
        </div>
        </div>
        </div>
        </>
        );
}
