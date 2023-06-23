import React from 'react'
import { Button,Link } from '@mui/material'
import Allquestions from './Allquestions'
import { useNavigate } from 'react-router-dom'
import './main2.css'
function Main({questions}) {
    const nav=useNavigate()
    const question=()=>{
        const token=localStorage.getItem('token')
        token?nav("/askquestion"):nav('/login')
    }
  return (
    <>
    <div className='main-container'>
        <div className='main-components'>
            <div className='top-main'>
            <h1 className="flex--item fl1 fs-headline1 mb0 tesxt">
Top Questions          </h1>
            <button variant="contained" onClick={question} id='btnclg'>Ask Question</button>
        </div>
        <div className='main-filter'>
          
            <div className='main-tabs'>
                <div className='main-tab'>

               
            <div className='relevance'>
                <Link >Interesting</Link>
            </div>
            <div className='newest'>
                <Link>Week</Link>
            </div>
            <div className='More'>
                <Link>Month</Link>
            </div>
        </div>
        <hr></hr>
        <hr></hr>
        </div>
    </div>
            <hr></hr>
    <div className="questions" id='questions'>
          {questions?.map((_q,key) => (
            <div className="question" key={key}>
              <Allquestions data={_q} />
            </div>
          ))}
        </div>

    
    </div>
    </div>
    </>
    
  )
}

export default Main