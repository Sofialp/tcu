import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import withAdminMenu from '../../HOC/withAdminMenu';
import Button from '@material-ui/core/Button';
import { toast } from 'react-toastify';
import { getAccount, updateAccountDetails } from '../../services';
import './admin.css';

class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      terms: '',
      id: 0
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
      </Paper>
    );
  }
}

export default withAdminMenu(Admin);
