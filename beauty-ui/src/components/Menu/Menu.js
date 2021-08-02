import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import PersonOutlineOutlinedIcon from '@material-ui/icons/PersonOutlineOutlined';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router';

const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    '&:focus': {
      backgroundColor: theme.palette.primary.main,
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);

export default function CustomizedMenus({logoutUser}) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const navigate = useNavigate()

  const handleOnLogout = async ()=>{
      await logoutUser()
      setAnchorEl(null);
      navigate("/")
  }
  return (
    <div>
      <PersonOutlineOutlinedIcon
        aria-controls="customized-menu"
        aria-haspopup="true"
        variant="contained"
        fontSize="large"
        // color="black"
        onClick={handleClick}
      >
      </PersonOutlineOutlinedIcon>
      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <StyledMenuItem onClick={handleClose}><Link to="/profile">Profile</Link></StyledMenuItem>
        <StyledMenuItem onClick={handleClose}><Link to="/points">Points</Link></StyledMenuItem>
        <StyledMenuItem onClick={handleOnLogout}>Logout</StyledMenuItem>
      </StyledMenu>
    </div>
  );
}

