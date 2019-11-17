import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import withBreadCrumbs from '../../HOC/withBreadcrumbs';
import { getVenuesPerCategory } from '../../services';
import './categories.css';

class Categories extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: []
    };
  }

  componentDidMount() {
    this.getCategories();
  }

  onClickVenue = venueId => {
    this.props.history.push(`/venue/${venueId}`);
  };

  getCategories = async () => {
    const { categories } = await getVenuesPerCategory();
    if (categories) {
      this.setState({
        categories: categories
      });
    }
  };

  showVenues = venue => {
    const key = `venue-${venue.id}`;
    return (
      <ListItem
        button
        key={key}
        id={venue.id}
        onClick={e => this.onClickVenue(venue.id)}
      >
        <ListItemText primary={venue.name} secondary={venue.address} />
        <ListItemSecondaryAction>
          <Button className="select-btn" onClick={e => this.onClickVenue(venue.id)}>Seleccionar</Button>
        </ListItemSecondaryAction>
      </ListItem>
    );
  };

  showCategories = category => {
    const key = `category-${category.id}`;
    return (
      <Paper key={key} className="marginUp">
        <ListItem>
          <Typography variant="h6" className="title">
            {category.name}
          </Typography>
        </ListItem>
        <Divider />
        <List>
          {category.venues.length > 0 && category.venues.map(this.showVenues)}
        </List>
      </Paper>
    );
  };

  render() {
    const { categories } = this.state;
    return (
      <div>{categories.length > 0 && categories.map(this.showCategories)}</div>
    );
  }
}

export default withBreadCrumbs(Categories);
