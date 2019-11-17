import React from 'react';
import BreadCrumbStepper from '../components/Breadcrumbs/breadcrumbsStepper';

export default function withBreadCrumbs(Component) {
  class BreadCrumbs extends Component {
    constructor(props) {
      super(props);
      this.state = {
        steps: [{ label: 'Canchas', selected: true }],
        isBooking: false
      };
    }

    onClickStep = to => {
      if (to) {
        // TODO: Change this to outer funciton
        const steps = [].concat([this.state.steps[0], this.state.steps[1]]);
        steps[1].selected = true;
        this.setState({
          steps,
          isBooking: false
        });
      }
    };

    changeToBooking = () => {
      this.setState({
        isBooking: true
      });
    };

    defineSteps = steps => {
      this.setState({
        steps
      });
    };
    render() {
      return (
        <div>
          <BreadCrumbStepper
            steps={this.state.steps}
            onClickStep={this.onClickStep}
          />
          <Component
            {...this.props}
            defineSteps={this.defineSteps}
            isBooking={this.state.isBooking}
            changeToBooking={this.changeToBooking}
          />
        </div>
      );
    }
  }

  return BreadCrumbs;
}
