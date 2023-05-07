import  express from "express";
import {  MongoClient } from "mongodb";
import cors from 'cors'
import { ObjectId } from 'mongodb';

import * as dotenv from 'dotenv'
import bcrypt from 'bcrypt'
import jwt  from "jsonwebtoken";
import nodemailer from 'nodemailer'
import { getuser1, addnewuser, getuser, getuserbyid, updatepass, getusertoken, getuserbytoken } from "./router/usersRouter.js";
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
  console.log("first")
    const {firstname,lastname,email,password}=req.body;
    const hashpassword=await generatehashedpassword(password)
      //  db.movies.insertMany(data)
    //  
    // const token=jwt.sign({id:usernamefound._id},process.env.SCRETE_TOKEN)

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

responce.send({message:'we will reset the password'})
 
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
    const {email,password,roleId} = request.body;
    console.log("login")

    const usernamefound=await getuser(email)
    console.log(usernamefound)
  const id=usernamefound._id
  console.log(id)
    if(!usernamefound)
    { 
  responce.send({message:'username not found'})
    }
    else{
        console.log('password')
  const pass=await bcrypt.compare(password,usernamefound.password)
  console.log(pass)
  if(pass)
  {
    // const roleId=usernamefound.roleId
    // console.log(roleId)
    console.log("inside pas")
    const token=jwt.sign({id:usernamefound._id},process.env.SCRETE_TOKEN)
    const update=await getusertoken(id,token)
    console.log(update)
    responce.status(200).send({message:"logged in sucessfully",token:token})
  }
  else{
    console.log("incalin")
    responce.send({message:'invalid credentials'})
  }
  console.log(password)
  // console.log(pass)
    }
  
  });



  app.post('/askquestion/:token',async function(request,responce)
  {
    const {title,body,tags}=request.body;
    const {token}=request.params
    const user=await getuserbytoken(token)
    // const name=user.firstname
    console.log(token)
    // console.log(name)
    const question= await client.db('stack').collection('questions').insertOne({title:title,body:body,tags:tags,name:user.firstname,createdAt: Date.now()})
    console.log("first")
    console.log(question)
    responce.send(question)

  })

  app.get('/askquestion',async function(request,responce)
  {
    const questions= await client.db('stack').collection('questions').find({}).toArray()
    responce.send(questions)

  })

  app.delete('/askquestion/:id',async function(request,responce)
  {
    const {id}=request.params
    const questions= await client.db('stack').collection('questions').deleteOne({ _id: ObjectId(id) })
    responce.send(questions)

  })

  app.get('/askquestion/:id',async function(request,responce)
  {
const {id}=request.params
console.log(id)
const question=await questionid(id)
responce.send(question)
})

app.get('/answer/:id',async function(request,responce)
{
  // const {question_id,answer}=request.body;
  const {id}=request.params
  console.log("answesss")
  const answers= await client.db('stack').collection('answers').find({question_id:id}).toArray()
  // console.log(answers)
  responce.send(answers)
})

app.post('/answer/:id',async function(request,responce)
{
  const {question_id,answer,token}=request.body;
  console.log(answer)
  const name=await getuserbytoken(token)
  console.log(name.name)
  const answers= await client.db('stack').collection('answers').insertOne({question_id:question_id,answer:answer,createdAt:Date.now(),name:name.firstname})
  console.log(answers)
  responce.send(answers)
})

app.post('/comment/:id',async function(request,responce)
{
    const {id}=request.params
  const {question_id,comment,token}=request.body;
  const name=await getuserbytoken(token)
  console.log(name.name)
  const question= await client.db('stack').collection('comments').insertOne({question_id:question_id,comment:comment,createdAt:Date.now(),name:name.firstname})
  console.log(question)
  responce.send(question)
})

app.get('/comment/:id',async function(request,responce)
{
  const {id}=request.params
  console.log(id)
  const comments=await client.db('stack').collection('comments').find({question_id:id}).toArray()
  // console.log("comments")
  // console.log(comments)
  responce.send(comments)
})

app.listen(PORT,()=>console.log(`server ${PORT}`))
export {client}





function questionid(id) {
  return client.db('stack').collection('questions').findOne({ _id: ObjectId(id) });
}

