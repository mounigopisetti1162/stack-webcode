import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import parse from 'html-react-parser';
import './allquestions.css'
import { getans } from '../axios/axios';
function Allquestions({data}) {
    function truncate(str, n) {
        return str?.length > n ? str.substr(0, n - 1) + "..." : str;
      }
      // let tags = data.tags[0];
      console.log(data._id)
      const [answers,setanswers]=useState([])
      useEffect(()=>{

        getans(data._id).then((res)=>{
          setanswers(res.data)
          console.log(res)

        })
      },[data])

  return (
    <div className='single-questions'>
        <div className='single-question-container'>
            <div className='single-question-left'>
                <div className='options'>
                <div className='voting'><span> 0 votes</span></div>
                <div className="all-option">
              <p></p>
              {/* <span>answers</span> */}
            </div>
                <div className='answer'>{answers.length} answered </div>
                <div className='views'> 3 views</div>
                </div>
            </div>
            <div className='single-question-middle'>
                <div className='asked-question'><Link to={`/questionview/${data?._id}`}>{data.title}</Link> </div>
                {/* <div
            style={{
              maxWidth: "90%",
            }}
          > */}
            {/* <div className='body'>{parse(truncate(data.body, 200))}</div> */}
          {/* </div> */}
        
        <div className='tags'>{data.tags.map((e)=><div>{e}</div>)}
        </div> 

                <div className='accountname'> 
                <div className='author-details'>
                    <AccountCircleIcon/>
                    <span>{data.name}</span></div></div>

                

            </div>
            
        </div>
    </div>
  )
}

export default Allquestions