import { getuserbytoken } from "../services/users.Services.js";
import { postaskquestion, getquestions, deletequestion, questionid, getanswer, postanswer, postcomment, commentid } from '../services/question.services.js';
import express from 'express'
const router2=express.Router()

router2.post('/askquestion/:token', async function (request, responce) {
  const { title, body, tags } = request.body;
  const { token } = request.params;
  const user = await getuserbytoken(token);
  // const name=user.firstname
  console.log(token);
  // console.log(name)
  const question = await postaskquestion(title, body, tags, user);
  console.log("first");
  console.log(question);
  responce.send(question);

});
router2.get('/questions', async function (request, responce) {
  console.log("hellothis is t");
  const questions = await getquestions();
  responce.send(questions);

});
router2.delete('/askquestion/:id', async function (request, responce) {
  const { id } = request.params;
  const questions = await deletequestion(id);
  responce.send(questions);

});
router2.get('/askquestion/:id', async function (request, responce) {
  const { id } = request.params;
  console.log(id);
  const question = await questionid(id);
  responce.send(question);
});
router2.get('/answer/:id', async function (request, responce) {
  // const {question_id,answer}=request.body;
  const { id } = request.params;
  console.log("answesss");
  const answers = await getanswer(id);
  // console.log(answers)
  responce.send(answers);
});
router2.post('/answer/:id', async function (request, responce) {
  const { question_id, answer, token } = request.body;
  console.log(answer);
  const name = await getuserbytoken(token);
  console.log(name.name);
  const answers = await postanswer(question_id, answer, name);
  console.log(answers);
  responce.send(answers);
});
router2.post('/comment/:id', async function (request, responce) {
  const { id } = request.params;
  const { question_id, comment, token } = request.body;
  const name = await getuserbytoken(token);
  console.log(name.name);
  const question = await postcomment(question_id, comment, name);
  console.log(question);
  responce.send(question);
});
router2.get('/comment/:id', async function (request, responce) {
  const { id } = request.params;
  console.log(id);
  const comments = await commentid(id);
  // console.log("comments")
  // console.log(comments)
  responce.send(comments);
});


export default router2;


