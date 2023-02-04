import  express, { text } from "express";
import {  MongoClient, ObjectId } from "mongodb";
import cors from 'cors'
import * as dotenv from 'dotenv'
import bcrypt from 'bcrypt'
import jwt  from "jsonwebtoken";
import nodemailer from 'nodemailer'
export const app=express()
dotenv.config()
const PORT=process.env.PORT||4000
const MONGO_URL=process.env.MONGO_URL
const client=new MongoClient(MONGO_URL)
await client.connect()
console.log("monggo connected")

app.use(express.json())
app.use(cors())
app.use(express.urlencoded({extended:false}))
app.set('view engine','ejs')

async function mail(email,subject,text)
{
    try {
let mailtransporter=nodemailer.createTransport({
    host:process.env.HOST,
    service:process.env.SERVICE,
    port:Number(process.env.EMAIL_PORT),
    secure:Boolean(process.env.SECURE),
    
        auth:{
            user:process.env.USER,
            pass:process.env.PASS
        }
    })
    await mailtransporter.sendMail({
        from:process.env.USER,
        to:email,
        subject:subject,
        text:text
    })
    console.log("email sent sucessfully")
    } catch (error) {
        console.log("the mail is not sent",error)
    }
}
   



async function generatehashedpassword(password){
    const no_of_rounds=10;
    const salt=await bcrypt.genSalt(no_of_rounds)
    const hashedpassword=await bcrypt.hash(password,salt)
    return hashedpassword
}  
app.get('/',function(request,responce)
{
    responce.send("this is the password page")
})
app.get('/user',async function(request,responce)
{
    const user=await getuser1()
    responce.send(user)
})

app.post('/user',async function(req,res)
{
    const {firstname,lastname,email,password}=req.body;
    const hashpassword=await generatehashedpassword(password)
      //  db.movies.insertMany(data)
    //  
    const newuser = await addnewuser(firstname,lastname,email,hashpassword)
    console.log(newuser)
      res.send(newuser)
})


app.post('/forgot_pass',async function(request,responce)
{
    const {username}=request.body
    const userfound=await getuser(username)
    console.log(userfound)
    if(!userfound)
    {
        responce.send({message:'this user is not found'})
    }
    else{
        console.log("found")
        const token=jwt.sign({id:userfound._id},process.env.SCRETE,{expiresIn:'15m'})
        const link=`${process.env.BASE_URL}/reset-password/${userfound._id}/${token}`
        await mail(userfound.username,'verification mail',link)
        console.log(link)
        responce.send("password rest link ui ssent to mail") 
    }
    // responce.send(user)
})

app.get('/reset-password',async function(request,responce)
{
    // const {id,token}=request.params;
    const useridfound=await getuserbyid(id)
    if(!useridfound)
    {
        responce.send({message:"this link is not for valid person"})
    }
    else{

responce.send({message:'we will reset the password',token:token})
 
    }
})

app.post('/reset-password',async function(request,responce)
{
    const {username,password}=request.body
    const usernamefound=await getuser(username)
    console.log(usernamefound)
    if(usernamefound)
    {

        const newpass=await generatehashedpassword(password)
        const newpassword=await updatepass(usernamefound._id,newpass)
        console.log(newpass)
        responce.send(newpassword)
        console.log(newpassword)
    }


})
app.post('/login', async function (request, responce) {
    const {username,password,roleId} = request.body;
    const usernamefound=await getuser(username)
    console.log(usernamefound)
  
    if(!usernamefound)
    {
  responce.send({message:'username not found'})
    }
    else{
  const pass=await bcrypt.compare(password,usernamefound.password)
  if(pass)
  {
    const roleId=usernamefound.roleId
    console.log(roleId)
    const token=jwt.sign({id:usernamefound._id},process.env.SCRETE_TOKEN)
    responce.status(200).send({message:"logged in sucessfully",token:token})
  }
  else{
    responce.send({message:'invalid credentials'})
  }
  console.log(password)
  console.log(pass)
    }
  
  });

app.listen(PORT,()=>console.log(`server ${PORT}`))
export {client}




async function addnewuser(firstname,lastname,email,hashpassword) {
    return await client.db('password_page').collection('user').insertOne({ firstname:firstname,lastname:lastname,email: email, password: hashpassword, });
}

async function getuser(username) {
    return await client.db('stack').collection('user').findOne({ username: username });
}
async function getuser1() {
    return await client.db('stack').collection('user').find({ }).toArray();
}
async function getuserbyid(id) {
    return await client.db('stack').collection('user').findOne({_id:ObjectId(id)}).toArray();
}
async function updatepass(id,newpass) {
    console.log('password updTE')
    return client.db('stack').collection('user').updateOne({_id:ObjectId(id)},{$set:{password:newpass,verfication:'changed'}});
    // 
}

