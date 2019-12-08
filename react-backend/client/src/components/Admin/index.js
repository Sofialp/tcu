import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import withAdminMenu from '../../HOC/withAdminMenu';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import passwordHash from 'password-hash';
import { toast } from 'react-toastify';
import {
  getAccount,
  updateAccountDetails,
  updatePassword
} from '../../services';
import './admin.css';

class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      terms: '',
      id: 0,
      password: '',
      passwordConfirmation: ''
    };
  }

  componentDidMount() {
    this.props.setSelectedMenuItem(true, false, false, false);
    this.getAccountDetails();
  }

  getAccountDetails = async () => {
    const { name, terms, id } = await getAccount();
    this.setState({
      name,
      terms,
      id
    });
  };

  onNameChange = e => {
    const value = e.target.value;
    this.setState({
      name: value
    });
  };

  onTermsChange = e => {
    const value = e.target.value;
    this.setState({
      terms: value
    });
  };

  onPasswordChange = e => {
    const value = e.target.value;
    this.setState({
      password: value
    });
  };

  onConfirmationChange = e => {
    const value = e.target.value;
    this.setState({
      passwordConfirmation: value
    });
  };

  onPasswordSave = async () => {
    const { password, passwordConfirmation } = this.state;
    if (password === '' || passwordConfirmation === '') {
      toast.error(
        'Debe llenar todos los campos requeridos con información correcta *'
      );
    } else if (password !== passwordConfirmation) {
      toast.error(
        'Las contraseñas no coinciden, por favor vuelva a ingresarlas'
      );
    } else {
      const user = JSON.parse(localStorage.getItem('user'));
      const hashedPassword = passwordHash.generate(password);
      const result = await updatePassword(hashedPassword, user.email);
      if (result.status === 'ok') {
        this.getAccountDetails();
        toast.success('Contraseña modificada con éxito');
        this.setState({
          password: '',
          passwordConfirmation: ''
        });
      }
    }
  };

  onAccountSave = async () => {
    const { terms, name, id } = this.state;
    if ((terms !== '') & (name !== '')) {
      const account = {
        name,
        terms,
        id
      };
      const result = await updateAccountDetails(account);
      if (result.status === 'ok') {
        this.getAccountDetails();
        toast.success('Información guardados con éxito');
      }
    } else {
      toast.error(
        'Debe llenar todos los campos requeridos con información correcta *'
      );
    }
  };

  render() {
    return (
      <Paper className="paddingTopBottom">
        <Grid item xs={12} className="paddingLeft">
          <Typography variant="h6">Información General</Typography>
        </Grid>
        <Grid item xs={8} className="paddingLeft">
          <TextField
            id="outlined-name"
            label="Nombre de institución"
            margin="normal"
            variant="outlined"
            fullWidth
            required
            value={this.state.name}
            onChange={this.onNameChange}
          />
        </Grid>
        <Grid item xs={4} className="paddingLeft"></Grid>
        <Grid item xs={11} className="paddingLeft">
          <TextField
            id="outlined-name"
            label="Términos y condiciones"
            margin="normal"
            variant="outlined"
            fullWidth
            required
            value={this.state.terms}
            multiline
            rows="10"
            onChange={this.onTermsChange}
          />
        </Grid>
        <Grid item xs={1} className="paddingLeft"></Grid>
        <Grid item xs={2} className="paddingLeft">
          <Button
            variant="contained"
            color="primary"
            size="medium"
            className="bookButton"
            onClick={this.onAccountSave}
          >
            Guardar
          </Button>
        </Grid>
        <Divider variant="middle" className="marginTop" />
        <Grid item xs={12} className="paddingLeft">
          <Typography variant="h6">Seguridad</Typography>
          <Typography variant="subtitle1">
            Ingrese la nueva contraseña
          </Typography>
        </Grid>
        <Grid item xs={8} className="paddingLeft">
          <TextField
            id="outlined-name"
            label="Nueva contraseña"
            margin="normal"
            variant="outlined"
            type="password"
            fullWidth
            required
            onChange={this.onPasswordChange}
          />
        </Grid>
        <Grid item xs={8} className="paddingLeft">
          <TextField
            id="outlined-name"
            label="Confirme la contraseña"
            margin="normal"
            variant="outlined"
            type="password"
            fullWidth
            required
            onChange={this.onConfirmationChange}
          />
        </Grid>
        <Grid item xs={1} className="paddingLeft"></Grid>
        <Grid item xs={2} className="paddingLeft">
          <Button
            variant="contained"
            color="primary"
            size="medium"
            className="bookButton"
            onClick={this.onPasswordSave}
          >
            Cambiar
          </Button>
        </Grid>
      </Paper>
    );
  }
}

export default withAdminMenu(Admin);
