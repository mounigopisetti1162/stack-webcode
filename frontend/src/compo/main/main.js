import React from 'react'
import { Button,Link } from '@mui/material'
import Allquestions from './Allquestions'
import { useNavigate } from 'react-router-dom'

function Main() {
    const nav=useNavigate()
    const question=()=>{
        const token=localStorage.getItem('token')
        token?nav("/"):nav('/login')
    }
  return (
    <>
    <div className='main-container'>
        <div className='main-components'>
            <div className='top-main'>
            <h1 class="flex--item fl1 fs-headline1 mb0">
Search Results            </h1>
            <Link className='advanced'>Advanced Search Tips</Link>
            <Button variant="contained" onClick={question}>Ask Question</Button>
        </div>
        <div className='main-filter'>
            <p>All questions</p>
            <div className='main-tabs'>
                <div className='main-tab'>

               
            <div className='relevance'>
                <Link>Relevance</Link>
            </div>
            <div className='newest'>
                <Link>Newest</Link>
            </div>
            <div className='More'>
                <Link>More</Link>
            </div>
        </div>
        <hr></hr>
        </div>
    </div>
    <div className='questions'>
        <div className='question'>
            <Allquestions/>
            <Allquestions/>
            <Allquestions/>
            <Allquestions/>
            <Allquestions/>
            <Allquestions/>

        </div>

    </div>
    </div>
    </div>
    </>
    
  )
}

export default Main