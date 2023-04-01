import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import React from 'react'
import { Link } from 'react-router-dom';
import parse from 'html-react-parser';
function Allquestions({data}) {
    function truncate(str, n) {
        return str?.length > n ? str.substr(0, n - 1) + "..." : str;
      }
      let tags = data.tags[0];
      console.log(data)

  return (
    <div className='single-questions'>
        <div className='single-question-container'>
            <div className='single-question-left'>
                <div className='options'>
                <div className='voting'>0 <span>votes</span></div>
                <div className="all-option">
              <p>{data?.answerDetails?.length}</p>
              <span>answers</span>
            </div>
                <div className='answer'>1 answered</div>
                <div className='views'>3 views</div>
                </div>
            </div>
            <div className='single-question-middle'>
                <div className='asked-question'><Link to={`/questionview/${data?._id}`}>{data.title}</Link> </div>
                <div
            style={{
              maxWidth: "90%",
            }}
          >
            <div>{parse(truncate(data.body, 200))}</div>
          </div>
        
        <div className='tags'>{data.tags.map((e)=><div>{e}</div>)}
        </div> 
         
              
              
                
            
            <div className='single-question-right'>
                <div className='accountname'> 
                <div className='author-details'>
                    <AccountCircleIcon/>
                    <p>{data.name}</p></div></div>

                

            </div>
            </div>
            
        </div>
    </div>
  )
}

export default Allquestions