import React, { Component } from 'react'
import './ProgressIndicator.css';

class ProgressIndicator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.id,
      currentValue: props.value,
      goalValue: props.goal,
    };
  }

  render() {
    return (
      <div>
      <div className="progress-bar-group">
        <progress
          min="0"
          max="5"
          id={this.state.id}
          data-label={this.state.currentValue}
          goal={this.state.goalValue}
          value={this.state.currentValue}>
        </progress>
        <output
          className="goal-check"
          htmlFor={this.state.id}
          id="totalCurrentValue"
          data-goal={this.state.goalValue}
          data-value={this.state.currentValue}></output>
        <progress
          className="goal-progress"
          min="0"
          max="5"
          id={this.state.id}
          data-label={this.state.currentValue}
          goal={this.state.goalValue}
          value={this.state.currentValue}>
        </progress>
        <output
          className="goal-line"
          htmlFor={this.state.id}
          id="totalCurrentValue"
          data-goal={this.state.goalValue}
          data-value={this.state.currentValue}></output>
      </div>
      </div>
    )
  }
}

export default ProgressIndicator;
