import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { toast } from 'react-toastify';
import * as EmailValidator from 'email-validator';
import { getUserByEmail } from '../../services';

import './login.css';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      email: '',
      password: '',
      emailValid: true,
      error: false
    };
  }

  verifyCredencials = async () => {
    const { email, password } = this.state;
    const data = await getUserByEmail(email, password);
    if (!data.isValid) {
      this.setState({
        error: data.error
      });
      toast.error(data.error);
    } else {
      localStorage.setItem('user', JSON.stringify(data.user));
      this.props.history.push('/admin');
    }
  };

  handleEmailChange = e => {
    const email = e.target.value;
    const emailValid = EmailValidator.validate(email);
    this.setState({
      email,
      emailValid
    });
  };

  handlePasswordChange = e => {
    const password = e.target.value;
    this.setState({
      password
    });
  };

  render() {
    const { error, emailValid } = this.state;
    return (
      <div className="Login">
        <Grid container spacing={3}>
          <Grid item xs={3} />
          <Grid item xs={6}>
            <Paper className="spacing">
              <Typography variant="h5">
                Ingreso al módulo administrador
              </Typography>
              <form noValidate autoComplete="off">
                <TextField
                  id="outlined-email"
                  label="Email"
                  onChange={this.handleEmailChange}
                  margin="normal"
                  variant="outlined"
                  type="email"
                  name="email"
                  fullWidth
                  error={!emailValid || error}
                />
                <TextField
                  id="outlined-password-input"
                  label="Contraseña"
                  type="password"
                  onChange={this.handlePasswordChange}
                  autoComplete="current-password"
                  margin="normal"
                  variant="outlined"
                  fullWidth
                  error={error}
                />
                <Button
                  variant="contained"
                  color="primary"
                  className="loginButton"
                  fullWidth
                  size="large"
                  onClick={this.verifyCredencials}
                >
                  Entrar
                </Button>
              </form>
            </Paper>
          </Grid>
          <Grid item xs={3} />
        </Grid>
      </div>
    );
  }
}

export default Login;
