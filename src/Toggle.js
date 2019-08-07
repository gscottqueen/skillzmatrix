import React, { Component } from 'react'
import './Toggle.css'

class Toggle extends Component {

  render() {
    return (
      <div className="toggle-group">
        <span className="toggle-label">Toggle Roadmap</span>
        <label className="switch" for="roadmapToggle">
          <input
            id="roadmapToggle"
            name="roadmapToggle"
            type="checkbox"
            checked={this.props.isChecked}
            onChange={this.props.handleToggle}
            />
          <span className="slider round" />
        </label>
      </div>
    )
  }
}

export default Toggle;
