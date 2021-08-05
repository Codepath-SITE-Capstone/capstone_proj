import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import {  Button, withStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      
    },
  },
  input: {
    display: 'none',
  },
}));

export default function UploadButtons() {
  const classes = useStyles();
  const StyledButton = withStyles({
    root:{
        borderRadius:1,
        border: '1px solid black',
    },
})(Button);

  return (
    <div className={classes.root}>
      <input
        accept="image/*"
        className={classes.input}
        style={{display: 'none'}}
        id="contained-button-file"
        multiple
        type="file"
      />
      <label htmlFor="contained-button-file">
        <StyledButton variant="outlined" component="span">
          Upload  <PhotoCamera/>
        </StyledButton>
      </label>
      <input accept="image/*" className={classes.input} id="icon-button-file" type="file" />
    </div>
  );
}