import React, { useState, useEffect } from 'react'
import fetch from 'isomorphic-unfetch'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'
import { userRegistration } from '../redux/actions/authAction'
import { useRouter } from 'next/router'
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
      width: '100%',
    },
  }
}));

const mainRegistration = ({
  userRegistration
}) => {
  const classes = useStyles();
  const router = useRouter();
  const [ form, setForm ] = useState({ name: 'Christian Alamis', email: 'christianalamis@gmail.com', password: '1234567' });
  const [ isSubmitting, setIsSubmitting ] = useState(false);
  const [ error, setError ] = useState({});
  const [ validated, setValidated ] = useState(false);

  useEffect(() => {
    console.log('useEffect');

    if (isSubmitting) {
      if (Object.keys(error).length === 0 ) {
        console.log('form', form);
        userRegistration(form); // Call API
        console.log('Logging In ....');
      } else {
        setIsSubmitting(false);
      }
    }
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    let errors = validate();
    setError(errors);
    setIsSubmitting(true);
  }

  // Validation
  const validate = () => {
    let error = {}

    if (!form.name) {
      error.name = 'Name is required!';
    }
    
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
        <h2>Sign Up</h2>
        <p>It’s quick and easy.</p>
        { isSubmitting
          ? <CircularProgress disableShrink />
          : null
        }
        <form className={classes.root} noValidate autoComplete="off" onSubmit={handleSubmit}>
          <TextField
            id="standard-name"
            label="Name"
            variant="outlined"
            name="name"
            type="name"
            defaultValue={form.name}
            onChange={handleChange}
            error={error.name ? true : null }
            helperText={error.name ? "Name is required!" : null } 
          />
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
          <Button type="submit" variant="contained">Sign Up</Button>
        </form>
      </Box>
    </Container>
  )
}


const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error
  }
}

mainRegistration.propTypes = {
  isAuthenticated: PropTypes.bool,
  error: PropTypes.Object,
  userRegistration: PropTypes.func
}

export default connect(
  mapStateToProps,
  { userRegistration }
)(mainRegistration); 
