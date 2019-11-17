import React, { Component } from 'react';
import TimePicker from 'rc-time-picker';
import moment from 'moment';
import Paper from '@material-ui/core/Paper';
import MaterialTable from 'material-table';
import { toast } from 'react-toastify';
import withAdminMenu from '../../HOC/withAdminMenu';
import {
  getDaysOfWeek,
  getVenues,
  getSchedules,
  saveSchedule,
  updateSchedule,
  deleteSchedule
} from '../../services';
import { setOptionStructureForTableDropdown } from '../../utils/helpers';
import './admin.css';
import 'rc-time-picker/assets/index.css';

class AdminSchedules extends Component {
  constructor(props) {
    super(props);
    this.state = {
      venues: [],
      days: [],
      schedules: [],
      startHour: moment(),
      endHour: moment()
    };
  }

  componentDidMount() {
    this.props.setSelectedMenuItem(false, false, false, true, false);
    this.getDaysOfWeek();
    this.getVenues();
    this.getSchedules();
  }

  getDaysOfWeek = async () => {
    const { days } = await getDaysOfWeek();
    this.setState({
      days
    });
  };

  getSchedules = async () => {
    const { schedules } = await getSchedules();
    this.setState({
      schedules
    });
  };

  getVenues = async () => {
    const { venues } = await getVenues();
    this.setState({
      venues
    });
  };

  onStartHourChange = value => {
    this.setState({
      startHour: value
    });
  };

  onEndHourChange = value => {
    this.setState({
      endHour: value
    });
  };

  getBasicStructureForColumns = () => {
    return [
      { title: 'ID', field: 'id', editable: 'never' },
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
      {
        title: 'Hora de fin',
        field: 'endHour',
        editComponent: props => (
          <TimePicker
            defaultValue={moment()}
            showSecond={false}
            showMinute={false}
            onChange={this.onEndHourChange}
            value={this.state.endHour}
          />
        )
      },
      { title: 'Día de la semana', field: 'dayOfWeek' },
      { title: 'Cancha', field: 'venue' }
    ];
  };

  seItemsForTable = () => {
    const optionsDays = setOptionStructureForTableDropdown(this.state.days);
    const optionsVenues = setOptionStructureForTableDropdown(this.state.venues);
    let columns = this.getBasicStructureForColumns();
    columns[3].lookup = optionsDays;
    columns[4].lookup = optionsVenues;
    return columns;
  };

  onAddSchedule = async newData => {
    const startHour = `${this.state.startHour.format('HH')}:00:00`;
    const endHour = `${this.state.endHour.format('HH')}:00:00`;
    const newSchedule = {
      ...newData,
      endHour,
      startHour
    };
    const result = await saveSchedule(newSchedule);
    if (result.status === 'ok') {
      this.getSchedules();
      toast.success('Horario guardado con éxito');
    }
  };

  onUpdateSchedule = async (newData, oldData) => {
    const startHour = `${this.state.startHour.format('HH')}:00:00`;
    const endHour = `${this.state.endHour.format('HH')}:00:00`;
    const newSchedule = {
      ...newData,
      endHour,
      startHour
    };
    const result = await updateSchedule(newSchedule);
    if (result.status === 'ok') {
      this.getSchedules();
      toast.success('Horario actualizado con éxito');
    }
  };

  onDeleteSchedule = async oldData => {
    const result = await deleteSchedule(oldData.venueSchedule, oldData.id);
    if (result.status === 'ok') {
      this.getSchedules();
      toast.success('Horario eliminado con éxito');
    }
  };

  render() {
    const columns = this.seItemsForTable();
    return (
      <Paper>
        <MaterialTable
          title="Horarios"
          columns={columns}
          data={this.state.schedules}
          editable={{
            onRowAdd: this.onAddSchedule,
            onRowUpdate: this.onUpdateSchedule,
            onRowDelete: this.onDeleteSchedule
          }}
        />
      </Paper>
    );
  }
}

export default withAdminMenu(AdminSchedules);
