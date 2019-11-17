import React from 'react';
import moment from 'moment';
import localization from 'moment/locale/es';
import { toast } from 'react-toastify';
import AppBar from '@material-ui/core/AppBar';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import './withBooking.css';

export default function withBooking(Component) {
  class Booking extends Component {
    constructor(props) {
      super(props);
      this.state = {
        bookingInfo: {
          clientName: '',
          clientLastName: '',
          clientEmail: '',
          clientId: '',
          address: '',
          phone: '',
          teamName: '',
          termsAccepted: false
        },
        scheduleBooked: {
          startHour: '',
          endHour: '',
          quantityHours: 0,
          quantityNightHours: 0,
          date: '',
          displayDate: ''
        },
        venueId: '',
        venueName: '',
        pricePerHourDay: '',
        isPayment: false
      };
    }

    calculateQuantityHours = hours => {
      const nightHours = [];
      const dayHours = [];
      hours.forEach(item => {
        if (item > 17) {
          nightHours.push(item);
        } else {
          dayHours.push(item);
        }
      });
      return {
        quantityNightHours: nightHours.length,
        quantityDayHours: dayHours.length
      };
    };

    saveScheduleHours = (hours, date) => {
      if (hours && hours.length > 0) {
        const minimumHour = hours.reduce((a, b) => Math.min(a, b));
        const startHour = `${minimumHour}:00`;
        const endHour = `${minimumHour + hours.length}:00`;
        const formattedDate = moment(date).format('YYYY-MM-DD');
        const displayDate = moment(date);
        const quantities = this.calculateQuantityHours(hours);
        this.setState({
          scheduleBooked: {
            startHour,
            endHour,
            quantityHours: quantities.quantityDayHours,
            quantityNightHours: quantities.quantityNightHours,
            date: formattedDate,
            displayDate: displayDate
              .locale('es', localization)
              .format('dddd D MMMM')
          }
        });
      } else {
        this.setState({
          scheduleBooked: {
            startHour: '',
            endHour: '',
            quantityHours: 0,
            quantityNightHours: 0,
            date: '',
            displayDate: ''
          }
        });
      }
    };

    saveVenue = (id, name, pricePerHourDay, pricePerHourNight) => {
      this.setState({
        venueId: id,
        venueName: name,
        pricePerHourDay,
        pricePerHourNight
      });
    };

    onClickBook = () => {
      if (this.state.scheduleBooked.startHour !== '') {
        this.props.changeToBooking();
        // TODO: Change this to outer funciton
        const steps = [
          { label: 'Canchas', to: '/' },
          { label: this.state.venueName, to: `/venue/${this.state.venueId}` },
          { label: 'Reservar', selected: true }
        ];
        this.props.defineSteps(steps);
      } else {
        toast.error(
          'Por favor seleccione una hora para reservar antes de continuar'
        );
      }
    };

    onFormChange = (type, value, error = false) => {
      switch (type) {
        case 'clientName':
          this.setState({
            bookingInfo: {
              ...this.state.bookingInfo,
              clientName: value
            }
          });
          break;
        case 'clientLastName':
          this.setState({
            bookingInfo: {
              ...this.state.bookingInfo,
              clientLastName: value
            }
          });
          break;
        case 'clientEmail':
          this.setState({
            bookingInfo: {
              ...this.state.bookingInfo,
              clientEmail: value,
              error
            }
          });
          break;
        case 'clientId':
          this.setState({
            bookingInfo: {
              ...this.state.bookingInfo,
              clientId: value
            }
          });
          break;
        case 'address':
          this.setState({
            bookingInfo: {
              ...this.state.bookingInfo,
              address: value
            }
          });
          break;
        case 'phone':
          this.setState({
            bookingInfo: {
              ...this.state.bookingInfo,
              phone: value
            }
          });
          break;
        case 'teamName':
          this.setState({
            bookingInfo: {
              ...this.state.bookingInfo,
              teamName: value
            }
          });
          break;
        case 'termsAccepted':
          this.setState({
            bookingInfo: {
              ...this.state.bookingInfo,
              termsAccepted: value
            }
          });
          break;
        default:
      }
    };

    isValidToPay = () => {
      const {
        clientName,
        clientLastName,
        clientEmail,
        clientId,
        address,
        phone,
        error
      } = this.state.bookingInfo;
      if (
        clientName !== '' &&
        clientLastName !== '' &&
        clientEmail !== '' &&
        clientId !== '' &&
        address !== '' &&
        phone !== '' &&
        !error
      ) {
        return true;
      }
      return false;
    };

    onPayClick = () => {
      if (!this.isValidToPay()) {
        toast.error(
          'Debe llenar todos los campos requeridos con información correcta *'
        );
      } else if (!this.state.bookingInfo.termsAccepted) {
        toast.error('Debe aceptar los términos antes de continuar');
      } else {
        this.setState({
          isPayment: true
        });
      }
    };

    calculateTotalToPay = () => {
      const { pricePerHourDay, pricePerHourNight } = this.state;
      const { quantityHours, quantityNightHours } = this.state.scheduleBooked;
      const totalDay = quantityHours * pricePerHourDay;
      const totalNight = quantityNightHours * pricePerHourNight;
      const total = totalDay + totalNight;
      return parseFloat(total);
    };

    showBookingInformation = () => {
      const {
        displayDate,
        startHour,
        quantityHours,
        quantityNightHours,
        endHour
      } = this.state.scheduleBooked;
      const { isBooking } = this.props;
      const total = this.calculateTotalToPay();
      if (isBooking) {
        return (
          <Typography variant="h6" align="right">
            {`Total de la reserva: $${total}`}
          </Typography>
        );
      }
      if (quantityHours > 0 || quantityNightHours > 0) {
        return (
          <Typography variant="b2" align="right">
            {`Reservar el ${displayDate} de ${startHour} a ${endHour}`}
          </Typography>
        );
      }
      return (
        <Typography variant="b2" align="right">
          Elige una hora para reservar
        </Typography>
      );
    };

    showBookingButton = () => {
      const { isBooking } = this.props;
      if (isBooking) {
        return (
          <Button
            variant="contained"
            color="primary"
            size="medium"
            className="bookButton"
            onClick={this.onPayClick}
          >
            Pagar
          </Button>
        );
      }
      return (
        <Button
          variant="contained"
          color="primary"
          size="medium"
          className="bookButton"
          onClick={this.onClickBook}
        >
          Reservar
        </Button>
      );
    };

    render() {
      const { isPayment } = this.state;
      const total = this.calculateTotalToPay();
      return (
        <div>
          <Component
            {...this.props}
            saveScheduleHours={this.saveScheduleHours}
            saveVenue={this.saveVenue}
            isBooking={this.props.isBooking}
            scheduleBooked={this.state.scheduleBooked}
            bookingInfo={this.state.bookingInfo}
            onFormChange={this.onFormChange}
            isPayment={this.state.isPayment}
            totalAmount={total}
          />
          <AppBar position="fixed" color="default" className="buttomBar">
            <Grid container spacing={3}>
              <Grid item xs />
              <Grid item xs />
              <Grid item xs className="centerItems">
                {this.showBookingInformation()}
              </Grid>
              {!isPayment && (
                <Grid item xs>
                  {this.showBookingButton()}
                </Grid>
              )}
            </Grid>
          </AppBar>
        </div>
      );
    }
  }
  return Booking;
}
