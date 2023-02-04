import { Link } from '@mui/material'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import React from 'react'

function Allquestions() {
  return (
    <div className='single-questions'>
        <div className='single-question-container'>
            <div className='single-question-left'>
                <div className='options'>
                <div className='voting'>0 votes</div>
                <div className='answer'>1 answered</div>
                <div className='views'>3 views</div>
                </div>
            </div>
            <div className='single-question-middle'>
                <div className='asked-question'><Link>How are u going to depoly this is the question askedhhhhhhhhhhhhhhhhhhhhhhhhhh </Link> </div>
                <div className='question-answer'>
                <div className='given-answer' style={{width:"90%"}}><p>this is the answer </p></div>
                <div className='tags' style={{dispaly:"flex"}}> 
                
                <span className='tag'>react</span>
                </div>
                </div>

            
            <div className='single-question-right'>
                <div className='accountname'> 
                <div className='author-details'>
                    <AccountCircleIcon/>
                    <p>usernameffff</p></div></div>

                    helo00

            </div>
            </div>
            
        </div>
    </div>
  )
}

export default Allquestions