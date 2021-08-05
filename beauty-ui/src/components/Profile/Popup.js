import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import StateTextFields from './TextArea';
import { useModalForm } from '../../hooks/useModalForm'; 
import { Button, Box, withStyles } from '@material-ui/core';
import "./Profile.css"
function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '3px solid #2EC4B6',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function SimpleModal() {
  const StyledButton = withStyles({
    root:{
        borderRadius:1,
        border: '1px solid black',
    },
})(Button);
  const classes = useStyles();
  const {handleOnChange, handleOnSubmit, errors, isProcessing, form, setForm} = useModalForm()
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <h2 id="simple-modal-title">Please Enter Image Url or Upload an Image</h2>
      <StateTextFields handleOnSubmit={handleOnSubmit} form={form} setForm={setForm}/>
    </div>
  );

  return (
    <div>
      <StyledButton type="button" onClick={handleOpen}>
        Add Profile Picture
      </StyledButton>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
}