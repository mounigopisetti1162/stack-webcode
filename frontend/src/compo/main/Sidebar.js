import React from 'react'
import PublicIcon from '@mui/icons-material/Public';
import { Link } from '@mui/material';
function Sidebar() {
  return (
    <div className='sidebar'>
        <div className='components'>
            <div className='home'>
                <Link>Home</Link>
                
            </div>
            <div className='PUBLIC'>
            <Link>PUBLIC</Link>
            </div>
            <div className='questions'>
              <PublicIcon/>  <Link>questions</Link>
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