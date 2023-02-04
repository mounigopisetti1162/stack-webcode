import SearchIcon from '@mui/icons-material/Search';
import TextField from '@mui/material/TextField';
import HorizontalSplitIcon from '@mui/icons-material/HorizontalSplit';
import Button from '@mui/material/Button';
import { IconButton } from '@mui/material';
import * as React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import { Link, useNavigate } from 'react-router-dom';

export default function Header()
{
    const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const nav=useNavigate()
    return(
        <header>
        <div className="header-bar">
        <div className="three_lines">
        <React.Fragment>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        
        
        <Tooltip title="Account settings">
            
            <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
<HorizontalSplitIcon color="action" fontSize='large' />
</IconButton>
</Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={handleClose}>
          <Avatar /> Profile
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Avatar /> My account
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <PersonAdd fontSize="small" />
          </ListItemIcon>
          Add another account
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </React.Fragment>
            </div>
            <div className="stack_icon">
                <Link to ='/'>
                <img src="stack.png" alt='stackover' className='stack'/>
                </Link>
            </div>
            <div className="about">
                About
            </div>
            <div className="products">
                Products
            </div>
            <div className="for_team">
                For Team
            </div>
            <div className="search_bar">
                
            <SearchIcon color="action" />  
            <input  placeholder="Search..."  className='search' /> 

            </div>
            <div className="login">
            <Button variant="outlined" onClick={()=>{nav('/login')}}>Log in</Button>
            </div>
            <div className="sign_up">
            <Button variant="contained" onClick={()=>{nav('/signup')}}>Sign up</Button>
            </div>
        
        
        </div>
        </header>
    )
}