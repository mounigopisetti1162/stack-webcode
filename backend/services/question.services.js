import { ObjectId } from 'mongodb';
import { client } from '../index.js';

export function postaskquestion(title, body, tags, user) {
  return client.db('stack').collection('questions').insertOne({ title: title, body: body, tags: tags, name: user.firstname, createdAt: Date.now() });
}
export function getquestions() {
  return client.db('stack').collection('questions').find({}).toArray();
}
export function deletequestion(id) {
  return client.db('stack').collection('questions').deleteOne({ _id: ObjectId(id) });
}
export function getanswer(id) {
  return client.db('stack').collection('answers').find({ question_id: id }).toArray();
}
export function postanswer(question_id, answer, name) {
  return client.db('stack').collection('answers').insertOne({ question_id: question_id, answer: answer, createdAt: Date.now(), name: name.firstname });
}
export function postcomment(question_id, comment, name) {
  return client.db('stack').collection('comments').insertOne({ question_id: question_id, comment: comment, createdAt: Date.now(), name: name.firstname });
}
export function commentid(id) {
  return client.db('stack').collection('comments').find({ question_id: id }).toArray();
}

export function questionid(id) {
  return client.db('stack').collection('questions').findOne({ _id: ObjectId(id) });
}