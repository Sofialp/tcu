import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import MaterialTable from 'material-table';
import { toast } from 'react-toastify';
import withAdminMenu from '../../HOC/withAdminMenu';
import {
  getCategories,
  updateCategory,
  saveCategory,
  deleteCategory
} from '../../services';
import constants from '../../utils/constants';
import './admin.css';

class AdminCategories extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: []
    };
  }

  componentDidMount() {
    this.props.setSelectedMenuItem(false, true, false, false, false);
    this.getCategories();
  }

  getCategories = async () => {
    const { categories } = await getCategories();
    this.setState({
      categories
    });
  };

  onUpdateCategory = async (newData, oldData) => {
    const result = await updateCategory(newData);
    if (result.status === 'ok') {
      this.getCategories();
      toast.success('Categoría guardada con éxito');
    }
  };

  onAddCategory = async newData => {
    const result = await saveCategory(newData);
    if (result.status === 'ok') {
      this.getCategories();
      toast.success('Categoría guardada con éxito');
    }
  };

  onDeleteCategory = async oldData => {
    const result = await deleteCategory(oldData.id);
    if (result.status === 'ok') {
      this.getCategories();
      toast.success('Categoría eliminada con éxito');
    }
  };

  render() {
    return (
      <Paper>
        <MaterialTable
          title="Categorías"
          columns={constants.ADMIN_TABLES_HEADERS.CATEGORIES}
          data={this.state.categories}
          editable={{
            onRowUpdate: this.onUpdateCategory,
            onRowDelete: this.onDeleteCategory,
            onRowAdd: this.onAddCategory
          }}
        />
      </Paper>
    );
  }
}

export default withAdminMenu(AdminCategories);
