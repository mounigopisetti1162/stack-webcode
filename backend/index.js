import * as dotenv from 'dotenv'
import express from 'express'
import { MongoClient } from 'mongodb'
import cors from 'cors'
import { ObjectId } from 'mongodb';
import userRoutes from './router/user.routes.js'
import bcrypt from 'bcrypt'
import nodemailer from 'nodemailer'
import questionRouter from './router/question.routes.js'

export const app=express()
dotenv.config()
const PORT=process.env.PORT
const MONGO_URL=process.env.MONGO_URL
const client =new MongoClient(MONGO_URL)
await client.connect()
console.log("mongo db")

app.use(express.json())
app.use(cors());


await client.connect()
console.log("monggo connected")



// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT");
//   res.setHeader("Access-Control-Allow-Headers", "Content-Type");
//   next();
// })
// // app.use(cors(corsOptions))
// app.use(express.urlencoded({extended:false}))
// app.set('view engine','ejs')


app.get('/', (req, res, next) => {
  res.json({ message: 'This route is CORS-enabled for an allowed origin.' });
});

app.use('/',userRoutes)
app.use('/',questionRouter)







export async function mail(email,subject,text)
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
   



export async function generatehashedpassword(password){
    const no_of_rounds=10;
    const salt=await bcrypt.genSalt(no_of_rounds)
    const hashedpassword=await bcrypt.hash(password,salt)
    return hashedpassword
}  


app.listen(PORT,()=>console.log(`server ${PORT}`))
export {client}







