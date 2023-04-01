import { ObjectId } from "mongodb";
import { client } from "../index.js";

export async function addnewuser(firstname, lastname, email, hashpassword) {
    return await client.db('stack').collection('user').insertOne({ firstname: firstname, lastname: lastname, email: email, password: hashpassword, });
}
export async function getuser(email) {
    return await client.db('stack').collection('user').findOne({ email: email });
}
export async function getuser1() {
    return await client.db('stack').collection('user').find({}).toArray();
}
export async function getuserbyid(id) {
    return await client.db('stack').collection('user').findOne({ _id: ObjectId(id) }).toArray();
}
export async function getusertoken(id,token) {
    return await client.db('stack').collection('user').updateOne({ _id: ObjectId(id) }, { $set: {token: token } })
}
export async function getuserbytoken(token) {
    return await client.db('stack').collection('user').findOne( {token: token })
}


export async function updatepass(id, newpass) {
    console.log('password updTE');
    return client.db('stack').collection('user').updateOne({ _id: ObjectId(id) }, { $set: { password: newpass, verfication: 'changed' } });
    // 
}
