import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Box, withStyles } from '@material-ui/core';
import apiClient from '../../services/apiClient';
import UploadButtons from './Upload';
import './Textarea.css'

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

export default function StateTextFields( {handleOnSubmit, form, setForm}) {
  const classes = useStyles();
 
  const [text, setText] = useState("");
  const handleChange = (event) => {
    setText((f) => ({ ...f, [event.target.name]: event.target.value }))
  };
  const handlePicBtn = async ()=>{
    const {data, error} = await apiClient.addPic({
      profile_pic: text.profile_pic
    })
    window.location.reload(false)
  }
  const StyledButton = withStyles({
    root:{
        borderRadius:1,
        border: '1px solid black',
    },
})(Button);
  
  return (
    <form className={classes.root} noValidate autoComplete="off">
      <div>
        <TextField
        name="profile_pic"
          id="outlined-name"
          label="Url"
          value={text.profile_pic}
          onChange={handleChange}
          variant="outlined"
        />
        
      </div>
      <div className="buttons">
        <div className="submit">
        <UploadButtons />
      </div>
      <StyledButton onClick={handlePicBtn} >Submit</StyledButton>
      </div>
    </form>
  )
}