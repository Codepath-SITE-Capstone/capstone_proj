import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import apiClient from "../../services/apiClient"

import "../Login/Login.css"
function Copyright() {
  return (
    <div variant="body2" color="textSecondary" align="center" className="text">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
      Hīrā
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

//prop; data passed between components. 
// open closed bracket inside settings call to reference a prop

export default function Settings({user}) {
  console.log("invoke")
  const [isProcessing, setIsProcessing] = useState(false)
  const [errors, setErrors] = useState({})
  // const [userSettings, setUserSettings] = useState({}); 
  const classes= useStyles();
  const handleOnChange = e =>{
    console.log(e.target.name)
    console.log(e.target.value)
    const newData = {
      ...userSettings,
      [e.target.name]: e.target.value
    }
    setUserSettings(newData)
  }
  useEffect(()=>{
    setUserSettings(user)
  }, [user])

  const [password, setPassword] = useState({})

  const [userSettings, setUserSettings] = useState({
    first_name: "",
    last_name: "",
    email: "",
    age:"",
    zip_code:"",
    password: ""
  })

  const updatePassword = (event) => {
    setPassword({
      ...password,
      [event.target.name]: event.target.value
    })
  }

  const [hide, show] = useState(true)
  const showPasswordBox = () =>{
    show(hide ? false : true)
}


  const handleOnSubmit = async (e) => {
    e.preventDefault()
    setIsProcessing(true)
    setErrors((e) => ({ ...e, form: null }))

    const { data, error } = await apiClient.updateUser({
      age: userSettings.age,
      zip_code: userSettings.zip_code,
      first_name: userSettings.first_name,
      last_name: userSettings.last_name,
      email: userSettings.email,
    })
  }
  
  return (
    <Container component="main" maxWidth="xs" style={{ backgroundColor: '#ffffff',height: '100vh' }} >
      <CssBaseline />
      <div className={classes.paper}>
        <h1 className="text">
          Update User Info
        </h1>
        
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="first_name"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label={<span className="text">First Name</span> }
                autoFocus
                value={userSettings.first_name}
                onChange={handleOnChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="lname"
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label={<span className="text">Last Name</span> }
                name="last_name"
                value={userSettings.last_name}
                onChange={handleOnChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="email"
                variant="outlined"
                required
                fullWidth
                id="email"
                label={<span className="text">Email</span> }
                name="email"
                value={userSettings.email}
                onChange={handleOnChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="age"
                name="age"
                variant="outlined"
                required
                fullWidth
                id="age"
                label={<span className="text">Age</span> }
                value={userSettings.age}
                onChange={handleOnChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="zipCode"
                label={<span className="text">Zip Code</span> }
                name="zip_code"
                autoComplete="zip"
                value={userSettings.zip_code}
                onChange={handleOnChange}
              />
            </Grid>
            </Grid>
          <Button
            type="submit"
            fullWidth
            color="primary"
            variant="contained"
            className={classes.submit}
            onClick={handleOnSubmit}
          >
            <div component="h1" variant="button" className="text">
            Save Updates
            </div>
          </Button>
        </form>
      </div>
      
      {/* Update PassWord Section */}
      {/* <Box> */}
        {/* <div className={classes.paper}>
        <h1 className="text">
          Update Password
        </h1>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                name="current password"
                variant="outlined"
                required
                fullWidth
                id="currPass"
                label={<span className="text">Current Password</span> }
                value={userSettings.email}
                onChange={handleOnChange}
              />
              <TextField
                name="New Password"
                variant="outlined"
                required
                fullWidth
                id="currPass"
                label={<span className="text">New Password</span> }
                value={userSettings.email}
                onChange={handleOnChange}
              />
            </Grid>
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel onClick={showPasswordBox}
                control={<Checkbox value="showPassword" color="primary" />}
                label={<span className="text">Show Password</span> }
              />
            </Grid>
          <Button
            type="submit"
            fullWidth
            color="primary"
            variant="contained"
            className={classes.submit}
            onClick={handleOnSubmit}
          >
            <div component="h1" variant="button" className="text">
            Confirm Password
            </div>
          </Button>
        </form>
      </div>
      </Box> */}
      
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
   
    
  )
}