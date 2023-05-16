import {useFormik} from 'formik'
import { useState } from 'react';
import {Link, useNavigate} from 'react-router-dom'
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage} from "formik";
import {  toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
// import './signup.css'
import './login.css'
// import './Login.css'
import { API } from './global'
export default function Login() {

  const [status,setstatus]=useState('Log in')
  const navigate=useNavigate()

  const validationSchema = Yup.object().shape({
    email: Yup.string().email().required(),
    password: Yup.string().min(3).max(50).required(),
    
  });

  const initialValues = {
    email: "",
    password: "",
  };
  const nav=useNavigate();


const onSubmit=(values)=>{
  // console.log("submited")

  setstatus('loding..') 
  // console.log(values)
  fetch(`${API}/login`,{
    method:'POST',
    body:JSON.stringify(values),
    headers:{"Content-Type":"application/json"},
    
  }).then((data)=>
  {
   

if(data.status===401)
{
  toast("invalid credentials")
  setstatus("error")
throw new Error(data.statusText)

}
else if(data.status===402)
{
  toast("verification needed")
  setstatus("error")
// throw new Error(data.statusText)

}

return data.json();})
.then((data)=>{
  // console.log(data);
// localStorage.setItem('token',data.token);
if(data.message==="logged in sucessfully")
{
//   const id=(data.emailfound._id)
// nav(`/message/${id}`);
console.log("loged")
nav("/")
toast("Logged in sucessfully")
localStorage.setItem('token',data.token);
}
})
.catch((err)=>{
  // console.log(err);
toast("inalid credentials")})
}

const renderError = (message) => <p className="help is-danger">{message}</p>;
  
  return(
  <>
  <div className="sign1">
    
    <div className="signup1">
    
      <div className="signwrapper1">
      <div className='icons'>
<Link to="/">


<img src="stackicon.png" alt='stackover' className='stackicon'/>
</Link>

</div>
<div className="google2">
  <label className="glabel"><img src="google.jpeg" className="gg"></img> Log in with Google </label>
  
</div>
<div className="git2">
  <label className="glabel2"><img src="git.webp" className="gg"></img> Log in with Github </label>
  
</div>

    
 <Formik
    initialValues={initialValues}
    validationSchema={validationSchema}
    onSubmit={values => {
       onSubmit(values);
      // console.log(values)
    }}
  >
    <div className='forms'>
      <Form>
        <div
          className="container1"
          style={{
            width: "60%",
          }}
        >
           <div className="field1">
            <label className="label1" htmlFor="email">
              Email
            </label>
            <div className="control1">
              <Field
                name="email"
                type="text"
                className="input"
               
              />
          
              <ErrorMessage name="email" render={renderError} />
            </div>
          </div>
          <div className="field1">
          <label className="label1" htmlFor="password">
          
<div className='label'>



            <div className='labels'>

  
              Password
</div>
              <div className='forgotpass'>

<Link to='/user/reset-password' className='forgot'>Forgot Password?</Link>
  </div>
  
            </div>
            </label>
            <div className="control1">
              <Field
                name="password"
                type="password"
                className="input"
               
              />
              <ErrorMessage name="password" render={renderError} />
            </div>
          </div>
          
      
          <button type="submit" className="btn btn-primary btns" 
          >
            {status}
          </button>
          <br></br>
       
        <br></br>
        <br></br>
       
        </div>
      </Form>
      <label className='nolabel'>
        Don't have an account?

      <Link to='/signup' className='noaccount'> Sign up</Link>
      </label>
      </div>
      
      </Formik>
      </div>
    </div>
    </div>
        </>
        );
}
