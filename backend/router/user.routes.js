import { getuser1, addnewuser,getuser,getusertoken, getuserbytoken , getuserbyid, updatepass } from "../services/users.Services.js";
import express from 'express'
import { generatehashedpassword,mail } from "../index.js";

import jwt from "jsonwebtoken";


import bcrypt from 'bcrypt';
import {  } from "../services/users.Services.js";


const router1=express.Router()

router1.get('/user', async function (request, responce) {
  const user = await getuser1();
  responce.send(user);
});
router1.post('/user', async function (req, res) {
  console.log("first");
  const { displayname, email, password, profile } = req.body;
  const hashpassword = await generatehashedpassword(password);
  //  db.movies.insertMany(data)
  //  
  const userfound = await getuser(email);
  if (!userfound) {
    const newuser = await addnewuser(displayname, email, hashpassword, profile);
    // const token=jwt.sign({id:newuser._id},process.env.SCRETE_TOKEN)
    console.log(newuser);
    res.send(newuser);
  }
  else {
    res.status(401).send({ message: "user alredy exisy" });
  }
});

router1.post('/forgot_pass', async function (request, responce) {
  const { username } = request.body;
  const userfound = await getuser(username);
  console.log(userfound);
  if (!userfound) {
    responce.send({ message: 'this user is not found' });
  }
  else {
    console.log("found");
    const token = jwt.sign({ id: userfound._id }, process.env.SCRETE, { expiresIn: '15m' });
    const link = `${process.env.BASE_URL}/reset-password/${userfound._id}/${token}`;
    await mail(userfound.username, 'verification mail', link);
    console.log(link);
    responce.send("password rest link ui ssent to mail");
  }
  // responce.send(user)
});
router1.get('/reset-password', async function (request, responce) {
  // const {id,token}=request.params;
  const useridfound = await getuserbyid(id);
  if (!useridfound) {
    responce.send({ message: "this link is not for valid person" });
  }
  else {

    responce.send({ message: 'we will reset the password' });

  }
});
router1.post('/reset-password', async function (request, responce) {
  const { username, password } = request.body;
  const usernamefound = await getuser(username);
  console.log(usernamefound);
  if (usernamefound) {

    const newpass = await generatehashedpassword(password);
    const newpassword = await updatepass(usernamefound._id, newpass);
    console.log(newpass);
    responce.send(newpassword);
    console.log(newpassword);
  }


});



router1.get('/log/:token', async function (req, res) {
  const { token } = req.params;
  console.log("hello");
  const usernamefound = await getuserbytoken(token);
  // console.log(usernamefound)
  res.send(usernamefound);
});
router1.post('/login', async function (request, responce) {
  const { email, password, roleId } = request.body;
  console.log("login");

  const usernamefound = await getuser(email);
  console.log(usernamefound);
  // const id=usernamefound.id
  // console.log(id)
  if (!usernamefound) {
    responce.status(404).send({ message: 'username not found' });
  }
  else {
    console.log('password');
    const pass = await bcrypt.compare(password, usernamefound.password);
    console.log(pass);
    if (pass) {
      // const roleId=usernamefound.roleId
      // console.log(roleId)
      console.log("inside pas");
      const token = jwt.sign({ id: usernamefound._id }, process.env.SCRETE_TOKEN);
      const update = await getusertoken(usernamefound._id, token);
      console.log(update);
      responce.status(200).send({ message: "logged in sucessfully", token: token, found: usernamefound });
    }
    else {
      console.log("incalin");
      responce.status(401).send({ message: 'invalid credentials' });
    }
    console.log(password);
    // console.log(pass)
  }

});

export default router1;
