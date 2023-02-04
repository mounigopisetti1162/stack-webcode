import * as dotenv from 'dotenv'
import express from 'express'
import { MongoClient } from 'mongodb'
import cors from 'cors'
import mobileRouter from './route/mobile.route.js'
import userRouter from './route/user.route.js'

export const app=express()
dotenv.config()
const PORT=process.env.PORT
const MONGO_URL=process.env.MONGO_URL
const client =new MongoClient(MONGO_URL)
await client.connect()
console.log("mongo db")

app.use(express.json())
app.use(cors());
app.get('/',function(request,responce)
{
    responce.send("this is the stack overflow page")
})
// app.use('/mobile',mobileRouter)
// app.use('/user',userRouter)


app.listen(PORT,()=>console.log(`the server is connected to server ${PORT}`))
export {client}

// export async function postmobiles(data) {
//   return await client.db("test").collection("mobile").insertMany(data)
// }


// export async function getmobiles() {
//   return await client.db("test").collection("mobile").find({}).toArray()
// }
