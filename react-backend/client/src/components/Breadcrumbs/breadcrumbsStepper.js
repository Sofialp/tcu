import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import './breadcrumbs.css';

class BreadCrumbStepper extends Component {
  static props = {
    steps: PropTypes.array
  };

  onClickStep = to => {
    this.props.onClickStep(to);
  };

  showStep = (step, index) => {
    const extraTypoProp = step.selected ? { color: 'textPrimary' } : {};
    const extraLinkProp = step.to ? { to: step.to } : {};
    return (
      <Link
        color="inherit"
        key={`${index}-step`}
        onClick={() => this.onClickStep(extraLinkProp.to)}
        {...extraLinkProp}
      >
        <Typography variant="h6" className="title" {...extraTypoProp}>
          {step.label}
        </Typography>
      </Link>
    );
  };

  showStepsList = () => {
    const { steps } = this.props;
    return (
      <Breadcrumbs separator="›" aria-label="Breadcrumb">
        {steps.length > 0 && steps.map(this.showStep)}
      </Breadcrumbs>
    );
  };

  render() {
    return this.showStepsList();
  }
}

export default BreadCrumbStepper;
