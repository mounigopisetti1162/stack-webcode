import React from 'react'
import Sidebar from '../main/Sidebar'
import MainQuestion from './MainQuestion'

function Index() {
  return (
    <div className='stack-page'>
        <div className='stack-content'>
            <Sidebar/>
            <MainQuestion/>
        </div>
    </div>
  )
}

export default Index