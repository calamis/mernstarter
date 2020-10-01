import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import fetch from 'isomorphic-unfetch'
import { makeStyles } from '@material-ui/core/styles'
import CircularProgress from '@material-ui/core/CircularProgress';
import {
  TextField,
  Button,
  FormControl,
  Container,
  Box
} from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  }
}));

const mainLogin = () => {
  const classes = useStyles();
  const router = useRouter();
  const [ form, setForm ] = useState({ email: '', password: '' });
  const [ isSubmitting, setIsSubmitting ] = useState(false);
  const [ error, setError ] = useState({});
  const [ validated, setValidated ] = useState(false);

  useEffect(() => {
    console.log('useEffect');

    if (isSubmitting) {
      if (Object.keys(error).length === 0 ) {
        isLogin();
        console.log('Logging In ....');
      } else {
        setIsSubmitting(false);
      }
    }
  });

  const isLogin = async () => {
    console.log('logging...', form);
    try {
      const res = await fetch("http://localhost:5000/api/v1/users/login", {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content": "application/json"
        },
        body: JSON.stringify(form)
      })
      console.log(res);
    } catch (error) {
      console.error(error);
    }
  }

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const handleLogin = (e) => {
    console.log('handleLogin');
    e.preventDefault();
    let errors = validate();
    setError(errors);
    setIsSubmitting(true);
  }

  // Validation
  const validate = () => {
    let error = {}
    
    if (!form.email) {
      error.email = 'Email is required!';
    }

    if (!form.password) {
      error.password = "Password field is required!"
    }

    return error;
  }

  return (
    <Container component="div" maxWidth="sm">
      <Box component="div" m={1}>
        <h2>Log In</h2>
        { isSubmitting
          ? <CircularProgress disableShrink />
          : null
        }
        <form className={classes.root} noValidate autoComplete="off" onSubmit={handleLogin}>
          <TextField
            id="standard-email"
            label="Email"
            variant="outlined"
            name="email"
            type="email"
            defaultValue={form.email}
            onChange={handleChange}
            error={error.email ? true : null }
            helperText={error.email ? "Email is required!" : null } 
          />
          <TextField
            id="standard-password"
            label="Password"
            variant="outlined"
            color="secondary"
            name="password"
            type="password"
            defaultValue={form.password}
            onChange={handleChange}
            error={error.email ? true : null }
            helperText={error.email ? "Password is required!" : null } 
          />
          <Button type="submit" variant="contained">Log In</Button>
        </form>
      </Box>
    </Container>
  )
}

export default mainLogin 
