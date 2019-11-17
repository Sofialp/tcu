import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { toast } from 'react-toastify';
import { PayPalButton } from 'react-paypal-button-v2';
import GridLoader from 'react-spinners/GridLoader';
import { saveBooking } from '../../services';
import './payment.css';

class Payment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };
  }
  static props = {
    client: PropTypes.object.isRequired,
    totalHours: PropTypes.number.isRequired,
    scheduleBooked: PropTypes.object.isRequired,
    totalAmount: PropTypes.number.isRequired
  };

  getStructureForBookingSaving = paypalData => {
    const { client, totalHours, scheduleBooked, venueId } = this.props;
    const bookingInfo = {
      startHour: scheduleBooked.startHour,
      quantityHours: totalHours,
      venue: venueId,
      date: scheduleBooked.date,
      clientName: client.clientName,
      clientLastName: client.clientLastName,
      clientEmail: client.clientEmail,
      clientIdentification: client.clientId,
      address: client.address,
      orderId: paypalData.orderID
    };
    return bookingInfo;
  };

  onSuccess = async (details, data) => {
    this.toogleLoading();
    const booking = this.getStructureForBookingSaving(data);
    const result = await saveBooking(booking);
    this.toogleLoading();
    if (result.status === 'ok') {
      this.props.history.push({
        pathname: '/confirmation',
        state: {
          bookingId: result.bookingId,
          orderId: data.orderID,
          scheduleBooked: this.props.scheduleBooked,
          client: this.props.client
        }
      });
    }
  };

  onError = error => {
    toast.error(`Hubo un error con el mensaje: ${error}`);
  };

  toogleLoading = () => {
    this.setState({
      loading: !this.state.loading
    });
  };

  render() {
    const { loading } = this.state;
    const client = {
      sandbox:
        'AXCXsIxQuKuQ4Y1OhgEY1QG5nuJNYxlu_jQxxTPE4DUWaZRUW-isnb_0d_543qLlmkeQQVHaoCVCT7eT'
    };
    const override = `
      display: block;
      margin: 10px auto;
    `;
    return (
      <Grid container spacing={3} className="marginUp">
        <Grid item xs={4}></Grid>
        <Grid item xs={4}>
          <Typography variant="h5" gutterBottom align="center">
            Elija su método de pago
          </Typography>
          {loading && (
            <div>
              <GridLoader
                css={override}
                sizeUnit={'px'}
                size={15}
                color={'#003B4C'}
                loading={this.state.loading}
              />
            </div>
          )}
          <PayPalButton
            amount={this.props.totalAmount}
            options={{
              clientId: client.sandbox,
              currency: 'USD'
            }}
            onSuccess={this.onSuccess}
            onError={this.onError}
            onButtonReady={this.toogleLoading}
          />
        </Grid>
        <Grid item xs={4}></Grid>
      </Grid>
    );
  }
}

export default Payment;
