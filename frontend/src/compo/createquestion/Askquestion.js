import React, { useState } from 'react'
import AnchorIcon from '@mui/icons-material/Anchor';
import { Button } from '@mui/material';
import { useFormik } from 'formik';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import Editor from "react-quill";
import './ask.css'
import { API } from '../login/global';
import axios from 'axios';
import {TagsInput} from 'react-tag-input-component'
import { useNavigate } from 'react-router-dom';
function Askquestion() {

  var toolbarOptions = [
    ["bold", "italic", "underline", "strike"], 
    ["blockquote", "code-block"],

    [{ header: 1 }, { header: 2 }], 
    [{ list: "ordered" }, { list: "bullet" }],
    [{ script: "sub" }, { script: "super" }], 
    [{ indent: "-1" }, { indent: "+1" }],
    [{ direction: "rtl" }], 

    [{ size: ["small", false, "large", "huge"] }], 
    [{ header: [1, 2, 3, 4, 5, 6, false] }],

    [{ color: [] }, { background: [] }], 
    [{ font: [] }],
    [{ align: [] }],

    ["clean"], 
  ];
  Editor.modules = {
    syntax: false,
    toolbar: toolbarOptions,
    clipboard: {
      matchVisual: false,
    },
  };
  
  Editor.formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "video",
  ];
  var intial=[]
  const nav=useNavigate()
  const [title,settitle]=useState("")
  const [body,setbody]=useState("")
  const [tags, settags] = useState(intial);
  const token=localStorage.getItem('token')
  console.log(token)
const handelbody=(value)=>{
  setbody(value)
}
const handleSubmit=async(e)=>{
e.preventDefault()
if((title.length)>0 && (body.length)>0)
{
  const bodyJSON={
    title:title,
    body:body,
    tags:tags,
    

  }
  console.log(bodyJSON)
  await axios.post(`${API}/askquestion/${token}`,bodyJSON).then((res)=>{
    alert("question added");
    nav("/")
  })
}


}  
console.log(tags)
  return (
    <div className='askquestion-page'>
      <div className='page-container'>
        <div className='title'>
        <h1>Ask a public question</h1>
        </div>
        <div className='write'>
        <div className='writting'>
          <div className='w-heading'>
            <p>Writing a good question</p>
            </div>
            <div className='w-body'>
            You're ready to ask a programming-related question and this form will help guide you through the process.
<br/>
Looking to ask a non-programming question? See the topics here to find a relevant site.
            </div>
            <div className='w-body2'>
              <div className='w-b-heading'>
              <p>Steps</p>
              </div>
              <div className='body-list'>
                <ul>
                <li> Summarize your problem in a one-line title.</li>
                <li> Describe your problem in more detail.</li>
                <li> Describe what you tried and what you expected to happen</li>
                <li> Add “tags” which help surface your question to members of the community.</li>
                <li> Review your question and post it to the site.</li>
                </ul>
              </div>
            </div>
        </div>
        </div>
        <div className='good'>
        <div className='good-title'>
          <div className='g-title'>
            <p>Writing a good title</p>
          </div>
          <div className='gcontent'>
            <div className='pen'>
            <AnchorIcon fontSize='large'/> </div>
            <div className='notes'>
            <p>Your title should summarize the problem. 
            </p>
<p>You might find that you have a better idea of your title after writing out the rest of the question.
</p>
            </div>
          </div>
        </div>
        </div>
        <div className='titlebox'>
          <div className='titlebe'>
          <div className='titleb'>
            <h5>Title</h5>
          </div>
          <div className='titletag'>
            <p>Be specific and imagine you're asking a question to another person.</p>
          </div>
          <div className=' col-4 titleinput2'>
            <input className='titleinput' name="titleinput" value={title} onChange={(e)=>settitle(e.target.value)}  placeholder='e.g. Is there an R function for finding the index of an element in a vector' />
            <Button variant="contained" className='next' >Next</Button>
          </div>
          </div>
        </div>
        
        <div classsName='bodyvalue'>
          <div className='body-side'>
          <div className='g-title'>
            <h5>What are the details of your problem?</h5>
            <h6>Introduce the problem and expand on what you put in the title. Minimum 20 characters.</h6>
            </div>
            <ReactQuill modules={Editor.modules}
                  className="react-quill" onChange={handelbody} name="body" value={body} theme='snow'/>
            
            
</div>
            </div>
            <div className='tagq'>
            <div className='tagsq'>
            <h5>Tags</h5>
            <h6>Add up to 5 tags to describe what your question is about. Start typing to see suggestions.</h6>
            <TagsInput  value={tags} 
        onChange={settags} placeHolder='press enter to add tags'/>
        <Button variant="contained" className='primary' onClick={handleSubmit}>Add ur question</Button>
        </div>
            </div>
      </div>
    </div>
  )
}

export default Askquestion