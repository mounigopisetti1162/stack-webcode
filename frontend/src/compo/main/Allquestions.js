import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import React from 'react'
import { Link } from 'react-router-dom';
import parse from 'html-react-parser';
function Allquestions({data}) {
    function truncate(str, n) {
        return str?.length > n ? str.substr(0, n - 1) + "..." : str;
      }
    //   let tags = JSON.parse(data?.tags[0]);
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
                <div className='asked-question'><Link to={`/question view?q=${data?._id}`}>{data.title}</Link> </div>
                <div
            style={{
              maxWidth: "90%",
            }}
          >
            <div>{parse(truncate(data.body, 200))}</div>
          </div>
                {/* <div
            style={{
              display: "flex",
            }}
          >
            {tags.map((_tag,key) => (
              <p key={key}
                style={{
                  margin: "10px 5px",
                  padding: "5px 10px",
                  backgroundColor: "#007cd446",
                  borderRadius: "3px",
                }}
              >
                {_tag}
              </p>
            ))}
          </div> */}
                
            
            <div className='single-question-right'>
                <div className='accountname'> 
                <div className='author-details'>
                    <AccountCircleIcon/>
                    <p>usernameffffd</p></div></div>

                    helo00

            </div>
            </div>
            
        </div>
    </div>
  )
}

export default Allquestions