import React from 'react';
import { Link } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Typography from '@material-ui/core/Typography';
import {
  Settings,
  List,
  ViewArray,
  Today,
  Input,
  Schedule
} from '@material-ui/icons';

import Grid from '@material-ui/core/Grid';

export default function withAdminMenu(Component) {
  class AdminMenu extends Component {
    constructor(props) {
      super(props);
      this.state = {
        generalSelected: true,
        categoriesSelected: false,
        venuesSelected: false,
        schedulesSelected: false,
        bookingsSelected: false
      };
    }

    setSelectedMenuItem = (
      generalSelected,
      categoriesSelected,
      venuesSelected,
      schedulesSelected,
      bookingsSelected
    ) => {
      this.setState({
        generalSelected,
        categoriesSelected,
        venuesSelected,
        schedulesSelected,
        bookingsSelected
      });
    };

    logOut = () => {
      localStorage.removeItem('user');
    };

    render() {
      const {
        generalSelected,
        categoriesSelected,
        venuesSelected,
        schedulesSelected,
        bookingsSelected
      } = this.state;
      return (
        <div>
          <Grid container spacing={1} className="formSpacing">
            <Grid item xs={2}>
              <Paper>
                <MenuList>
                  <Link to="/admin">
                    <MenuItem selected={generalSelected}>
                      <ListItemIcon>
                        <Settings />
                      </ListItemIcon>
                      <Typography>General</Typography>
                    </MenuItem>
                  </Link>
                  <Link to="/admin/categories">
                    <MenuItem selected={categoriesSelected}>
                      <ListItemIcon>
                        <List />
                      </ListItemIcon>
                      <Typography>Categorías</Typography>
                    </MenuItem>
                  </Link>
                  <Link to="/admin/venues">
                    <MenuItem selected={venuesSelected}>
                      <ListItemIcon>
                        <ViewArray />
                      </ListItemIcon>
                      <Typography>Canchas</Typography>
                    </MenuItem>
                  </Link>
                  <Link to="/admin/schedules">
                    <MenuItem selected={schedulesSelected}>
                      <ListItemIcon>
                        <Schedule />
                      </ListItemIcon>
                      <Typography>Horarios</Typography>
                    </MenuItem>
                  </Link>
                  <Link to="/admin/booking">
                    <MenuItem selected={bookingsSelected}>
                      <ListItemIcon>
                        <Today />
                      </ListItemIcon>
                      <Typography>Reservas</Typography>
                    </MenuItem>
                  </Link>
                  <Link to="/login" onClick={this.logOut}>
                    <MenuItem>
                      <ListItemIcon>
                        <Input />
                      </ListItemIcon>
                      <Typography>Cerrar Sesión</Typography>
                    </MenuItem>
                  </Link>
                </MenuList>
              </Paper>
            </Grid>
            <Grid item xs={10}>
              <Component
                {...this.props}
                setSelectedMenuItem={this.setSelectedMenuItem}
              />
            </Grid>
          </Grid>
        </div>
      );
    }
  }
  return AdminMenu;
}
