import { ErrorMessage, Field, Form, Formik } from "formik";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import * as Yup from "yup";
import { signuppost } from "../axios/axios";
// import { signuppost } from "../chatting/axios/axios";
import Resizer from "./Resizer";
import './signup.css';
const Signup = () => {

  const [status,setstatus]=useState('Sign Up')
  const navigate=useNavigate()
  const [iteam,setiteam]=useState()
// validations of the form
  const validationSchema = Yup.object().shape({
    displayname: Yup.string().required("name is mandatary"),
    email: Yup.string().email().required(),
    
    password: Yup.string().min(3).max(50).required(),
 
    profile: Yup
      .string()
      .min(10),
  });
//intial values
const [image,setimage]=useState({myfile:""})

  const initialValues = {

   displayname:"",
   
    email: "",
    password: "",
   
    profile:''

  };


 



const handelfileupload= async (e)=>{

  try {
    const file = e.target.files[0];
    const image = resizeFile(file);
    image.then((data)=>data).then(data=>setimage({myfile:data}))
  
  } catch (err) {
    
  }
}



const resizeFile = (file) =>
  new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      300,
      300,
      "JPEG",
      100,
      0,
      (uri) => {
        resolve(uri);
      },
      "base64"
    );
  });
  const onSubmit = (values) => {

   
      setstatus('loding..') 
    
      const data={  displayname:values.displayname,email:values.email,password:values.password,profile:image
      }
      // console.log(data)
      //axios calling
      signuppost(data).then((datas)=>
      {
        console.log(datas)
    if(datas.status===401)
    {
      toast("email alredy exists")
      setstatus("error")
    throw new Error(datas.statusText)
    }
    setstatus("submited");
    navigate("/login")
   
    toast("verify- Mail has been sent")    
      })
    .catch((err)=>{
      toast("Email alredy exist")
      setstatus("error")
    })
    }
 
    const renderError = (message) => <p className="help is-danger">{message}</p>;


  return (
    <>
    {/* <h1>sign up page</h1> */}
    <div className="sign">
    <div className="signup">
    
      <div className="signwrapper">
        <div className="signupcontent">
      <label className="signupcontent2">  Create your Stack Overflow account. It's free and only takes a minute.
      </label> </div>
<div className="google">
  <label className="glabel"><img src="google.jpeg" className="gg"></img> Sign up with Google </label>
  
</div>
<div className="git">
  <label className="glabel2"><img src="git.webp" className="gg"></img> Log in with Github </label>
  
</div>
      <div className="signup-2">
      <Formik
    initialValues={initialValues}
    validationSchema={validationSchema}
    onSubmit={values => {
       onSubmit(values);
      // console.log(values)
    }}>

    <div className="form3">
      <Form className="form-0">
        <div
          className="container"
          style={{
            width: "100%",
          }}
        >
<div className="form-1">
  <div className="form-2">
          <div className="field">
            <label className="label" htmlFor="displayname">
              Display Name
            </label>
            <div className="control">
              <Field
                name="displayname"
                type="text"
                className="input"
               
               
              />
              <ErrorMessage name="displayname" render={renderError} />
            </div>
          </div>
          

          <div className="field">
            <label className="label" htmlFor="email">
              Email Address
            </label>
            <div className="control">
              <Field
                name="email"
                type="text"
                className="input"
               
              />
              <ErrorMessage name="email" render={renderError} />
            </div>
          </div>
      

          <div className="field">
            <label className="label" htmlFor="password">
              Password
            </label>
            <div className="control">
              <Field
                name="password"
                type="password"
                className="input"
               
              />
              <ErrorMessage name="password" render={renderError} />
          
            </div>
            <label className="passwordlabel">
              Passwords must contain at least eight characters, including at least 1 letter and 1 number.

              </label>
          </div>


        

          <div className="field">
            <label className="label" htmlFor="confrimpassword">
             Profile Picture
            </label>
            <div className="control">
                  <input
             name="profile"
             type="file"
            //  type="text"
             className="input-file"
             id='file-upload'
             accept=".jpeg,.png,.jpg"
             placeholder="profile"
             onChange={(e)=>handelfileupload(e)}/>
                   
              <ErrorMessage name="profile" render={renderError} />
            </div>
          </div>
          


          <button type="submit" className="btn btn-primary submit">
           {status}
          </button>
<br></br>
<label className="passwordlabel">
By clicking “Sign up”, you agree to our terms of service, privacy policy and cookie policy
</label>
 </div>
</div>
        </div>
      </Form>
      </div>
     

      </Formik>
      </div>
       <label className="account">Alredy had an account? <Link to='/login' className="login">log in</Link></label>
    </div>
    </div>
    </div>
      </>
  )
};

export default Signup;



