import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import MaterialTable from 'material-table';
import withAdminMenu from '../../HOC/withAdminMenu';
import { toast } from 'react-toastify';
import {
  getVenues,
  getCategories,
  updateVenue,
  deleteVenue,
  saveVenue
} from '../../services';
import constants from '../../utils/constants';
import { setOptionStructureForTableDropdown } from '../../utils/helpers';
class AdminVenues extends Component {
  constructor(props) {
    super(props);
    this.state = {
      venues: [],
      categories: []
    };
  }

  componentDidMount() {
    this.props.setSelectedMenuItem(false, false, true, false, false);
    this.getVenues();
    this.getCategories();
  }

  getVenues = async () => {
    const { venues } = await getVenues();
    this.setState({
      venues
    });
  };

  getCategories = async () => {
    const { categories } = await getCategories();
    this.setState({
      categories
    });
  };

  onUpdateVenue = async (newData, oldData) => {
    const result = await updateVenue(newData);
    if (result.status === 'ok') {
      this.getVenues();
      toast.success('Cancha guardada con éxito');
    }
  };

  onDeleteVenue = async oldData => {
    const result = await deleteVenue(oldData.id);
    if (result.status === 'ok') {
      this.getVenues();
      toast.success('Cancha eliminada con éxito');
    }
  };

  onAddVenue = async newData => {
    const result = await saveVenue(newData);
    if (result.status === 'ok') {
      this.getVenues();
      toast.success('Cancha guardada con éxito');
    }
  };

  render() {
    const options = setOptionStructureForTableDropdown(this.state.categories);
    let columns = constants.ADMIN_TABLES_HEADERS.VENUES;
    columns[6].lookup = options;
    return (
      <Paper>
        <MaterialTable
          title="Canchas"
          columns={columns}
          data={this.state.venues}
          editable={{
            onRowUpdate: this.onUpdateVenue,
            onRowDelete: this.onDeleteVenue,
            onRowAdd: this.onAddVenue
          }}
        />
      </Paper>
    );
  }
}

export default withAdminMenu(AdminVenues);
