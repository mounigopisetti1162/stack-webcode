import React, { useEffect, useState } from 'react'
import Main from './main2'
import Sidebar from './Sidebar'
import { API } from '../login/global';
import axios from 'axios';

function Page() {
  const [questions, setquestions] = useState([]);

  useEffect(() => {
    async function getQuestion() {
      await axios.get(`${API}/askquestion`).then((res) => {
        setquestions(res.data.reverse());
        // console.log(res.data)
      });
    }
    getQuestion();
  }, []);
  return (
    <div className='stack-page'>
        <div className='stack-content'>
            <Sidebar/>
            <Main questions={questions}/>
        </div>
    </div>
  )
}

export default Page