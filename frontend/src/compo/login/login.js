import {useFormik} from 'formik'
import { useState } from 'react';
import {useNavigate} from 'react-router-dom'
// import './login.css'

import { API } from './global'
export default function Login() {

  const [status,setstatus]=useState('submit')
  const nav=useNavigate();
  const {values,handleChange,handleSubmit}=useFormik({
initialValues:{
    email:'',
  password:''
  
},
onSubmit:(values)=>{
    setstatus('loding..') 
    console.log(values)
    fetch(`${API}/login`,{
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
  <div className='login'>
  <div className="container-md container2"><h2>login Page</h2>
  <div className='cont2'>
    <div className="row justify-content-center">
    <div className="col-sm-6 col1">
    <p>Stack Login</p>
    <form className="login-form" onSubmit={handleSubmit}>
    <div className="input-group mb-3">
  <div className="input-group-text">
  <span >Mail</span>
    
  </div>
  <input
            type="text"
            name="email"
            className="form-control"
            value={values.email}
            onChange={handleChange}
            
          />
</div>
<div className="input-group mb-3">
  <div className="input-group-text">
  <span >Password</span>
    
  </div>
  <input
            type="text"
            name="password"
            className="form-control"
            value={values.password}
            onChange={handleChange}
            
          />
</div>
      {/* <input name='username' value={values.username} onChange={handleChange} type='text' placeholder='username'>
        </input>
        <input name='password' value={values.password} onChange={handleChange} type='text' placeholder='password'>
        </input>
         */}
        <button onSubmit={handleSubmit} type=" " className="btn btn-primary">{status}</button>
        </form>
        </div>
       < div className="col-sm-6 col2">
        <div className='anothepage'>
            <div class name='signuppage'>
                <div className='signupbutton'>
                <button onClick={()=>{nav("/signup")}} className="btn btn-primary" >signup</button><br></br>
                </div>
            </div>
        </div>
        </div>
        </div>
        </div>
        </div>
        </div>
        </>
        );
}
