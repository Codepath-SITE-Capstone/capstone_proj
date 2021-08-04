import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { FormControl } from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import "./Login.css"
import { useLoginForm } from "../../hooks/useLoginForm"

function Copyright() {
  return (
    <div className="text" align="center">
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

export default function Login() {
  const classes = useStyles();
  const {form, errors, isProcessing, handleOnChange, handleOnSubmit, showPasswordBox, hide} = useLoginForm()

  return (
    <Container maxWidth="lg" minWidth='600px' style={{ backgroundColor: '#ffffff',height: '100vh' }}>
    <Container component="main" maxWidth="xs" >
      <CssBaseline />
      <div className={classes.paper}>
        <div ><h1 className="text">
          Login
          </h1>
        </div>
        {errors?.form && <span className="error">{errors.form}</span>}
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField className="text"
                variant="outlined"
                required
                fullWidth
                id="email"
                label={<span className="text">Email Address</span> }
                name="email"
                autoComplete="email"
                value={form.email}
                onChange={handleOnChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label={<span className="text">Password</span> }
                type={hide ? "password" : "text" }
                id="password"
                autoComplete="current-password"
                value={form.password}
                onChange={handleOnChange}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel  id="text"
                control={<Checkbox value="showPassword" color="primary" onClick={showPasswordBox} />}
                label={<span className="text">Show Password</span> }
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
              disabled={isProcessing}
            >
             <div component="h1" variant="button" className="text">
            Login
            </div>
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link to="/register" variant="body2" >
                <div className="text">Don't have an account? Register</div>
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
    </Container>
  );
}