import {useFormik} from "formik";
import { API } from "./global";
import './login.css'
export default function Form()
{
    const {values,handleChange,handleSubmit}=useFormik({
initialValues:{
    username:'',
    password:''
},
onSubmit:(values)=>{
    fetch(`${API}/reset-password`,{
    method:"POST",
    body:JSON.stringify(values),
    headers:{"Content-type":"application/json"},
}).then((data)=> data.json()).then((data)=>{
        console.log(data)
    })
console.log(values)
}

    })
    return(
        <>
        <h1>
            forgot password</h1>
            <form onSubmit={handleSubmit}>
   

            <input name='username' value={values.username} onChange={handleChange} type='text' placeholder='username'/>

            <input  name="password" value={values.password} onChange={handleChange} placeholder='enter new password'/>
        <button onSubmit={handleSubmit}>submit</button>
            
            </form>
            </>
    )
}