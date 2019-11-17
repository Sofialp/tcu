import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import withAdminMenu from '../../HOC/withAdminMenu';
import MaterialTable from 'material-table';
import TimePicker from 'rc-time-picker';
import moment from 'moment';
import { toast } from 'react-toastify';
import {
  getBookings,
  getAllVenues,
  saveBooking,
  updateBooking,
  deleteBooking
} from '../../services';
import { setOptionStructureForTableDropdown } from '../../utils/helpers';
class AdminBooking extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bookings: [],
      venues: [],
      startHour: moment()
    };
  }

  componentDidMount() {
    this.props.setSelectedMenuItem(false, false, false, false, true);
    this.getAllVenues();
    this.getBookings();
  }

  getAllVenues = async () => {
    const { venues } = await getAllVenues();
    this.setState({
      venues
    });
  };

  getBookings = async () => {
    const { bookings } = await getBookings();
    this.setState({
      bookings
    });
  };

  onAddBooking = async newData => {
    const startHour = `${this.state.startHour.format('HH')}:00:00`;
    const date = moment(newData.date).format('YYYY-MM-DD');
    const newBooking = {
      ...newData,
      startHour,
      date
    };
    const result = await saveBooking(newBooking);
    if (result.status === 'ok') {
      this.getBookings();
      toast.success('Reserva guardado con éxito');
    }
  };

  onDeleteBooking = async oldData => {
    const result = await deleteBooking(oldData.id);
    if (result.status === 'ok') {
      this.getBookings();
      toast.success('Reserva eliminado con éxito');
    }
  };

  onUpdateBooking = async (newData, oldData) => {
    const startHour = `${this.state.startHour.format('HH')}:00:00`;
    const date = moment(newData.date).format('YYYY-MM-DD');
    const newBooking = {
      ...newData,
      startHour,
      date
    };
    const result = await updateBooking(newBooking);
    if (result.status === 'ok') {
      this.getBookings();
      toast.success('Reserva modificada con éxito');
    }
  };

  onStartHourChange = value => {
    this.setState({
      startHour: value
    });
  };

  getBasicStructureForColumns = () => {
    return [
      { title: 'Cancha', field: 'venue' },
      { title: 'Nombre', field: 'clientName' },
      { title: 'Apellido', field: 'clientLastName' },
      { title: 'Email', field: 'clientEmail' },
      { title: 'Identificación', field: 'clientIdentification' },
      { title: 'Dirección', field: 'address' },
      { title: 'Fecha', field: 'date', type: 'date' },
      {
        title: 'Hora de inicio',
        field: 'startHour',
        editComponent: props => (
          <TimePicker
            defaultValue={moment()}
            showSecond={false}
            showMinute={false}
            onChange={this.onStartHourChange}
            value={this.state.startHour}
          />
        )
      },
      { title: 'Cantidad de horas', field: 'quantityHours', type: 'numeric' }
    ];
  };

  seItemsForTable = () => {
    const optionsVenues = setOptionStructureForTableDropdown(this.state.venues);
    let columns = this.getBasicStructureForColumns();
    columns[0].lookup = optionsVenues;
    return columns;
  };

  render() {
    const columns = this.seItemsForTable();
    return (
      <Paper>
        <MaterialTable
          title="Reservas"
          columns={columns}
          data={this.state.bookings}
          editable={{
            onRowUpdate: this.onUpdateBooking,
            onRowDelete: this.onDeleteBooking,
            onRowAdd: this.onAddBooking
          }}
        />
      </Paper>
    );
  }
}

export default withAdminMenu(AdminBooking);
