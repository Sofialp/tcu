import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import HourItem from '../HourItem';
import DatePicker from 'react-datepicker';
import { toast } from 'react-toastify';
import moment from 'moment';
import { getSchedule, getBookingOfVenue } from '../../services';
import {
  calculateDayOfWeek,
  getHoursAvailable,
  verifyContinuesHour,
  convertHourToNumber,
  filterArrays
} from '../../utils/helpers';
import constants from '../../utils/constants';
import 'react-datepicker/dist/react-datepicker.css';
import './schedule.css';

class Schedule extends Component {
  static props = {
    venueId: PropTypes.string,
    scheduleBooked: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    const selectedDate = new Date();
    const dayOfWeekId = calculateDayOfWeek(selectedDate.getDay());
    const selectedHours = this.calculateSelectedHours();
    this.state = {
      selectedDate,
      dayOfWeekId,
      scheduleAvailable: [],
      selectedHours: selectedHours
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.selectedDate !== prevState.selectedDate) {
      this.getScheduleAvailable();
    }
  }

  componentDidMount() {
    this.getScheduleAvailable();
  }

  calculateSelectedHours = () => {
    const {
      startHour,
      quantityHours,
      quantityNightHours
    } = this.props.scheduleBooked;
    const totalHours = quantityHours + quantityNightHours;
    if (startHour !== '') {
      const formattedStartHour = convertHourToNumber(startHour);
      const hours = [formattedStartHour];
      for (let i = 0; i < totalHours - 1; i++) {
        hours.push(hours[i] + 1);
      }
      return hours;
    }
    return [];
  };

  removeBookedHours = (scheduleAvailable, bookings) => {
    const hoursToRemove = [];
    bookings.forEach(booking => {
      const initialHour = convertHourToNumber(booking.startHour);
      hoursToRemove.push(initialHour);
      let counter = 1;
      while (counter < booking.quantityHours) {
        hoursToRemove.push(initialHour + counter);
        counter++;
      }
    });
    const filteredHours = filterArrays(scheduleAvailable, hoursToRemove);
    return filteredHours;
  };

  calculateHoursGroupAvailable = (hourGroups, bookings) => {
    const hoursAvailable = [];
    hourGroups.forEach(item => {
      Array.prototype.push.apply(hoursAvailable, getHoursAvailable(item));
    });
    const scheduleAvailable = this.removeBookedHours(hoursAvailable, bookings);
    this.setState({
      scheduleAvailable
    });
  };

  getScheduleAvailable = async () => {
    const { dayOfWeekId, selectedDate } = this.state;
    const { venueId } = this.props;
    const scheduleAvailable = await getSchedule(venueId, dayOfWeekId);
    const date = moment(selectedDate).format('YYYY-MM-DD');
    const { bookings } = await getBookingOfVenue(venueId, date);
    if (scheduleAvailable.hourGroups) {
      this.calculateHoursGroupAvailable(scheduleAvailable.hourGroups, bookings);
    }
  };

  handleChange = value => {
    const selectedDate = new Date(value);
    const dayOfWeekId = calculateDayOfWeek(selectedDate.getDay());
    this.setState({
      selectedDate,
      dayOfWeekId,
      scheduleAvailable: [],
      selectedHours: []
    });
  };

  removeHour = value => {
    const { selectedHours } = this.state;
    if (selectedHours.length > 0) {
      const hours = selectedHours.filter(item => item !== value);
      this.setState({
        selectedHours: hours
      });
      this.props.saveScheduleHours(hours, this.state.selectedDate);
    }
  };

  saveHour = value => {
    const hours = [].concat(this.state.selectedHours);
    if (
      hours.length < constants.MAX_QUANTITY_HOURS &&
      verifyContinuesHour(value, hours)
    ) {
      hours.push(value);
      this.setState({
        selectedHours: hours
      });
      this.props.saveScheduleHours(hours, this.state.selectedDate);
    } else {
      toast.error(
        `Las horas deben ser consecutivas y no pueden ser más de ${constants.MAX_QUANTITY_HOURS} horas`
      );
    }
  };

  onSelectHour = value => {
    const isAdded = this.state.selectedHours.includes(value);
    if (isAdded) {
      this.removeHour(value);
    } else {
      this.saveHour(value);
    }
  };

  showHours = hour => {
    const selected = this.state.selectedHours.includes(hour);
    return (
      <HourItem
        key={`${hour}-hour`}
        hour={hour}
        onSelectHour={this.onSelectHour}
        selected={selected}
      />
    );
  };

  addDays = (date, days) => {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  };

  render() {
    const { scheduleAvailable } = this.state;
    return (
      <div>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <Typography variant="h6">Horario Disponible</Typography>
          </Grid>
          <Grid item xs={2} />
          <Grid item xs={1}>
            <Typography variant="h6">Fecha:</Typography>
          </Grid>
          <Grid item xs={3}>
            <DatePicker
              selected={this.state.selectedDate}
              onChange={this.handleChange}
              minDate={new Date()}
              maxDate={this.addDays(new Date(), constants.MAX_QUANTITY_DAYS)}
            />
          </Grid>
        </Grid>
        <div className="margin-up">
          <List>
            {scheduleAvailable.length > 0 &&
              scheduleAvailable.map(this.showHours)}
          </List>
          {scheduleAvailable.length === 0 && (
            <Typography variant="subtitle1" align="center">
              No hay horas disponibles en esa fecha
            </Typography>
          )}
        </div>
      </div>
    );
  }
}

export default Schedule;
