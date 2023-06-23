import React, { useEffect, useState } from 'react'
import Main from './main2'
import Sidebar from './Sidebar'
import { API } from '../login/global';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './page.css'
import Right from './right';
function Page() {
  const [questions, setquestions] = useState([]);
const token=useParams()
  useEffect(() => {
    async function getQuestion() {
      await axios.get(`${API}/questions`).then((res) => {
        // console.log(res)
        setquestions(res.data.reverse());
        // console.log(res.data)
      });
    }
    getQuestion();
  }, []);
  return (
    <div className='stack-page'>
     

      
        <div className='stackcontent'>
          

            <Sidebar/>
            <Main questions={questions}/>         
       <Right/>
            </div>
    </div>
  )
}

export default Page