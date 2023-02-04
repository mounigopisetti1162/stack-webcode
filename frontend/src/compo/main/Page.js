import React from 'react'
import Main from './main'
import Sidebar from './Sidebar'

function Page() {
  return (
    <div className='stack-page'>
        <div className='stack-content'>
            <Sidebar/>
            <Main/>
        </div>
    </div>
  )
}

export default Page