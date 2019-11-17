import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import withBreadCrumbs from '../../HOC/withBreadcrumbs';
import withBooking from '../../HOC/withBooking';
import Schedule from '../Schedule';
import Booking from '../Booking';
import { getVenueDetails } from '../../services';
import './venue.css';

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired
};

class Venue extends Component {
  constructor(props) {
    super(props);
    this.state = {
      venueId: this.props.match.params.venueId,
      venue: {},
      tabValue: 0
    };
  }

  componentDidMount() {
    if (this.state.venueId) {
      this.getVenueDetails();
    }
  }

  getVenueDetails = async () => {
    const { venue } = await getVenueDetails(this.state.venueId);
    if (venue) {
      this.setState({
        venue: venue
      });
      // TODO: Change this to outer funciton
      const steps = [
        { label: 'Canchas', to: '/' },
        { label: venue.name, selected: true }
      ];
      this.props.defineSteps(steps);
      this.props.saveVenue(
        venue.id,
        venue.name,
        venue.pricePerHourDay,
        venue.pricePerHourNight
      );
    }
  };

  onTabChange = (event, newValue) => {
    this.setState({
      tabValue: newValue
    });
  };

  render() {
    const { venue, tabValue, venueId } = this.state;
    const {
      isBooking,
      scheduleBooked,
      bookingInfo,
      onFormChange,
      totalAmount
    } = this.props;
    return (
      <Paper>
        {venue && (
          <div>
            {isBooking ? (
              <Booking
                scheduleBooked={scheduleBooked}
                bookingInfo={bookingInfo}
                venueName={venue.name}
                venueId={venueId}
                onFormChange={onFormChange}
                isPayment={this.props.isPayment}
                history={this.props.history}
                totalAmount={totalAmount}
              />
            ) : (
              <div>
                <div className="spacing">
                  <Typography variant="h5">{venue.name}</Typography>
                  <Typography variant="b2" className="marginUp">
                    {venue.address}
                  </Typography>
                  <Typography
                    variant="h6"
                    className="marginUp"
                  >{`Día: $${venue.pricePerHourDay} la hora`}</Typography>
                  <Typography
                    variant="h6"
                    className="marginUp"
                  >{`Noche: $${venue.pricePerHourNight} la hora`}</Typography>
                </div>
                <AppBar position="static" className="tabBar">
                  <Tabs
                    variant="fullWidth"
                    indicatorColor="primary"
                    textColor="primary"
                    value={tabValue}
                    onChange={this.onTabChange}
                  >
                    <Tab label="Horario" />
                    <Tab label="Ubicación" />
                    <Tab label="Descripción" />
                  </Tabs>
                </AppBar>
                {tabValue === 0 && (
                  <TabContainer>
                    <Schedule
                      venueId={venueId}
                      saveScheduleHours={this.props.saveScheduleHours}
                      scheduleBooked={this.props.scheduleBooked}
                    />
                  </TabContainer>
                )}
                {tabValue === 1 && (
                  <TabContainer>
                    <Typography variant="b2" className="marginUp">
                      {venue.address}
                    </Typography>
                  </TabContainer>
                )}
                {tabValue === 2 && (
                  <TabContainer>
                    <Typography variant="b2" className="marginUp">
                      {venue.description}
                    </Typography>
                  </TabContainer>
                )}
              </div>
            )}
          </div>
        )}
      </Paper>
    );
  }
}

export default withBreadCrumbs(withBooking(Venue));
