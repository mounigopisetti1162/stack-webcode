import React from 'react'
import PublicIcon from '@mui/icons-material/Public';
import { Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';
function Sidebar() {
  const nav=useNavigate()
  return (
    <div className='sidebar'>
        <div className='components'>
            <div className='home'>
                <Link onClick={()=>{nav('/')}}>Home</Link>
                
            </div>
            <div className='PUBLIC'>
            PUBLIC
            </div>
            <div className='questions'>
              <PublicIcon/>  <Link onClick={()=>{nav('/')}}>questions</Link>
            </div>
            <div className='Tags'>
            <Link>Tags</Link>
            </div>
            <div className='Users'>
            <Link>Users</Link>
            </div>
            <div className='Companies'>
            <Link>Companies</Link>
            </div>
        </div>
    </div>
  )
}

export default Sidebar