import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import TermsModal from '../TermsModal';
import Payment from '../Payment';
import * as EmailValidator from 'email-validator';
import './booking.css';

class Booking extends Component {
  static props = {
    venueId: PropTypes.string.isRequired,
    venueName: PropTypes.string.isRequired,
    scheduleBooked: PropTypes.object.isRequired,
    bookingInfo: PropTypes.object.isRequired,
    onFormChange: PropTypes.func.isRequired,
    isPayment: PropTypes.bool.isRequired,
    totalAmount: PropTypes.number.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      clientName: '',
      clientLastName: '',
      clientEmail: '',
      clientId: '',
      address: '',
      phone: '',
      teamName: '',
      termsAccepted: false,
      emailValid: true,
      termsOpen: false
    };
  }

  onChangeName = e => {
    const value = e.target.value;
    this.setState({
      clientName: value
    });
    this.props.onFormChange('clientName', value);
  };

  onChangeLastName = e => {
    const value = e.target.value;
    this.setState({
      clientLastName: value
    });
    this.props.onFormChange('clientLastName', value);
  };

  onChangeClientId = e => {
    const value = e.target.value;
    this.setState({
      clientId: value
    });
    this.props.onFormChange('clientId', value);
  };

  onChangeClientEmail = e => {
    const value = e.target.value;
    const emailValid = EmailValidator.validate(value);
    this.setState({
      clientEmail: value,
      emailValid
    });
    this.props.onFormChange('clientEmail', value, !emailValid);
  };

  onChangePhone = e => {
    const value = e.target.value;
    this.setState({
      phone: value
    });
    this.props.onFormChange('phone', value);
  };

  onChangeAddress = e => {
    const value = e.target.value;
    this.setState({
      address: value
    });
    this.props.onFormChange('address', value);
  };

  onChangeTeamName = e => {
    const value = e.target.value;
    this.setState({
      teamName: value
    });
    this.props.onFormChange('teamName', value);
  };

  onChangeTermsAccepted = e => {
    const value = e.target.checked;
    this.setState({
      termsAccepted: value
    });
    this.props.onFormChange('termsAccepted', value);
  };

  toggleTermsModal = () => {
    this.setState({
      termsOpen: !this.state.termsOpen
    });
  };

  showTermsLabel = () => {
    return (
      <Typography variant="body2">
        Acepto los{' '}
        <Link onClick={this.toggleTermsModal} className="underScoreLink">
          Términos y condiciones y aviso de privacidad
        </Link>
      </Typography>
    );
  };

  render() {
    const { venueName, isPayment } = this.props;
    const {
      startHour,
      endHour,
      quantityHours,
      quantityNightHours,
      displayDate
    } = this.props.scheduleBooked;
    const {
      clientName,
      clientLastName,
      clientEmail,
      clientId,
      address,
      phone,
      teamName,
      termsAccepted,
      emailValid,
      termsOpen
    } = this.state;
    const totalHours = quantityNightHours + quantityHours;
    return (
      <div>
        <div className="spacing">
          <Typography variant="h6">{venueName}</Typography>
          <Typography
            variant="h5"
            className="marginUp"
          >{`Reservar ${displayDate} de ${startHour} a ${endHour}`}</Typography>
          <Typography variant="subtitle1">{`${totalHours} hora/s`}</Typography>
        </div>
        {isPayment ? (
          <Payment
            client={this.state}
            totalHours={totalHours}
            scheduleBooked={this.props.scheduleBooked}
            venueId={this.props.venueId}
            history={this.props.history}
            totalAmount={this.props.totalAmount}
          ></Payment>
        ) : (
          <Grid container spacing={3} className="formSpacing">
            <Grid item xs={6}>
              <TextField
                id="outlined-name"
                label="Nombre"
                margin="normal"
                variant="outlined"
                fullWidth
                required
                value={clientName}
                onChange={this.onChangeName}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="outlined-last-name"
                label="Apellido"
                margin="normal"
                variant="outlined"
                fullWidth
                required
                value={clientLastName}
                onChange={this.onChangeLastName}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="outlined-id"
                label="Cédula"
                margin="normal"
                variant="outlined"
                type="number"
                fullWidth
                required
                value={clientId}
                onChange={this.onChangeClientId}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="outlined-email"
                label="Email"
                margin="normal"
                variant="outlined"
                type="email"
                name="email"
                fullWidth
                required
                error={!emailValid}
                value={clientEmail}
                onChange={this.onChangeClientEmail}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="outlined-phone"
                label="Teléfono"
                margin="normal"
                variant="outlined"
                type="number"
                fullWidth
                required
                value={phone}
                onChange={this.onChangePhone}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="outlined-address"
                label="Dirección"
                margin="normal"
                variant="outlined"
                fullWidth
                required
                value={address}
                onChange={this.onChangeAddress}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="outlined-team"
                label="Nombre del equipo u organización"
                margin="normal"
                variant="outlined"
                fullWidth
                required
                value={teamName}
                onChange={this.onChangeTeamName}
              />
            </Grid>
            <Grid item xs={6}>
              <FormControlLabel
                className="marginTop"
                control={
                  <Checkbox
                    checked={termsAccepted}
                    onChange={this.onChangeTermsAccepted}
                    value="terms"
                  />
                }
                label={this.showTermsLabel()}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle2">*Campos requeridos</Typography>
            </Grid>
          </Grid>
        )}
        <TermsModal open={termsOpen} onClose={this.toggleTermsModal} />
      </div>
    );
  }
}

export default Booking;
