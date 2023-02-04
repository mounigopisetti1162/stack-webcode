import React from 'react'
import AnchorIcon from '@mui/icons-material/Anchor';
import { Button } from '@mui/material';
import './ask.css'
function Askquestion() {
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
          <div className='g-content'>
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
        <div className='title-box'>
          <div className='title-b'>
            <h5>Title</h5>
          </div>
          <div className='title-tag'>
            <p>Be specific and imagine you're asking a question to another person.</p>
          </div>
          <div className='title-input'>
            <input className='title-input' placeholder='e.g. Is there an R function for finding the index of an element in a vector'/>
            <Button variant="contained" className='next'>Next</Button>
          </div>



        </div>


      </div>
    </div>
  )
}

export default Askquestion