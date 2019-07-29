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
    console.log(props)
  }

  render() {
    return (
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
          for={this.state.id}
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
          for={this.state.id}
          id="totalCurrentValue"
          data-goal={this.state.goalValue}
          data-value={this.state.currentValue}></output>
      </div>
    )
  }
}

export default ProgressIndicator;
