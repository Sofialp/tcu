import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from '@material-ui/core/Modal';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { getTermsAndConditions } from '../../services';
import './terms.css';

class TermsModal extends Component {
  static props = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      terms: ''
    };
  }

  componentDidMount() {
    this.getTerms();
  }

  getTerms = async () => {
    const result = await getTermsAndConditions();
    if (result.terms) {
      this.setState({
        terms: result.terms
      });
    }
  };

  render() {
    return (
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={this.props.open}
        onClose={this.props.onClose}
      >
        <Paper className="paddings">
          <h2 id="simple-modal-title">Términos y condiciones</h2>
          <p id="simple-modal-description">{this.state.terms}</p>
          <Grid container spacing={3}>
            <Grid item xs={10} />
            <Grid item xs={2}>
              <Button
                variant="contained"
                color="primary"
                size="medium"
                className="closeButton"
                onClick={this.props.onClose}
              >
                Cerrar
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Modal>
    );
  }
}

export default TermsModal;
