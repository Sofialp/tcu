import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import constants from '../../utils/constants';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import './confirmation.css';

class Confirmation extends Component {
  componentDidMount() {
    this.sendEmail();
  }

  goToIndex = () => {
    this.props.history.push('/');
  };

  getEmailBodyClient = () => {
    const {
      bookingId,
      client,
      scheduleBooked
    } = this.props.history.location.state;
    const body = `<div><h3>Gracias por reservar con nosotros!</h3><br><p>Número de reserva: ${bookingId}</p><br><p>Fecha: ${scheduleBooked.displayDate}</p><br><p>Horario: ${scheduleBooked.startHour} - ${scheduleBooked.endHour}</p><br><p>A nombre de: ${client.clientName} ${client.clientLastName}</p></div>`;
    return body;
  };

  sendEmail = () => {
    const { client } = this.props.history.location.state;
    if (window.Email) {
      window.Email.send({
        SecureToken: constants.SMTP_TOKEN,
        To: client.clientEmail,
        From: 'sofialpizard@gmail.com',
        Subject: 'Reservación de cancha',
        Body: this.getEmailBodyClient()
      }).then(message => alert(message));
    }
  };

  render() {
    const {
      bookingId,
      client,
      scheduleBooked
    } = this.props.history.location.state;
    return (
      <Grid container spacing={3}>
        <Grid item xs={2}></Grid>
        <Grid item xs={8}>
          <Paper className="confirmationPadding">
            <Typography variant="h3" gutterBottom align="center">
              <CheckCircleOutlineIcon
                style={{ fontSize: 50, color: 'green', textAlign: 'center' }}
              />
            </Typography>
            <Typography variant="h3" gutterBottom align="center">
              ¡Reserva confirmada!
            </Typography>
            <Typography variant="h5" gutterBottom align="center">
              Número de reserva: {bookingId}
            </Typography>
            <Typography variant="subtitle1" gutterBottom align="center">
              Fecha: {scheduleBooked.displayDate}
            </Typography>
            <Typography variant="subtitle1" gutterBottom align="center">
              Horario: {scheduleBooked.startHour} - {scheduleBooked.endHour}
            </Typography>
            <Typography variant="subtitle1" gutterBottom align="center">
              A nombre de: {client.clientName} {client.clientLastName}
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={4}></Grid>
              <Grid item xs={4}>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  className="categoriesButton"
                  fullWidth
                  onClick={this.goToIndex}
                >
                  Volver a categorías
                </Button>
              </Grid>
            </Grid>
            <Typography
              variant="body2"
              gutterBottom
              align="center"
              className="spaceUp"
            >
              *Se ha enviado un correo con esta información.
            </Typography>
            <Typography variant="body2" gutterBottom align="center">
              Si no ve el correo electrónico, por favor revise su carpeta de
              Spam.
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    );
  }
}

export default Confirmation;
