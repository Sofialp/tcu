import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import './confirmation.css';

class Confirmation extends Component {
  componentDidMount() {
    this.sendEmail();
  }

  goToIndex = () => {
    this.props.history.push('/');
  };

  sendEmail = () => {
    if (window.Email) {
      window.Email.send({
        SecureToken: 'a275ca1d-bb55-46de-bc8f-a711ef87da18',
        To: 'melvinsalas10@gmail.com',
        From: 'sofialpizard@gmail.com',
        Subject: 'This is the subject',
        Body: 'And this is the body'
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
          </Paper>
        </Grid>
      </Grid>
    );
  }
}

export default Confirmation;
