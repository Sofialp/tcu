import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import './hourItem.css';

class HourItem extends Component {
  static props = {
    hour: PropTypes.number.isRequired,
    onSelectHour: PropTypes.func.isRequired,
    selected: PropTypes.bool.isRequired
  };

  selectHour = e => {
    const { hour, onSelectHour } = this.props;
    onSelectHour(hour);
  };

  render() {
    const { hour, selected } = this.props;
    return (
      <ListItem button onClick={this.selectHour} selected={selected}>
        <ListItemText>{`${hour}:00`}</ListItemText>
        <ListItemText>1 Hora</ListItemText>
      </ListItem>
    );
  }
}

export default HourItem;
